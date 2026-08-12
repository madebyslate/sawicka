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
  const hasBlock = content.some((block) => block.blockType === 'personalRelationship')

  if (hasBlock) {
    console.log('↷ Blok "personalRelationship" już istnieje na stronie "home" — pomijam')
    process.exit(0)
  }

  const imageAlt = 'Doradczyni finansowa rozmawiająca z klientką'
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: imageAlt } },
    limit: 1,
  })

  let mediaId: number
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id
    console.log(`↷ Media "why-work-with-me" już istnieje (${mediaId}) — pomijam upload`)
  } else {
    const filePath = path.join(dirname, 'assets/why-work-with-me.png')
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: 'why-work-with-me.png',
        size: buffer.length,
      },
    })
    mediaId = media.id
    console.log(`✓ Wgrano media "why-work-with-me" (${mediaId})`)
  }

  const personalRelationshipBlock = {
    blockType: 'personalRelationship' as const,
    tagline: 'Personal Relationship',
    heading: 'One Accountant. One Relationship. Complete Responsibility.',
    description:
      "Large firms often divide responsibilities across departments. Here, you'll always know exactly who's looking after your business.",
    image: mediaId,
    features: [
      {
        icon: '/icons/user.svg',
        title: 'I Know Your Business Personally',
        description: 'No repeating your story to different people.',
      },
      {
        icon: '/icons/messages.svg',
        title: 'Direct Communication',
        description: 'Questions go directly to the person responsible.',
      },
      {
        icon: '/icons/zap.svg',
        title: 'Decisions Without Delays',
        description: 'No "I\'ll ask a colleague." Just practical answers when you need them.',
      },
      {
        icon: '/icons/shield.svg',
        title: 'Personal Accountability',
        description: 'Your business deserves ownership not handoffs.',
      },
    ],
  }

  const experienceIndex = content.findIndex((block) => block.blockType === 'experienceAndTrust')
  const insertIndex = experienceIndex !== -1 ? experienceIndex : content.length

  content.splice(insertIndex, 0, personalRelationshipBlock)
  await payload.update({ collection: 'pages', id: page.id, data: { content } })
  console.log('✓ Dopięto blok "personalRelationship" na stronie "home" (nad experienceAndTrust)')

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
