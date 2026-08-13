import type { GlobalConfig } from 'payload'
import { afterChangeGlobal } from '../hooks/triggerDeployHook'
import { linkFields } from '../fields/linkFields'
import { authenticated } from '../access/authenticated'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [afterChangeGlobal],
  },
  admin: {
    group: 'Ustawienia',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Logo w nagłówku strony. Jeśli puste, używane jest domyślne logo z kodu.',
      },
    },
    {
      name: 'logoLink',
      type: 'text',
      label: 'Link pod logo',
      defaultValue: '/',
      admin: {
        description: 'Adres, na który przechodzi kliknięcie w logo. Domyślnie strona główna ("/").',
      },
    },
    {
      name: 'mainMenu',
      type: 'relationship',
      relationTo: 'menu',
      label: 'Główne menu nawigacyjne',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Przycisk CTA',
      fields: linkFields(),
    },
  ],
}
