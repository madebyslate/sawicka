import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { seoFields } from '../fields/seoFields'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategoria',
    plural: 'Kategorie',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Treść',
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'name', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'internalName',
      type: 'text',
      label: 'Internal page name',
      admin: {
        position: 'sidebar',
        description: 'Nazwa używana tylko w panelu administracyjnym. Nie wyświetla się na stronie.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nazwa (np. "Tax Guide")',
    },
    slugField({
      fieldToUse: 'name',
      position: 'sidebar',
      overrides: (field) => {
        const slugTextField = field.fields[1] as TextField
        slugTextField.label = 'Category URL / slug'
        slugTextField.admin = {
          ...slugTextField.admin,
          description: 'Adres URL kategorii. Slug musi być unikalny w serwisie i powinien być krótki oraz czytelny.',
        }
        return field
      },
    }),
    ...seoFields(),
  ],
}
