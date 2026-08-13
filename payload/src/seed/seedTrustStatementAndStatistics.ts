import { getPayload } from 'payload'
import config from '../payload.config'

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
  const hasBlock = content.some((block) => block.blockType === 'trustStatementAndStatistics')

  if (hasBlock) {
    console.log('↷ Blok "trustStatementAndStatistics" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const block = {
    blockType: 'trustStatementAndStatistics' as const,
    tagline: 'Zaufanie w liczbach',
    heading:
      'Wspieram firmy poprzez rzetelną księgowość, przejrzystą komunikację i długoterminowe bezpieczeństwo finansowe.',
    stats: [
      { value: '8', suffix: '+', label: 'Lat doświadczenia' },
      { value: '100', suffix: '+', label: 'Obsłużonych firm' },
      { value: '99', suffix: '%', label: 'Rozliczeń podatkowych na czas' },
      { value: '100', suffix: '%', label: 'Zero kar dla klientów' },
    ],
  }

  content.unshift(block)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "trustStatementAndStatistics" na stronie "home" (na początku)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
