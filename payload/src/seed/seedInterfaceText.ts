import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  if (siteSettings.interfaceText?.hero?.scrollDownLabel) {
    console.log('↷ Site Settings → Teksty interfejsu już ustawione — pomijam')
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      interfaceText: {
        hero: { scrollDownLabel: 'Przewiń w dół' },
        services: { areasOfSupportLabel: 'Obszary wsparcia' },
        blog: { readArticleLabel: 'Czytaj artykuł', loadMoreLabel: 'Pokaż więcej' },
        post: {
          faqHeading: 'Najczęściej zadawane pytania',
          backButtonLabel: 'Wróć',
          tableOfContentsHeading: 'Spis treści',
        },
        breadcrumbHomeLabel: 'Strona główna',
      },
    },
  })
  console.log('✓ Ustawiono Site Settings → Teksty interfejsu')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
