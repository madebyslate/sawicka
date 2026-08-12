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
