import type { Block } from 'payload'

export const PersonalRelationshipBlock: Block = {
  slug: 'personalRelationship',
  labels: {
    singular: 'Personal Relationship',
    plural: 'Sekcje Personal Relationship',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie',
      admin: {
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego.',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Cechy',
      labels: {
        singular: 'Cecha',
        plural: 'Cechy',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Ikona (ścieżka, np. "/icons/user.svg")',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Opis',
        },
      ],
    },
  ],
}
