import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const PainPointsBlock: Block = {
  slug: 'painPoints',
  labels: {
    singular: 'Pain Points',
    plural: 'Sekcje Pain Points',
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
      label: 'Zdjęcie (środkowa kolumna)',
      admin: {
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego, ale wizualnie brakuje wtedy zdjęcia w środkowej kolumnie.',
      },
    },
    {
      name: 'painPoints',
      type: 'array',
      label: 'Pain pointy',
      labels: {
        singular: 'Pain point',
        plural: 'Pain pointy',
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
          label: 'Ikona (stare pole, nieużywane — patrz "Ikona (plik)")',
          admin: { hidden: true },
        },
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Ikona (plik)',
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
    {
      name: 'closingText',
      type: 'textarea',
      label: 'Tekst zamykający (nad przyciskiem)',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Przycisk',
      fields: linkFields(),
    },
  ],
}
