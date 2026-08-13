import { getPayload } from 'payload'
import config from '../payload.config'

const canonicalOrder = [
  'hero',
  'trustStatementAndStatistics',
  'painPoints',
  'services',
  'personalRelationship',
  'experienceAndTrust',
  'onboardingProcess',
  'testimonials',
  'faq',
  'blog',
  'cta',
]

async function seed() {
  const payload = await getPayload({ config })

  const homePage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })
  const page = homePage.docs[0]

  if (!page) {
    console.log('↷ Strona "home" nie istnieje — pomijam porządkowanie bloków')
    process.exit(0)
  }

  const content = page.content ?? []
  const rank = (blockType: string) => {
    const index = canonicalOrder.indexOf(blockType)
    return index === -1 ? canonicalOrder.length : index
  }

  const sortedContent = [...content].sort((a, b) => rank(a.blockType) - rank(b.blockType))

  const isAlreadySorted = content.every((block, index) => block.blockType === sortedContent[index]?.blockType)

  if (isAlreadySorted) {
    console.log('↷ Kolejność bloków na stronie "home" już poprawna — pomijam')
  } else {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { content: sortedContent },
    })
    console.log('✓ Uporządkowano bloki na stronie "home" wg kanonicznej kolejności')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
