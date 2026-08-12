import type { Block } from 'payload'

export const TrustStatementAndStatisticsBlock: Block = {
  slug: 'trustStatementAndStatistics',
  labels: {
    singular: 'Trust Statement and Statistics',
    plural: 'Sekcje Trust Statement and Statistics',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Nagłówek',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statystyki',
      labels: {
        singular: 'Statystyka',
        plural: 'Statystyki',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Wartość (np. "8")',
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Sufiks (np. "+" albo "%")',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Etykieta (np. "Years of Experience")',
        },
      ],
    },
  ],
}
