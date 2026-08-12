import type { Block } from 'payload'

export const BlogBlock: Block = {
  slug: 'blog',
  labels: {
    singular: 'Blog',
    plural: 'Sekcje Blog',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (mały tekst nad nagłówkiem)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
    {
      name: 'postsMode',
      type: 'radio',
      label: 'Wybór wpisów',
      options: [
        { label: '3 najnowsze automatycznie', value: 'latest' },
        { label: 'Wybierz ręcznie', value: 'manual' },
      ],
      defaultValue: 'latest',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'manualPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Wybrane wpisy',
      admin: {
        condition: (_, siblingData) => siblingData?.postsMode === 'manual',
      },
      validate: (value, { siblingData }) => {
        const isManual = (siblingData as { postsMode?: string })?.postsMode === 'manual'
        const isEmpty = !value || (Array.isArray(value) && value.length === 0)
        if (isManual && isEmpty) {
          return 'Wybierz przynajmniej jeden wpis'
        }
        return true
      },
    },
  ],
}
