import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Services',
    plural: 'Sekcje Services',
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
      name: 'services',
      type: 'array',
      label: 'Usługi',
      labels: {
        singular: 'Usługa',
        plural: 'Usługi',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Numer (np. "01")',
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
        {
          name: 'areas',
          type: 'array',
          label: 'Zakres wsparcia (Areas of Support)',
          fields: [{ name: 'value', type: 'text', required: true, label: 'Treść' }],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Zdjęcie',
          admin: {
            description:
              'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje usługę poprawnie też bez niego.',
          },
        },
        {
          name: 'button',
          type: 'group',
          label: 'Przycisk',
          fields: linkFields(),
        },
      ],
    },
  ],
}
