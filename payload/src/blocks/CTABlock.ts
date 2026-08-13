import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'Sekcje CTA',
  },
  fields: [
    {
      name: 'useGlobal',
      type: 'checkbox',
      label: 'Użyj globalnych ustawień CTA',
      defaultValue: true,
      admin: {
        description:
          'Domyślnie ta sekcja pokazuje treść ustawioną w Ustawienia → CTA (globalny). Odznacz, żeby ustawić inną treść tylko dla tej strony.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow (mały tekst nad nagłówkiem)',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobal,
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobal,
      },
      validate: (value: unknown, { siblingData }: { siblingData: unknown }) => {
        if (!(siblingData as { useGlobal?: boolean })?.useGlobal && !value) {
          return 'Podaj nagłówek (albo zaznacz "Użyj globalnych ustawień CTA")'
        }
        return true
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobal,
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie tła',
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobal,
        description:
          'Niewymagane na poziomie zapisu (żeby dało się utworzyć stronę z szablonu bez realnego zdjęcia) — Astro renderuje sekcję poprawnie też bez niego.',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Przycisk',
      fields: linkFields(),
      admin: {
        condition: (_, siblingData) => !siblingData?.useGlobal,
      },
    },
  ],
}
