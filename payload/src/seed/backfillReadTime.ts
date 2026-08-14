import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({ collection: 'posts', limit: 100, depth: 0 })

  for (const post of posts) {
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { autoReadTime: true },
    })
    console.log(`✓ Przeliczono czas czytania dla "${post.slug}"`)
  }

  console.log('\n✓ Backfill zakończony')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
