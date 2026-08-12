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
  const hasBlock = content.some((block) => block.blockType === 'painPoints')

  if (hasBlock) {
    console.log('↷ Blok "painPoints" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const imageAlt = 'Doradca finansowy podczas spotkania z klientami przy stole'
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: imageAlt } },
    limit: 1,
  })

  let mediaId: number
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
    console.log(`↷ Media "sound-familiar-meeting" już istnieje (${mediaId}) — pomijam upload`)
  } else {
    const filePath = path.join(dirname, 'assets/sound-familiar-meeting.png')
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: 'sound-familiar-meeting.png',
        size: buffer.length,
      },
    })
    mediaId = media.id
    console.log(`✓ Wgrano media "sound-familiar-meeting" (${mediaId})`)
  }

  const painPointsBlock = {
    blockType: 'painPoints' as const,
    tagline: 'Pain Points',
    heading: 'Accounting Should Reduce Stress, Not Create More of It.',
    description:
      "Many business owners come to us after feeling frustrated with slow communication, confusing paperwork, or never knowing who is actually handling their business. If any of these situations sound familiar, you're not alone.",
    image: mediaId,
    painPoints: [
      {
        icon: '/icons/phone-off.svg',
        title: 'I Never Reach My Accountant',
        description: 'Every question becomes a new email chain or another person to explain everything to.',
      },
      {
        icon: '/icons/alert.svg',
        title: "I'm Afraid of Costly Mistakes",
        description: 'One missed document or misunderstood regulation can become an expensive problem.',
      },
      {
        icon: '/icons/file-stack.svg',
        title: 'Everything Feels Complicated',
        description: "Tax deadlines, paperwork, regulations — it's difficult to know what really matters.",
      },
      {
        icon: '/icons/refresh.svg',
        title: 'Switching Seems Like Too Much Work',
        description: 'Changing accountants feels risky and time-consuming, so many businesses stay stuck.',
      },
    ],
    closingText: 'You deserve accounting that feels straightforward, personal, and dependable.',
    button: {
      label: 'Explore My Services',
      type: 'custom' as const,
      url: '#uslugi',
    },
  }

  content.unshift(painPointsBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "painPoints" na stronie "home" (na początku)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
