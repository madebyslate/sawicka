import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const payload = await getPayload({ config })

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })

  if (existingPage.docs.length > 0) {
    console.log('↷ Strona "home" już istnieje — pomijam')
    process.exit(0)
  }

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

  const page = await payload.create({
    collection: 'pages',
    data: {
      internalName: 'Home',
      title: 'Home',
      slug: 'home',
      generateSlug: false,
      content: [
        {
          blockType: 'cta',
          eyebrow: 'Ready to Work?',
          heading: "Let's Make Your Accounting Simpler.",
          description:
            "Whether you're starting a new business or looking for a more personal accounting experience, I'd be happy to help. Book a free introductory call and let's discuss your business.",
          backgroundImage: mediaId,
          button: {
            label: 'Book a Free Call',
            type: 'custom' as const,
            url: '#kontakt',
          },
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
  console.log(`✓ Utworzono stronę "Home" (${page.id}) z blokiem CTA`)

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
