import type { CollectionConfig } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Opinie',
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
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'rating', 'updatedAt'],
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Treść opinii',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Rola / firma',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Ocena (1-5)',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie osoby',
    },
  ],
}
