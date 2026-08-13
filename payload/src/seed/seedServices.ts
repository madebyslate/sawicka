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

  const accountingId = await uploadIfMissing(payload, 'Księgowość', 'accounting.png')
  const hrPayrollId = await uploadIfMissing(payload, 'Kadry i płace', 'hr-payroll.png')
  const businessAdvisoryId = await uploadIfMissing(payload, 'Doradztwo biznesowe i zakładanie firm', 'business-advisory.png')

  const servicesBlock = {
    blockType: 'services' as const,
    tagline: 'Usługi',
    heading: 'Wszystko, czego potrzebuje Twoja firma, załatwione osobiście.',
    description:
      'Od codziennej księgowości po rejestrację firmy — każda usługa jest realizowana bezpośrednio przez osobę odpowiedzialną za Twoje konto.',
    services: [
      {
        number: '01',
        title: 'Księgowość',
        description: 'Utrzymuj dokładne, zgodne z przepisami zapisy finansowe, zawsze gotowe na kolejną decyzję.',
        areas: [
          { value: 'Ewidencja przychodów i rozchodów' },
          { value: 'Ryczałt ewidencjonowany' },
          { value: 'Pełna księgowość' },
          { value: 'Rozliczenia podatkowe' },
        ],
        image: accountingId,
        button: { label: 'Dowiedz się więcej', type: 'custom' as const, url: '#kontakt' },
      },
      {
        number: '02',
        title: 'Kadry i płace',
        description: 'Rzetelna obsługa kadrowo-płacowa, dzięki której Twoi pracownicy otrzymują wynagrodzenie poprawnie i na czas.',
        areas: [
          { value: 'Naliczanie wynagrodzeń' },
          { value: 'Dokumentacja pracownicza' },
          { value: 'Rozliczenia ZUS' },
          { value: 'Raportowanie pracownicze' },
        ],
        image: hrPayrollId,
        button: { label: 'Dowiedz się więcej', type: 'custom' as const, url: '#kontakt' },
      },
      {
        number: '03',
        title: 'Doradztwo biznesowe i zakładanie firm',
        description:
          'Zakładanie lub zmiana formy działalności nie musi być przytłaczające. Zyskaj praktyczne wsparcie — od rejestracji po wybór odpowiedniej formy opodatkowania.',
        areas: [
          { value: 'Rejestracja firmy' },
          { value: 'Wybór formy opodatkowania' },
          { value: 'Konsultacje biznesowe' },
          { value: 'Wsparcie administracyjne' },
        ],
        image: businessAdvisoryId,
        button: { label: 'Dowiedz się więcej', type: 'custom' as const, url: '#kontakt' },
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
