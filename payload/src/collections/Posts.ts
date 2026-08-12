import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
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
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Treść',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
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
      name: 'readTime',
      type: 'text',
      label: 'Czas czytania (np. "5 min read")',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Treść artykułu',
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
