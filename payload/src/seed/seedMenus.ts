import { getPayload } from 'payload'
import config from '../payload.config'

function link(label: string) {
  return { label, type: 'custom' as const, url: '#' }
}

const menus = [
  {
    name: 'Header',
    items: [link('Services'), link('About'), link('How We Work'), link('Blog'), link('Contact')],
  },
  {
    name: 'Quick Links',
    items: [link('Services'), link('About'), link('How We Work'), link('Blog'), link('Contact')],
  },
  {
    name: 'Services',
    items: [link('Accounting'), link('HR & Payroll'), link('Business Advisory & Company Setup')],
  },
  {
    name: 'Social Media',
    items: [link('Instagram'), link('Whatsapp'), link('Facebook'), link('Youtube')],
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

      const isStaleShape = (doc.items ?? []).some((item) => !('type' in item) || !item.type)
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
    headerData.cta = { label: 'Book a Call', type: 'custom', url: '#' }
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
          { title: 'Quick Links', menu: idsByName['Quick Links'] },
          { title: 'Services', menu: idsByName['Services'] },
          { title: 'Social Media', menu: idsByName['Social Media'] },
        ],
      },
    })
    console.log('✓ Podpięto Footer.linkColumns')
  } else {
    console.log('↷ Footer.linkColumns już ustawione — pomijam')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
