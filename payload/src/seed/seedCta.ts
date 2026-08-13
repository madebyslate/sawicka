import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const payload = await getPayload({ config })

  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Dłoń stemplująca dokument przy biurku' } },
    limit: 1,
  })

  let mediaId: number
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
    console.log(`↷ Media "ready-to-work" już istnieje (${mediaId}) — pomijam upload`)
  } else {
    const filePath = path.join(dirname, 'assets/ready-to-work.png')
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: 'Dłoń stemplująca dokument przy biurku' },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: 'ready-to-work.png',
        size: buffer.length,
      },
    })
    mediaId = media.id
    console.log(`✓ Wgrano media "ready-to-work" (${mediaId})`)
  }

  const globalCta = await payload.findGlobal({ slug: 'global-cta' })
  if (!globalCta.heading) {
    await payload.updateGlobal({
      slug: 'global-cta',
      data: {
        eyebrow: 'Gotowi do współpracy?',
        heading: 'Uprośćmy Twoją księgowość.',
        description:
          'Niezależnie od tego, czy zakładasz nową firmę, czy szukasz bardziej osobistej obsługi księgowej, chętnie pomogę. Umów się na bezpłatną rozmowę wstępną i porozmawiajmy o Twojej firmie.',
        backgroundImage: mediaId,
        button: {
          label: 'Umów bezpłatną rozmowę',
          type: 'custom',
          url: '#kontakt',
        },
      },
    })
    console.log('✓ Ustawiono globalne CTA (Ustawienia → CTA)')
  } else {
    console.log('↷ Globalne CTA już ustawione — pomijam')
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })

  if (existingPage.docs.length > 0) {
    console.log('↷ Strona "home" już istnieje — pomijam')
    process.exit(0)
  }

  const page = await payload.create({
    collection: 'pages',
    data: {
      internalName: 'Strona główna',
      title: 'Strona główna',
      slug: 'home',
      generateSlug: false,
      content: [
        {
          blockType: 'cta',
          useGlobal: true,
        },
      ],
    },
    draft: false,
  })

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { slug: '/' },
    draft: false,
  })
  console.log(`✓ Utworzono stronę "Home" (${page.id}) z blokiem CTA (globalny)`)

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
