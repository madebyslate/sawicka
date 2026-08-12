import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function uploadImage(payload: Awaited<ReturnType<typeof getPayload>>, filename: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    console.log(`↷ Media "${filename}" już istnieje (${id}) — pomijam upload`)
    return id
  }

  const filePath = path.join(dirname, 'assets', filename)
  const buffer = fs.readFileSync(filePath)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/png',
      name: filename,
      size: buffer.length,
    },
  })
  const id = media.id
  console.log(`✓ Wgrano media "${filename}" (${id})`)
  return id
}

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
  const hasBlock = content.some((block) => block.blockType === 'hero')

  if (hasBlock) {
    console.log('↷ Blok "hero" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const portraitId = await uploadImage(payload, 'hero-portrait.png', 'Sawicka Grzyb, doradczyni finansowa')
  const avatarsImageId = await uploadImage(payload, 'hero-trustedby.png', 'Klienci korzystający z usług księgowych')

  const heroBlock = {
    blockType: 'hero' as const,
    tagline: 'Trusted Accounting for Business Owners',
    heading: 'Accounting That Puts Your Business First',
    description:
      'From bookkeeping and payroll to tax compliance and business advice, every service is handled personally by one experienced accountant who takes full responsibility for your business not just your paperwork.',
    portrait: portraitId,
    avatarsImage: avatarsImageId,
    trustText: 'Trusted by 200+ businesses with reliable accounting and personal financial support.',
    trustHighlight: '200+ businesses',
    primaryButton: { label: 'Book a Free Call', type: 'custom' as const, url: '#kontakt' },
    secondaryButton: { label: 'See Services', type: 'custom' as const, url: '#uslugi' },
    floatingBadges: [
      { label: 'Dedicated Financial Partner' },
      { label: 'Trusted Accounting Partner' },
      { label: 'Accounting Done Personally' },
    ],
  }

  const nextContent = [heroBlock, ...content]

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { content: nextContent },
    draft: false,
  })

  console.log('✓ Dodano blok "hero" na początku strony "home"')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
