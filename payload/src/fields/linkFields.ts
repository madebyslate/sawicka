import type { Field } from 'payload'

export function linkFields(): Field[] {
  return [
    { name: 'label', type: 'text', required: true, label: 'Etykieta' },
    {
      name: 'type',
      type: 'radio',
      label: 'Typ linku',
      options: [
        { label: 'Strona w serwisie', value: 'reference' },
        { label: 'Adres URL', value: 'custom' },
      ],
      defaultValue: 'custom',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      label: 'Strona',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
        if ((siblingData as { type?: string })?.type === 'reference' && !value) {
          return 'Wybierz stronę'
        }
        return true
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
        if ((siblingData as { type?: string })?.type === 'custom' && !value) {
          return 'Podaj URL'
        }
        return true
      },
    },
  ]
}
