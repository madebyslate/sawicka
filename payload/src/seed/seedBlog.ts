import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const posts = [
  {
    title: '5 Tax Mistakes Every Business Owner Should Avoid',
    slug: 'tax-mistakes-every-business-owner-should-avoid',
    category: 'Tax Guide',
    excerpt: 'Stay informed with practical articles on accounting, taxes, payroll...',
    publishedDate: '2026-08-05',
    readTime: '5 min read',
    image: 'insight-tax-mistakes.png',
    imageAlt: 'Osoba przegląda dokumenty podatkowe',
  },
  {
    title: 'What Every Employer Should Know About Payroll',
    slug: 'what-every-employer-should-know-about-payroll',
    category: 'Payroll',
    excerpt: 'Understand the essentials of payroll management, employee obligations, and...',
    publishedDate: '2026-07-28',
    readTime: '4 min read',
    image: 'insight-payroll.png',
    imageAlt: 'Naliczanie wynagrodzeń pracowników',
  },
  {
    title: 'When Is the Right Time to Hire an Accountant?',
    slug: 'when-is-the-right-time-to-hire-an-accountant',
    category: 'Business Tips',
    excerpt: 'Discover the signs that your business is ready for professional accounting support...',
    publishedDate: '2026-07-18',
    readTime: '6 min read',
    image: 'insight-hire-accountant.png',
    imageAlt: 'Spotkanie z księgowym',
  },
] as const

async function seed() {
  const payload = await getPayload({ config })

  const categoryIdsByName: Record<string, number> = {}
  const { docs: existingCategories } = await payload.find({ collection: 'categories', limit: 100 })
  for (const category of existingCategories) {
    categoryIdsByName[category.name] = category.id
  }

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`↷ Wpis "${post.title}" już istnieje — pomijam`)
      continue
    }

    let categoryId = categoryIdsByName[post.category]
    if (!categoryId) {
      const createdCategory = await payload.create({
        collection: 'categories',
        data: { name: String(post.category), slug: slugify(post.category) },
        draft: false,
      })
      categoryId = createdCategory.id
      categoryIdsByName[post.category] = categoryId
      console.log(`✓ Utworzono kategorię "${post.category}" (${categoryId})`)
    }

    const filePath = path.join(dirname, 'assets', post.image)
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: post.imageAlt },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: post.image,
        size: buffer.length,
      },
    })

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        generateSlug: false,
        category: categoryId,
        excerpt: post.excerpt,
        featuredImage: media.id,
        publishedDate: post.publishedDate,
        readTime: post.readTime,
      },
    })
    console.log(`✓ Utworzono wpis "${post.title}"`)
  }

  const homePage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '/' } },
    limit: 1,
  })
  const page = homePage.docs[0]

  if (!page) {
    console.log('↷ Strona "home" nie istnieje — pomijam podpięcie bloku blog (uruchom najpierw seedCta.ts)')
    process.exit(0)
  }

  const content = page.content ?? []
  const hasBlogBlock = content.some((block) => block.blockType === 'blog')
  const hasFaqBlock = content.some((block) => block.blockType === 'faq')

  if (hasBlogBlock && hasFaqBlock) {
    console.log('↷ Blok "blog" i blok "faq" już są na stronie "home" — pomijam')
  } else {
    const blogBlock = {
      blockType: 'blog' as const,
      tagline: 'Insights for Business Owners',
      heading: 'Practical Accounting Advice You Can Actually Use.',
      description:
        'Stay informed with clear explanations about taxes, accounting, business regulations, and financial decisions written for business owners, not accountants.',
      postsMode: 'latest' as const,
    }
    const faqBlock = {
      blockType: 'faq' as const,
      tagline: 'FAQ',
      heading: 'Most common questions answered before we start.',
      description:
        'Get clarity on how the process works, what to expect, and how we can support your business from day one.',
      button: {
        label: 'Book a Free Call',
        type: 'custom' as const,
        url: '#kontakt',
      },
      faqs: [
        {
          question: 'How much do your accounting services cost?',
          answer:
            'Every business is different, so pricing depends on the services you need, the size of your business, and the complexity of your accounting. After a free consultation, you’ll receive a clear, transparent quote with no hidden fees.',
        },
        {
          question: 'Can you help me switch from my current accountant?',
          answer:
            'Yes. I’ll handle the transfer process and coordinate with your previous accountant whenever possible, making the transition as simple and stress-free as possible.',
        },
        {
          question: 'Do we need to meet in person?',
          answer:
            'Not at all. I work with clients both remotely and in person, depending on your preference. Most day-to-day communication can be handled efficiently by phone or email.',
        },
      ],
    }

    const nextContent = [...content]

    if (!hasFaqBlock) {
      const blogIndex = nextContent.findIndex((block) => block.blockType === 'blog')
      const ctaIndex = nextContent.findIndex((block) => block.blockType === 'cta')
      const insertIndex = blogIndex !== -1 ? blogIndex : ctaIndex !== -1 ? ctaIndex : nextContent.length
      nextContent.splice(insertIndex, 0, faqBlock)
      console.log('✓ Dopięto blok "faq" na stronie "home" (nad blogiem/CTA)')
    }

    if (!hasBlogBlock) {
      const ctaIndex = nextContent.findIndex((block) => block.blockType === 'cta')
      const insertIndex = ctaIndex !== -1 ? ctaIndex : nextContent.length
      nextContent.splice(insertIndex, 0, blogBlock)
      console.log('✓ Dopięto blok "blog" na stronie "home" (przed CTA)')
    }

    if (hasBlogBlock && !hasFaqBlock) {
      const existingBlogIndex = nextContent.findIndex((block) => block.blockType === 'blog')
      const existingFaqIndex = nextContent.findIndex((block) => block.blockType === 'faq')
      if (existingBlogIndex !== -1 && existingFaqIndex === -1) {
        const ctaIndex = nextContent.findIndex((block) => block.blockType === 'cta')
        const insertIndex = ctaIndex !== -1 ? ctaIndex : nextContent.length
        nextContent.splice(insertIndex, 0, faqBlock)
        console.log('✓ Dopięto blok "faq" na stronie "home" (nad blogiem)')
      }
    }

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { content: nextContent },
    })
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
