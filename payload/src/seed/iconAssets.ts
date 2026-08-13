import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const iconFiles = {
  phoneOff: { file: 'icon-phone-off.svg', alt: 'Ikona: brak połączenia telefonicznego' },
  alert: { file: 'icon-alert.svg', alt: 'Ikona: ostrzeżenie' },
  fileStack: { file: 'icon-file-stack.svg', alt: 'Ikona: stos dokumentów' },
  refresh: { file: 'icon-refresh.svg', alt: 'Ikona: odświeżanie / zmiana' },
  user: { file: 'icon-user.svg', alt: 'Ikona: użytkownik' },
  messages: { file: 'icon-messages.svg', alt: 'Ikona: wiadomości' },
  zap: { file: 'icon-zap.svg', alt: 'Ikona: błyskawica' },
  shield: { file: 'icon-shield.svg', alt: 'Ikona: tarcza ochronna' },
} as const

export type IconKey = keyof typeof iconFiles

export async function uploadIcon(payload: Payload, key: IconKey): Promise<number> {
  const { file, alt } = iconFiles[key]

  const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  const filePath = path.join(dirname, 'assets', file)
  const buffer = fs.readFileSync(filePath)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/svg+xml',
      name: file,
      size: buffer.length,
    },
  })
  console.log(`✓ Wgrano ikonę "${file}" (${media.id})`)
  return media.id as number
}
