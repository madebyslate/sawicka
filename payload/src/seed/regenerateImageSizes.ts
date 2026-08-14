import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const targets = [
  { alt: 'Doradca finansowy podczas spotkania z klientami przy stole', file: 'sound-familiar-meeting.png' },
  { alt: 'Klienci korzystający z usług księgowych', file: 'hero-trustedby.png' },
  { alt: 'Doradczyni finansowa podczas spotkania z klientem', file: 'how-we-work.png' },
  { alt: 'Doradczyni finansowa rozmawiająca z klientką', file: 'why-work-with-me.png' },
  { alt: 'Accounting', file: 'accounting.png' },
  { alt: 'HR & Payroll', file: 'hr-payroll.png' },
  { alt: 'Business Advisory & Company Setup', file: 'business-advisory.png' },
]

async function run() {
  const payload = await getPayload({ config })

  for (const target of targets) {
    const { docs } = await payload.find({ collection: 'media', where: { alt: { equals: target.alt } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Media "${target.alt}" nie istnieje — pomijam`)
      continue
    }
    if (doc.sizes?.card?.url || doc.sizes?.thumbnail?.url) {
      console.log(`↷ Media "${target.alt}" ma już warianty rozmiarów — pomijam`)
      continue
    }

    const filePath = path.join(dirname, 'assets', target.file)
    const buffer = fs.readFileSync(filePath)
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {},
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: target.file,
        size: buffer.length,
      },
    })
    console.log(`✓ Przegenerowano warianty rozmiarów dla "${target.alt}"`)
  }

  console.log('\n✓ Regeneracja zakończona')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
