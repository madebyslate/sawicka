import type { Block } from 'payload'

export const OnboardingProcessBlock: Block = {
  slug: 'onboardingProcess',
  labels: {
    singular: 'Onboarding Process',
    plural: 'Sekcje Onboarding Process',
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
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie',
      admin: {
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego.',
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Kroki procesu',
      labels: {
        singular: 'Krok',
        plural: 'Kroki',
      },
      admin: {
        components: {
          RowLabel: '/fields/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
          label: 'Etykieta kroku (np. "Step 1")',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Opis',
        },
      ],
    },
  ],
}
