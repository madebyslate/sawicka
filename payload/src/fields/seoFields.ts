import type { Field } from 'payload'

export function seoFields(): Field[] {
  return [
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta description',
      admin: {
        position: 'sidebar',
        description:
          'Krótki opis (do ok. 155 znaków) używany w wynikach wyszukiwania oraz jako og:description/twitter:description.',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Obraz social sharing (Open Graph)',
      admin: {
        position: 'sidebar',
        description:
          'Obraz pokazywany przy udostępnianiu linku (Facebook, LinkedIn, X/Twitter...). Zalecane min. 1200×630px.',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        position: 'sidebar',
        description:
          'Nadpisz canonical URL, jeśli ta sama treść ma być indeksowana pod innym adresem niż domyślny.',
      },
    },
  ]
}
