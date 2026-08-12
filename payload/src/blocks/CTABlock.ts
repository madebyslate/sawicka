import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'Sekcje CTA',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow (mały tekst nad nagłówkiem)',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie tła',
      admin: {
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego.',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Przycisk',
      fields: linkFields(),
    },
  ],
}
