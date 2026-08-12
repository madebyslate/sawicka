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
    tagline: 'Trust Statement and Statistics',
    heading:
      'Supporting Businesses with Reliable Accounting, Transparent Communication, and Long-Term Financial Confidence.',
    stats: [
      { value: '8', suffix: '+', label: 'Years of Experience' },
      { value: '100', suffix: '+', label: 'Businesses Supported' },
      { value: '99', suffix: '%', label: 'On-Time Tax Filing' },
      { value: '100', suffix: '%', label: 'Zero penalties for clients' },
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
