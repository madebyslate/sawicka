import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const testimonials = [
  {
    quote:
      'Sawicka Grzyb pomogła nam zrozumieć nasze przepływy pieniężne i sprawiła, że okres rozliczeń podatkowych stał się dużo mniej stresujący. Czas reakcji jest znakomity.',
    author: 'Anna Kowalska',
    company: 'Właścicielka, Nowak Construction',
    rating: 5,
    image: 'client-story-photo.png',
    imageAlt: 'Anna Kowalska',
  },
  {
    quote:
      'Przejrzystość, terminowość i miła obsługa naprawdę zrobiły różnicę. Zawsze wiem, że moje księgi są w dobrych rękach.',
    author: 'Paweł Nowak',
    company: 'Prezes, Pure Systems',
    rating: 5,
    image: 'client-story-photo.png',
    imageAlt: 'Paweł Nowak',
  },
  {
    quote:
      'Wszystko wytłumaczyli w sposób łatwy do zrozumienia i zaoszczędzili nam czasu na cotygodniowej księgowości.',
    author: 'Magda Zielińska',
    company: 'Założycielka, Zielińska Studio',
    rating: 5,
    image: 'client-story-photo.png',
    imageAlt: 'Magda Zielińska',
  },
] as const

async function seed() {
  const payload = await getPayload({ config })

  const mediaIds: number[] = []
  for (const item of testimonials) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: { alt: { equals: item.imageAlt } },
      limit: 1,
    })

    if (existingMedia.docs.length > 0) {
      mediaIds.push(existingMedia.docs[0].id)
      continue
    }

    const filePath = path.join(dirname, 'assets', item.image)
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: item.imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: item.image,
        size: buffer.length,
      },
    })

    mediaIds.push(media.id)
  }

  const testimonialEntries = [] as number[]
  for (const [index, item] of testimonials.entries()) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { author: { equals: item.author } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      testimonialEntries.push(existing.docs[0].id)
      continue
    }

    const created = await payload.create({
      collection: 'testimonials',
      data: {
        quote: item.quote,
        author: item.author,
        company: item.company,
        rating: item.rating,
        photo: mediaIds[index],
      },
    })
    testimonialEntries.push(created.id)
  }

  const homePage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })

  const page = homePage.docs[0]
  if (!page) {
    console.log('↷ Strona "home" nie istnieje — uruchom najpierw seedCta.ts lub stwórz stronę home')
    process.exit(0)
  }

  const content = page.content ?? []
  const hasTestimonialsBlock = content.some((block) => block.blockType === 'testimonials')
  const hasFaqBlock = content.some((block) => block.blockType === 'faq')

  if (!hasTestimonialsBlock) {
    const testimonialsBlock = {
      blockType: 'testimonials' as const,
      tagline: 'Opinie',
      heading: 'Doświadczenia klientów, które mówią same za siebie.',
      description:
        'Te opinie pochodzą od prawdziwych przedsiębiorców, którzy polegają na jasnym wsparciu księgowym i szybkiej obsłudze.',
      testimonialsMode: 'latest' as const,
    }

    const insertIndex = hasFaqBlock
      ? content.findIndex((block) => block.blockType === 'faq')
      : content.length

    content.splice(insertIndex, 0, testimonialsBlock)
    await payload.update({ collection: 'pages', id: page.id, data: { content } })
    console.log('✓ Dopięto blok "testimonials" na stronie "home" przed FAQ')
  } else {
    console.log('↷ Blok "testimonials" już istnieje na stronie "home" — pomijam')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
