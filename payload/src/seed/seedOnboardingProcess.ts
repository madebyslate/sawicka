import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

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
  const hasBlock = content.some((block) => block.blockType === 'onboardingProcess')

  if (hasBlock) {
    console.log('↷ Blok "onboardingProcess" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const imageAlt = 'Doradczyni finansowa podczas spotkania z klientem'
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: imageAlt } },
    limit: 1,
  })

  let mediaId: number
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
    console.log(`↷ Media "how-we-work" już istnieje (${mediaId}) — pomijam upload`)
  } else {
    const filePath = path.join(dirname, 'assets/how-we-work.png')
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: 'how-we-work.png',
        size: buffer.length,
      },
    })
    mediaId = media.id
    console.log(`✓ Wgrano media "how-we-work" (${mediaId})`)
  }

  const onboardingProcessBlock = {
    blockType: 'onboardingProcess' as const,
    tagline: 'Onboarding Process',
    heading: 'A Smooth Transition From Day One.',
    description:
      "Changing accountants shouldn't be stressful. I handle the transition so you can stay focused on running your business.",
    image: mediaId,
    steps: [
      {
        step: 'Step 1',
        title: 'Book a Free Consultation',
        description: "Let's discuss your business, current situation, and what you need.",
      },
      {
        step: 'Step 2',
        title: 'We Handle the Transfer',
        description:
          "I'll coordinate the transfer of documents and formalities with your previous accountant whenever possible.",
      },
      {
        step: 'Step 3',
        title: 'Simple Onboarding',
        description: "We'll organize your documents, systems, and communication so everything runs smoothly.",
      },
      {
        step: 'Step 4',
        title: 'Ongoing Support',
        description: 'Stay compliant with direct support and clear deadlines.',
      },
    ],
  }

  const testimonialsIndex = content.findIndex((block) => block.blockType === 'testimonials')
  const insertIndex = testimonialsIndex !== -1 ? testimonialsIndex : content.length

  content.splice(insertIndex, 0, onboardingProcessBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "onboardingProcess" na stronie "home" (przed testimonials)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
