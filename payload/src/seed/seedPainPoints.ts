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
    tagline: 'Problemy klientów',
    heading: 'Księgowość ma zmniejszać stres, a nie go dodawać.',
    description:
      'Wielu przedsiębiorców trafia do nas sfrustrowanych powolną komunikacją, niejasnymi dokumentami albo niewiedzą, kto tak naprawdę zajmuje się ich firmą. Jeśli którakolwiek z tych sytuacji brzmi znajomo, nie jesteś sam.',
    image: mediaId,
    painPoints: [
      {
        icon: '/icons/phone-off.svg',
        title: 'Nigdy nie mogę się dodzwonić do księgowej',
        description: 'Każde pytanie zamienia się w nowy wątek mailowy albo kolejną osobę, której muszę wszystko wyjaśniać od nowa.',
      },
      {
        icon: '/icons/alert.svg',
        title: 'Boję się kosztownych pomyłek',
        description: 'Jeden brakujący dokument albo źle zrozumiany przepis może stać się drogim problemem.',
      },
      {
        icon: '/icons/file-stack.svg',
        title: 'Wszystko wydaje się skomplikowane',
        description: 'Terminy podatkowe, dokumenty, przepisy — trudno wiedzieć, co naprawdę jest ważne.',
      },
      {
        icon: '/icons/refresh.svg',
        title: 'Zmiana księgowej wydaje się zbyt dużym wysiłkiem',
        description: 'Zmiana biura rachunkowego wydaje się ryzykowna i czasochłonna, więc wiele firm zostaje w miejscu.',
      },
    ],
    closingText: 'Zasługujesz na księgowość, która jest prosta, osobista i godna zaufania.',
    button: {
      label: 'Zobacz moje usługi',
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
