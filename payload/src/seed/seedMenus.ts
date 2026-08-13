import { getPayload } from 'payload'
import config from '../payload.config'

function link(label: string, url: string) {
  return { label, type: 'custom' as const, url }
}

const sectionLinks = () => [
  link('Usługi', '/#uslugi'),
  link('O mnie', '/#o-mnie'),
  link('Jak pracujemy', '/#jak-pracujemy'),
  link('Blog', '/blog'),
  link('Kontakt', '/#kontakt'),
]

const menus = [
  {
    name: 'Header',
    items: sectionLinks(),
  },
  {
    name: 'Quick Links',
    items: sectionLinks(),
  },
  {
    name: 'Services',
    items: [
      link('Księgowość', '/#services'),
      link('Kadry i płace', '/#services'),
      link('Doradztwo biznesowe i zakładanie firm', '/#services'),
    ],
  },
  {
    name: 'Social Media',
    items: [link('Instagram', '#'), link('Whatsapp', '#'), link('Facebook', '#'), link('Youtube', '#')],
  },
  {
    name: 'Footer Links',
    items: [link('Polityka prywatności', '/privacy-policy'), link('Regulamin', '/terms-and-conditions')],
  },
] as const

async function seed() {
  const payload = await getPayload({ config })
  const idsByName: Record<string, number> = {}

  for (const menu of menus) {
    const existing = await payload.find({
      collection: 'menu',
      where: { name: { equals: menu.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      idsByName[menu.name] = doc.id

      const existingItems = doc.items ?? []
      const isStaleShape =
        existingItems.length !== menu.items.length ||
        existingItems.some((item, index) => !('type' in item) || !item.type || item.url !== menu.items[index]?.url)
      if (isStaleShape) {
        await payload.update({
          collection: 'menu',
          id: doc.id,
          data: { items: [...menu.items] },
        })
        console.log(`↻ Menu "${menu.name}" — odświeżono items do aktualnego kształtu linkFields()`)
      } else {
        console.log(`↷ Menu "${menu.name}" już istnieje — pomijam`)
      }
      continue
    }

    const created = await payload.create({
      collection: 'menu',
      data: { name: menu.name, items: [...menu.items] },
    })
    console.log(`✓ Utworzono menu "${menu.name}" (${created.id})`)
    idsByName[menu.name] = created.id
  }

  const header = await payload.findGlobal({ slug: 'header' })
  const headerData: { mainMenu?: number; cta?: { label: string; type: 'custom'; url: string } } = {}

  if (!header.mainMenu) {
    headerData.mainMenu = idsByName['Header']
  } else {
    console.log('↷ Header.mainMenu już ustawione — pomijam')
  }

  if (!header.cta?.label) {
    headerData.cta = { label: 'Umów rozmowę', type: 'custom', url: '#' }
  } else {
    console.log('↷ Header.cta już w aktualnym kształcie — pomijam')
  }

  if (Object.keys(headerData).length > 0) {
    await payload.updateGlobal({ slug: 'header', data: headerData })
    if (headerData.mainMenu) console.log('✓ Podpięto Header.mainMenu')
    if (headerData.cta) console.log('↻ Header.cta — odświeżono do aktualnego kształtu linkFields()')
  }

  const footer = await payload.findGlobal({ slug: 'footer' })
  if (!footer.linkColumns || footer.linkColumns.length === 0) {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        linkColumns: [
          { title: 'Szybkie linki', menu: idsByName['Quick Links'] },
          { title: 'Usługi', menu: idsByName['Services'] },
          { title: 'Social Media', menu: idsByName['Social Media'] },
        ],
      },
    })
    console.log('✓ Podpięto Footer.linkColumns')
  } else {
    console.log('↷ Footer.linkColumns już ustawione — pomijam')
  }

  if (!footer.legalMenu) {
    await payload.updateGlobal({
      slug: 'footer',
      data: { legalMenu: idsByName['Footer Links'] },
    })
    console.log('✓ Podpięto Footer.legalMenu')
  } else {
    console.log('↷ Footer.legalMenu już ustawione — pomijam')
  }

  if (!footer.contact?.email?.value) {
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        contact: {
          address: { label: 'Adres', value: 'ul. Kwiatowa 12\n00-001 Warszawa' },
          phone: { label: 'Telefon', value: '(+48) 039 1038 0339' },
          email: { label: 'Email', value: 'hello@sawickagrzyb.pl' },
          hours: { label: 'Godziny pracy', value: 'Poniedziałek - Piątek,\n9:00 - 17:00' },
        },
      },
    })
    console.log('✓ Podpięto Footer.contact')
  } else {
    console.log('↷ Footer.contact już ustawione — pomijam')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
