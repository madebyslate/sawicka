import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'Sekcje FAQ',
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
      name: 'button',
      type: 'group',
      label: 'Przycisk',
      fields: linkFields(),
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Pytania i odpowiedzi',
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
  ],
}
