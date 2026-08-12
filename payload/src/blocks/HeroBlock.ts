import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Sekcje Hero',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (plakietka nad nagłówkiem)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek (H1)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie portretowe',
    },
    {
      name: 'avatarsImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie awatarów ("trusted by")',
    },
    {
      name: 'trustText',
      type: 'text',
      label: 'Tekst zaufania (pełne zdanie)',
      admin: {
        description:
          'Pełne zdanie, np. "Trusted by 200+ businesses with reliable accounting and personal financial support."',
      },
    },
    {
      name: 'trustHighlight',
      type: 'text',
      label: 'Wyróżniony fragment (pogrubiony)',
      admin: {
        description: 'Fragment powyższego tekstu do pogrubienia, np. "200+ businesses".',
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Przycisk główny',
      fields: linkFields(),
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Przycisk drugorzędny',
      fields: linkFields(),
    },
    {
      name: 'floatingBadges',
      type: 'array',
      label: 'Unoszące się plakietki',
      labels: {
        singular: 'Plakietka',
        plural: 'Plakietki',
      },
      maxRows: 3,
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
          label: 'Tekst',
        },
      ],
    },
  ],
}
