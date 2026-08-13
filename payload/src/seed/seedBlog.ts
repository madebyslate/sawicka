import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

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

const posts = [
  {
    title: '5 błędów podatkowych, których powinien unikać każdy przedsiębiorca',
    slug: '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca',
    category: 'Poradnik podatkowy',
    excerpt: 'Bądź na bieżąco dzięki praktycznym artykułom o księgowości, podatkach, kadrach i płacach...',
    publishedDate: '2026-08-05',
    readTime: '5 min czytania',
    image: 'insight-tax-mistakes.png',
    imageAlt: 'Osoba przegląda dokumenty podatkowe',
  },
  {
    title: 'Co każdy pracodawca powinien wiedzieć o kadrach i płacach',
    slug: 'co-kazdy-pracodawca-powinien-wiedziec-o-kadrach-i-placach',
    category: 'Kadry i płace',
    excerpt: 'Poznaj podstawy naliczania wynagrodzeń, obowiązki pracodawcy i...',
    publishedDate: '2026-07-28',
    readTime: '4 min czytania',
    image: 'insight-payroll.png',
    imageAlt: 'Naliczanie wynagrodzeń pracowników',
  },
  {
    title: 'Kiedy jest odpowiedni moment na zatrudnienie księgowej?',
    slug: 'kiedy-jest-odpowiedni-moment-na-zatrudnienie-ksiegowej',
    category: 'Porady biznesowe',
    excerpt: 'Poznaj oznaki, że Twoja firma jest gotowa na profesjonalne wsparcie księgowe...',
    publishedDate: '2026-07-18',
    readTime: '6 min czytania',
    image: 'insight-hire-accountant.png',
    imageAlt: 'Spotkanie z księgowym',
  },
  {
    title: 'Kwartalne zaliczki na podatek — co powinien wiedzieć każdy mały przedsiębiorca',
    slug: 'kwartalne-zaliczki-na-podatek-dla-malych-firm',
    category: 'Poradnik podatkowy',
    excerpt: 'Dowiedz się, kiedy mijają terminy płatności kwartalnych, jak są liczone i jak uniknąć kar...',
    publishedDate: '2026-07-10',
    readTime: '5 min czytania',
    image: 'accounting.png',
    imageAlt: 'Osoba licząca podatki przy biurku',
  },
  {
    title: 'Najczęstsze błędy w rozliczeniach VAT i jak ich unikać',
    slug: 'najczestsze-bledy-w-rozliczeniach-vat-i-jak-ich-unikac',
    category: 'Poradnik podatkowy',
    excerpt: 'Od błędnych stawek po przeoczone terminy — oto błędy VAT, które kosztują firmy najwięcej...',
    publishedDate: '2026-07-03',
    readTime: '4 min czytania',
    image: 'insight-tax-mistakes.png',
    imageAlt: 'Dokumenty podatkowe VAT na biurku',
  },
  {
    title: 'Checklista podatkowa na koniec roku dla przedsiębiorców',
    slug: 'checklista-podatkowa-na-koniec-roku-dla-przedsiebiorcow',
    category: 'Poradnik podatkowy',
    excerpt: 'Praktyczna checklista, by zamknąć rok z uporządkowanymi księgami i bez niespodzianek w ostatniej chwili...',
    publishedDate: '2026-06-25',
    readTime: '6 min czytania',
    image: 'insight-year-end-tax-planning.png',
    imageAlt: 'Checklista podatkowa na koniec roku',
  },
  {
    title: 'Jak poprawnie klasyfikować pracowników i zleceniobiorców',
    slug: 'jak-poprawnie-klasyfikowac-pracownikow-i-zleceniobiorcow',
    category: 'Kadry i płace',
    excerpt: 'Błędna klasyfikacja może prowadzić do poważnych kar — oto jak rozpoznać różnicę...',
    publishedDate: '2026-06-18',
    readTime: '5 min czytania',
    image: 'insight-classify-employees.png',
    imageAlt: 'Przegląd dokumentacji zatrudnienia',
  },
  {
    title: 'Prosty przewodnik po benefitach pracowniczych i potrąceniach z wynagrodzenia',
    slug: 'przewodnik-po-benefitach-pracowniczych-i-potraceniach',
    category: 'Kadry i płace',
    excerpt: 'Co każdy pracodawca powinien wiedzieć o obowiązkowych i dobrowolnych potrąceniach z wynagrodzenia...',
    publishedDate: '2026-06-10',
    readTime: '4 min czytania',
    image: 'insight-payroll.png',
    imageAlt: 'Lista płac i benefity pracownicze',
  },
  {
    title: 'Co zrobić, gdy coś pójdzie nie tak z listą płac',
    slug: 'co-zrobic-gdy-cos-pojdzie-nie-tak-z-lista-plac',
    category: 'Kadry i płace',
    excerpt: 'Pominięta lub błędna płatność się zdarza — oto jak szybko to naprawić i zachować zgodność z przepisami...',
    publishedDate: '2026-06-03',
    readTime: '5 min czytania',
    image: 'insight-payroll-error.png',
    imageAlt: 'Naprawianie błędu w liście płac',
  },
  {
    title: '5 sygnałów, że Twoja księgowość wymaga ponownego sprawdzenia',
    slug: '5-sygnalow-ze-twoja-ksiegowosc-wymaga-sprawdzenia',
    category: 'Porady biznesowe',
    excerpt: 'Od niezgodnych wyciągów bankowych po spóźnione faktury — te sygnały oznaczają, że czas na przegląd...',
    publishedDate: '2026-05-27',
    readTime: '4 min czytania',
    image: 'insight-bookkeeping-review.png',
    imageAlt: 'Przegląd dokumentów księgowych',
  },
  {
    title: 'Jak przygotować firmę do udanego audytu',
    slug: 'jak-przygotowac-firme-do-udanego-audytu',
    category: 'Porady biznesowe',
    excerpt: 'Audyty nie muszą być stresujące — oto jak utrzymać dokumentację gotową do audytu przez cały rok...',
    publishedDate: '2026-05-20',
    readTime: '6 min czytania',
    image: 'insight-audit-prep.png',
    imageAlt: 'Przygotowanie do audytu finansowego',
  },
  {
    title: 'Podstawy przepływów pieniężnych, które powinien znać każdy przedsiębiorca',
    slug: 'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow',
    category: 'Porady biznesowe',
    excerpt: 'Zysk na papierze, a brak gotówki? Oto jak zrozumieć i zarządzać przepływami pieniężnymi w firmie...',
    publishedDate: '2026-05-13',
    readTime: '5 min czytania',
    image: 'insight-cash-flow.png',
    imageAlt: 'Analiza przepływów pieniężnych firmy',
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
        data: {
          name: String(post.category),
          internalName: String(post.category),
          heading: String(post.category),
          slug: slugify(post.category),
        },
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
      tagline: 'Wskazówki dla przedsiębiorców',
      heading: 'Praktyczne porady księgowe, które naprawdę się przydają.',
      description:
        'Bądź na bieżąco dzięki jasnym wyjaśnieniom dotyczącym podatków, księgowości, przepisów i decyzji finansowych, napisanym z myślą o właścicielach firm, a nie księgowych.',
      postsMode: 'latest' as const,
    }
    const faqBlock = {
      blockType: 'faq' as const,
      tagline: 'FAQ',
      heading: 'Najczęstsze pytania, zanim zaczniemy współpracę.',
      description:
        'Dowiedz się, jak wygląda proces, czego się spodziewać i jak mogę wesprzeć Twoją firmę od pierwszego dnia.',
      button: {
        label: 'Umów bezpłatną rozmowę',
        type: 'custom' as const,
        url: '#kontakt',
      },
      faqs: [
        {
          question: 'Ile kosztują usługi księgowe?',
          answer:
            'Każda firma jest inna, więc cena zależy od potrzebnych usług, wielkości firmy i złożoności księgowości. Po bezpłatnej konsultacji otrzymasz jasną, przejrzystą wycenę bez ukrytych opłat.',
        },
        {
          question: 'Czy pomożecie mi zmienić obecną księgową?',
          answer:
            'Tak. Zajmę się procesem przekazania i skoordynuję go z poprzednią księgową, gdy tylko to możliwe, dzięki czemu przejście będzie proste i bezstresowe.',
        },
        {
          question: 'Czy musimy się spotkać osobiście?',
          answer:
            'Wcale nie. Pracuję z klientami zarówno zdalnie, jak i osobiście, w zależności od preferencji. Większość bieżącej komunikacji można sprawnie prowadzić telefonicznie lub mailowo.',
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
