import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { uploadIcon } from './iconAssets'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const payload = await getPayload({ config })

  const homePage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })
  const page = homePage.docs[0]

  if (!page) {
    console.log('↷ Strona "home" nie istnieje — uruchom najpierw seedCta.ts')
    process.exit(0)
  }

  const content = page.content ?? []
  const hasBlock = content.some((block) => block.blockType === 'personalRelationship')

  if (hasBlock) {
    console.log('↷ Blok "personalRelationship" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const imageAlt = 'Doradczyni finansowa rozmawiająca z klientką'
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: imageAlt } },
    limit: 1,
  })

  let mediaId: number
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
    console.log(`↷ Media "why-work-with-me" już istnieje (${mediaId}) — pomijam upload`)
  } else {
    const filePath = path.join(dirname, 'assets/why-work-with-me.png')
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: 'why-work-with-me.png',
        size: buffer.length,
      },
    })
    mediaId = media.id
    console.log(`✓ Wgrano media "why-work-with-me" (${mediaId})`)
  }

  const [userIconId, messagesIconId, zapIconId, shieldIconId] = await Promise.all([
    uploadIcon(payload, 'user'),
    uploadIcon(payload, 'messages'),
    uploadIcon(payload, 'zap'),
    uploadIcon(payload, 'shield'),
  ])

  const personalRelationshipBlock = {
    blockType: 'personalRelationship' as const,
    tagline: 'Osobista relacja',
    heading: 'Jedna księgowa. Jedna relacja. Pełna odpowiedzialność.',
    description:
      'Duże biura często dzielą obowiązki między działy. Tutaj zawsze będziesz wiedzieć dokładnie, kto zajmuje się Twoją firmą.',
    image: mediaId,
    features: [
      {
        iconImage: userIconId,
        title: 'Znam Twoją firmę osobiście',
        description: 'Nie musisz powtarzać swojej historii różnym osobom.',
      },
      {
        iconImage: messagesIconId,
        title: 'Bezpośrednia komunikacja',
        description: 'Pytania trafiają wprost do osoby odpowiedzialnej.',
      },
      {
        iconImage: zapIconId,
        title: 'Decyzje bez opóźnień',
        description: 'Żadnego „muszę zapytać koleżankę". Tylko konkretne odpowiedzi, kiedy ich potrzebujesz.',
      },
      {
        iconImage: shieldIconId,
        title: 'Osobista odpowiedzialność',
        description: 'Twoja firma zasługuje na zaangażowanie, a nie przekazywanie z rąk do rąk.',
      },
    ],
  }

  const experienceIndex = content.findIndex((block) => block.blockType === 'experienceAndTrust')
  const insertIndex = experienceIndex !== -1 ? experienceIndex : content.length

  content.splice(insertIndex, 0, personalRelationshipBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "personalRelationship" na stronie "home" (nad experienceAndTrust)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
