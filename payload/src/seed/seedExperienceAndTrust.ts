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
    file: {
      data: buffer,
      mimetype: 'image/png',
      name: filename,
      size: buffer.length,
    },
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
  const hasBlock = content.some((block) => block.blockType === 'experienceAndTrust')

  if (hasBlock) {
    console.log('↷ Blok "experienceAndTrust" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const portraitId = await uploadIfMissing(payload, 'Sawicka Grzyb', 'portrait.png')
  const cert1Id = await uploadIfMissing(payload, 'Certyfikat zawodowy 1', 'certification-1.png')
  const cert2Id = await uploadIfMissing(payload, 'Certyfikat zawodowy 2', 'certification-2.png')

  const experienceAndTrustBlock = {
    blockType: 'experienceAndTrust' as const,
    tagline: 'Doświadczenie i zaufanie',
    heading: 'Buduję długoterminowe relacje biznesowe oparte na zaufaniu.',
    portrait: portraitId,
    bio: 'Sawicka Grzyb to certyfikowana księgowa, która pomaga przedsiębiorcom zarządzać finansami z pewnością siebie. Pracując bezpośrednio z każdym klientem, zapewnia rzetelną księgowość, jasną komunikację i osobiste wsparcie dopasowane do każdej firmy.',
    facts: [
      {
        label: 'Kariera',
        type: 'tags' as const,
        tags: [{ value: '10+ lat doświadczenia' }],
      },
      {
        label: 'Doświadczenie zawodowe',
        type: 'tags' as const,
        tags: [
          { value: 'Księgowość' },
          { value: 'Kadry i płace' },
          { value: 'Rozliczenia podatkowe' },
          { value: 'Doradztwo biznesowe' },
        ],
      },
      {
        label: 'Certyfikaty i uprawnienia',
        type: 'images' as const,
        images: [{ image: cert1Id }, { image: cert2Id }],
      },
      {
        label: 'Ubezpieczenie odpowiedzialności zawodowej',
        type: 'tags' as const,
        tags: [{ value: 'W pełni ubezpieczony specjalista' }],
      },
    ],
    quote:
      'Moim celem nie jest tylko prowadzenie Twojej księgowości. To zostanie księgową, o którą nigdy nie musisz się martwić.',
  }

  const onboardingIndex = content.findIndex((block) => block.blockType === 'onboardingProcess')
  const insertIndex = onboardingIndex !== -1 ? onboardingIndex : content.length

  content.splice(insertIndex, 0, experienceAndTrustBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "experienceAndTrust" na stronie "home" (nad onboardingProcess)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
