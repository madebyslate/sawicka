import type { Block } from 'payload'

export const ExperienceAndTrustBlock: Block = {
  slug: 'experienceAndTrust',
  labels: {
    singular: 'Experience and Trust',
    plural: 'Sekcje Experience and Trust',
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
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie portretowe',
      admin: {
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio (akapit opisu)',
    },
    {
      name: 'facts',
      type: 'array',
      label: 'Fakty (wiersze tabelki)',
      labels: {
        singular: 'Fakt',
        plural: 'Fakty',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Etykieta (np. "Career")',
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Typ zawartości',
          options: [
            { label: 'Tagi (tekst)', value: 'tags' },
            { label: 'Zdjęcia', value: 'images' },
          ],
          defaultValue: 'tags',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tagi',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'tags',
          },
          fields: [{ name: 'value', type: 'text', required: true, label: 'Treść tagu' }],
        },
        {
          name: 'images',
          type: 'array',
          label: 'Zdjęcia',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'images',
          },
          fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Zdjęcie' }],
        },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Cytat (na dole sekcji)',
    },
  ],
}
