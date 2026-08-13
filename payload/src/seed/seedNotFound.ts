import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  if (siteSettings.notFound?.heading) {
    console.log('↷ Site Settings → 404 już ustawione — pomijam')
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      notFound: {
        tagline: 'Błąd 404',
        heading: 'Nie możemy znaleźć strony, której szukasz.',
        description:
          'Być może w wpisanym przez Ciebie adresie wkradła się literówka lub strona została przeniesiona.',
        button: {
          label: 'Powrót do strony głównej',
          type: 'custom',
          url: '/',
        },
        badges: [{ label: 'Ups!' }, { label: 'Błąd 404' }, { label: 'Nie znaleziono strony' }],
      },
    },
  })
  console.log('✓ Ustawiono Site Settings → 404')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
