import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function uploadIfMissing(payload: Payload, alt: string, filename: string) {
  const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  const filePath = path.join(dirname, 'assets', filename)
  const buffer = fs.readFileSync(filePath)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, mimetype: 'image/png', name: filename, size: buffer.length },
  })
  return media.id
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
  const hasBlock = content.some((block) => block.blockType === 'services')

  if (hasBlock) {
    console.log('↷ Blok "services" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const accountingId = await uploadIfMissing(payload, 'Accounting', 'accounting.png')
  const hrPayrollId = await uploadIfMissing(payload, 'HR & Payroll', 'hr-payroll.png')
  const businessAdvisoryId = await uploadIfMissing(payload, 'Business Advisory & Company Setup', 'business-advisory.png')

  const servicesBlock = {
    blockType: 'services' as const,
    tagline: 'Services',
    heading: 'Everything Your Business Needs, Handled Personally.',
    description:
      'From daily bookkeeping to business registration, every service is delivered directly by the person responsible for your account.',
    services: [
      {
        number: '01',
        title: 'Accounting',
        description: 'Keep your financial records accurate, compliant, and always ready for the next decision.',
        areas: [
          { value: 'Revenue & expense bookkeeping' },
          { value: 'Lump-sum taxation' },
          { value: 'Full accounting' },
          { value: 'Tax settlements' },
        ],
        image: accountingId,
        button: { label: 'Learn More', type: 'custom' as const, url: '#kontakt' },
      },
      {
        number: '02',
        title: 'HR & Payroll',
        description: 'Reliable payroll administration so your employees are paid correctly and on time.',
        areas: [
          { value: 'Payroll processing' },
          { value: 'Employment documentation' },
          { value: 'Social security administration' },
          { value: 'Employee reporting' },
        ],
        image: hrPayrollId,
        button: { label: 'Learn More', type: 'custom' as const, url: '#kontakt' },
      },
      {
        number: '03',
        title: 'Business Advisory & Company Setup',
        description:
          "Starting or changing a business doesn't have to be overwhelming. Receive practical guidance from registration to choosing the right tax structure.",
        areas: [
          { value: 'Company registration' },
          { value: 'Tax form selection' },
          { value: 'Business consultation' },
          { value: 'Administrative support' },
        ],
        image: businessAdvisoryId,
        button: { label: 'Learn More', type: 'custom' as const, url: '#kontakt' },
      },
    ],
  }

  content.unshift(servicesBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "services" na stronie "home" (na początku)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
