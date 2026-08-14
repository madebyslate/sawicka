import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { computeReadTime } from '../hooks/computeReadTime'
import { seoFields } from '../fields/seoFields'
import { authenticated } from '../access/authenticated'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Wpis blogowy',
    plural: 'Blog',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [computeReadTime],
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Treść',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
    preview: async (doc, { req }) => {
      const slug = doc.slug as string | undefined
      if (!slug) return null

      let categorySlug: string | undefined
      const category = doc.category as number | { slug?: string } | null | undefined
      if (category && typeof category === 'object') {
        categorySlug = category.slug
      } else if (typeof category === 'number') {
        const categoryDoc = await req.payload.findByID({ collection: 'categories', id: category, depth: 0 })
        categorySlug = categoryDoc?.slug
      }

      if (!categorySlug) return null

      const baseUrl = process.env.PUBLIC_FRONTEND_URL || ''
      return `${baseUrl}/${categorySlug}/${slug}`
    },
  },
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Kategoria',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Zajawka (krótki opis pod tytułem)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Zdjęcie wyróżniające',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Data publikacji',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'autoReadTime',
          type: 'checkbox',
          label: 'Wylicz automatycznie',
          defaultValue: true,
          admin: {
            description: 'Liczy czas czytania na podstawie treści artykułu przy każdym zapisie.',
          },
        },
        {
          name: 'readTime',
          type: 'text',
          label: 'Czas czytania (np. "5 min czytania")',
          admin: {
            description: 'Wypełniane automatycznie, chyba że odznaczysz "Wylicz automatycznie" powyżej.',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Treść artykułu',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ (opcjonalnie, pokazuje się pod treścią artykułu)',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pytanie',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Odpowiedź',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
      admin: {
        position: 'sidebar',
        description: 'Tytuł wpisu widoczny publicznie. Pojawia się w pasku tytułu przeglądarki oraz w wynikach wyszukiwania.',
      },
    },
    slugField({
      position: 'sidebar',
      overrides: (field) => {
        const slugTextField = field.fields[1] as TextField
        slugTextField.label = 'Post URL / slug'
        slugTextField.admin = {
          ...slugTextField.admin,
          description: 'Adres URL wpisu. Slug musi być unikalny w serwisie i powinien być krótki oraz czytelny.',
        }
        return field
      },
    }),
    ...seoFields(),
  ],
}
