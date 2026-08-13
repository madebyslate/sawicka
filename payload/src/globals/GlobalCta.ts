import type { GlobalConfig } from 'payload'
import { afterChangeGlobal } from '../hooks/triggerDeployHook'
import { authenticated } from '../access/authenticated'
import { linkFields } from '../fields/linkFields'

export const GlobalCta: GlobalConfig = {
  slug: 'global-cta',
  label: 'CTA (globalny)',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [afterChangeGlobal],
  },
  admin: {
    group: 'Ustawienia',
    description:
      'Domyślna treść bloku CTA — używana wszędzie tam, gdzie blok CTA na stronie ma włączone "Użyj globalnych ustawień".',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow (mały tekst nad nagłówkiem)',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie tła',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Przycisk',
      fields: linkFields(),
    },
  ],
}
