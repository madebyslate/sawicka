import type { GlobalConfig } from 'payload'
import { afterChangeGlobal } from '../hooks/triggerDeployHook'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChangeGlobal],
  },
  admin: {
    group: 'Ustawienia',
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      label: 'Dane kontaktowe',
      fields: [
        {
          name: 'address',
          type: 'group',
          label: 'Adres',
          fields: [
            { name: 'label', type: 'text', label: 'Nagłówek', defaultValue: 'Address' },
            { name: 'value', type: 'textarea', label: 'Treść (Enter = nowa linia)' },
          ],
        },
        {
          name: 'phone',
          type: 'group',
          label: 'Telefon',
          fields: [
            { name: 'label', type: 'text', label: 'Nagłówek', defaultValue: 'Phone' },
            { name: 'value', type: 'text', label: 'Treść' },
          ],
        },
        {
          name: 'email',
          type: 'group',
          label: 'E-mail',
          fields: [
            { name: 'label', type: 'text', label: 'Nagłówek', defaultValue: 'Email' },
            { name: 'value', type: 'email', label: 'Treść' },
          ],
        },
        {
          name: 'hours',
          type: 'group',
          label: 'Godziny pracy',
          fields: [
            { name: 'label', type: 'text', label: 'Nagłówek', defaultValue: 'Hours' },
            { name: 'value', type: 'textarea', label: 'Treść (Enter = nowa linia)' },
          ],
        },
      ],
    },
    {
      name: 'linkColumns',
      type: 'array',
      label: 'Kolumny linków',
      labels: {
        singular: 'Kolumna',
        plural: 'Kolumny',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Nazwa kolumny (wyświetlana w stopce)',
          required: true,
        },
        {
          name: 'menu',
          type: 'relationship',
          relationTo: 'menu',
          label: 'Menu (źródło linków)',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Tekst praw autorskich (bez roku — rok dodawany automatycznie)',
      defaultValue: 'Sawicka Grzyb. All rights reserved.',
    },
    {
      name: 'legalMenu',
      type: 'relationship',
      relationTo: 'menu',
      label: 'Menu prawne (Privacy Policy, Terms & Condition...)',
    },
  ],
}
