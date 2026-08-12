'use client'

import { SelectField, useForm } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'
import { pageTemplates } from '../templates/pageTemplates'

export const TemplateSelectField: SelectFieldClientComponent = (props) => {
  const { getData, reset } = useForm()

  const applyTemplate = async (templateValue: string) => {
    const template = pageTemplates.find((t) => t.value === templateValue)
    const currentData = getData()

    await reset({
      ...currentData,
      template: templateValue,
      content: template ? template.getInitialContent() : [],
    })
  }

  const handleChange = (newValue: string | string[] | null) => {
    if (typeof newValue !== 'string') {
      return
    }
    void applyTemplate(newValue)
  }

  return <SelectField {...props} onChange={handleChange} />
}
