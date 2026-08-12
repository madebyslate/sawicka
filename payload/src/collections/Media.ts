import type { CollectionConfig } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
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
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 1920, withoutEnlargement: true },
  },
}
