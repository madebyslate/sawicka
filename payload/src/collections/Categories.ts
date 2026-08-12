import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { seoFields } from '../fields/seoFields'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategoria',
    plural: 'Kategorie',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Treść',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  fields: [
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
