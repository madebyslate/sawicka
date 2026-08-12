import type { GlobalConfig } from 'payload'
import { afterChangeGlobal } from '../hooks/triggerDeployHook'
import { linkFields } from '../fields/linkFields'

export const Header: GlobalConfig = {
  slug: 'header',
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
