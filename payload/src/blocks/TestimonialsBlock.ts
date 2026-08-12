import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Sekcje Testimonials',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (mały tekst nad nagłówkiem)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'testimonialsMode',
      type: 'radio',
      label: 'Wybór opinii',
      options: [
        { label: '3 najnowsze automatycznie', value: 'latest' },
        { label: 'Wybierz ręcznie', value: 'manual' },
      ],
      defaultValue: 'latest',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'manualTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Wybrane opinie',
      admin: {
        condition: (_, siblingData) => siblingData?.testimonialsMode === 'manual',
      },
      validate: (value, { siblingData }) => {
        const isManual = (siblingData as { testimonialsMode?: string })?.testimonialsMode === 'manual'
        const isEmpty = !value || (Array.isArray(value) && value.length === 0)
        if (isManual && isEmpty) {
          return 'Wybierz przynajmniej jedną opinię'
        }
        return true
      },
    },
  ],
}
