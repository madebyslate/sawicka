import { getPayload } from 'payload'
import config from '../payload.config'


const polishChars: Record<string, string> = {
  ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (char) => polishChars[char] ?? char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}


async function seed() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({ collection: 'posts', limit: 100, depth: 0 })

  const categoryIdsByName: Record<string, number> = {}
  const { docs: existingCategories } = await payload.find({ collection: 'categories', limit: 100 })
  for (const category of existingCategories) {
    categoryIdsByName[category.name] = category.id
  }

  for (const post of posts) {
    const categoryValue = post.category

    if (!categoryValue || typeof categoryValue !== 'string') {
      console.log(`↷ Post "${post.title}" — category już jest relacją albo puste, pomijam`)
      continue
    }

    // Stary wolny tekst — jeśli wygląda jak ObjectId, to już relacja (ID), nie nazwa.
    const looksLikeId = /^[0-9a-f]{24}$/i.test(categoryValue)
    if (looksLikeId) {
      console.log(`↷ Post "${post.title}" — category to już ID, pomijam`)
      continue
    }

    let categoryId = categoryIdsByName[categoryValue]
    if (!categoryId) {
      const created = await payload.create({
        collection: 'categories',
        data: { name: categoryValue, slug: slugify(categoryValue) },
        draft: false,
      })
      categoryId = created.id
      categoryIdsByName[categoryValue] = categoryId
      console.log(`✓ Utworzono kategorię "${categoryValue}" (${categoryId})`)
    }

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { category: categoryId },
    })
    console.log(`✓ Post "${post.title}" → kategoria "${categoryValue}"`)
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
