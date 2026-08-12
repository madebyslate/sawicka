import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.join(dirname, 'assets')
const mediaDir = path.resolve(process.cwd(), 'media')

function sourceCandidates(filename: string): string[] {
  const base = filename.replace(/\.webp$/i, '')
  const withoutDuplicateSuffix = base.replace(/-\d+$/, '')

  return [
    path.join(assetsDir, `${base}.png`),
    path.join(assetsDir, `${withoutDuplicateSuffix}.png`),
  ]
}

async function findSource(filename: string): Promise<string | null> {
  for (const candidate of sourceCandidates(filename)) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // Try the next deterministic candidate.
    }
  }

  return null
}

async function repairMedia(): Promise<void> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
    pagination: false,
  })

  await fs.mkdir(mediaDir, { recursive: true })

  let restored = 0
  let alreadyPresent = 0
  const unresolved: string[] = []

  for (const media of docs) {
    if (!media.filename) continue

    const destination = path.join(mediaDir, media.filename)

    try {
      await fs.access(destination)
      alreadyPresent += 1
      continue
    } catch {
      // Restore only files that are missing from the persistent volume.
    }

    const source = await findSource(media.filename)
    if (!source) {
      unresolved.push(media.filename)
      continue
    }

    await sharp(source)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(destination)

    restored += 1
    console.log(`✓ Restored ${media.filename}`)
  }

  console.log(`Media repair complete: ${restored} restored, ${alreadyPresent} already present.`)

  if (unresolved.length > 0) {
    throw new Error(`No seed asset found for: ${unresolved.join(', ')}`)
  }
}

repairMedia()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
