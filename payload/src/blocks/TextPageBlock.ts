import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const TextPageBlock: Block = {
  slug: 'textPage',
  labels: {
    singular: 'Strona tekstowa (Hero + treść)',
    plural: 'Strony tekstowe',
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
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Treść',
    },
  ],
}
