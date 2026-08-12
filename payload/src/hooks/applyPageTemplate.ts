import type { CollectionBeforeChangeHook } from 'payload'
import { pageTemplates } from '../templates/pageTemplates'

export const applyPageTemplate: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation !== 'create') return data
  if (Array.isArray(data.content) && data.content.length > 0) return data

  const template = pageTemplates.find((t) => t.value === data.template)
  if (!template) return data

  return {
    ...data,
    content: template.getInitialContent(),
  }
}
