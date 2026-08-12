import type { CollectionConfig } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { linkFields } from '../fields/linkFields'

export const Menu: CollectionConfig = {
  slug: 'menu',
  labels: {
    singular: 'Menu',
    plural: 'Nawigacja',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Ustawienia',
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nazwa menu (wewnętrzna, np. "Footer — Services")',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Elementy menu',
      labels: {
        singular: 'Element',
        plural: 'Elementy',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: linkFields(),
    },
  ],
}
