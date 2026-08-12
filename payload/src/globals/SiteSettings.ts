import type { GlobalConfig } from 'payload'
import { afterChangeGlobal } from '../hooks/triggerDeployHook'
import { authenticated } from '../access/authenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [afterChangeGlobal],
  },
  admin: {
    group: 'Ustawienia',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ogólne',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              label: 'Nazwa strony/firmy',
              admin: {
                description:
                  'Domyślny tytuł strony (<title>) i og:site_name, gdy konkretna podstrona nie ma własnego tytułu. Zasila też pole "name" w danych strukturalnych (JSON-LD) w zakładce Organization.',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Slogan / krótki opis',
              admin: {
                description:
                  'Domyślny meta description, gdy konkretna podstrona nie ma własnego opisu. Zasila też pola "slogan"/"description" w danych strukturalnych (JSON-LD) w zakładce Organization.',
              },
            },
          ],
        },
        {
          name: 'organization',
          label: 'Organization',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (dane strukturalne / przyszły Header)',
              admin: {
                description:
                  'Używane w JSON-LD organizacji (schema.org "logo"). Zalecany kwadratowy/poziomy PNG lub SVG na jasnym tle.',
              },
            },
            {
              name: 'legalName',
              type: 'text',
              label: 'Pełna nazwa prawna',
              admin: {
                description: 'Np. "Jan Kowalski Usługi Księgowe" — jeśli inna niż nazwa marketingowa (Nazwa strony/firmy w zakładce Ogólne).',
              },
            },
            {
              name: 'alternateName',
              type: 'array',
              label: 'Alternatywne nazwy',
              admin: {
                description:
                  'Inne nazwy, pod którymi firma jest rozpoznawana (skróty, wersja bez polskich znaków...). Trafiają do JSON-LD jako "alternateName" — pomaga wyszukiwarkom łączyć różne warianty nazwy z tą samą firmą.',
              },
              fields: [{ name: 'value', type: 'text', required: true, label: 'Nazwa' }],
            },
            {
              name: 'taxId',
              type: 'text',
              label: 'NIP',
              admin: {
                description: 'Trafia do danych strukturalnych (JSON-LD) jako "taxID" — standardowe pole dla polskich firm.',
              },
            },
            {
              name: 'registrationNumber',
              type: 'text',
              label: 'Numer rejestrowy (REGON / KRS)',
              admin: {
                description: 'Trafia do danych strukturalnych (JSON-LD) jako identyfikator firmy ("identifier").',
              },
            },
            {
              name: 'foundingDate',
              type: 'date',
              label: 'Data założenia firmy',
              admin: {
                date: { pickerAppearance: 'dayOnly' },
                description: 'Trafia do danych strukturalnych (JSON-LD) jako "foundingDate".',
              },
            },
            {
              name: 'founders',
              type: 'array',
              label: 'Założyciele / właściciele',
              labels: {
                singular: 'Osoba',
                plural: 'Osoby',
              },
              admin: {
                description:
                  'Realni właściciele/założyciele firmy — nie wymyślać. Trafiają do danych strukturalnych (JSON-LD) jako "founder".',
              },
              fields: [
                { name: 'givenName', type: 'text', required: true, label: 'Imię' },
                { name: 'familyName', type: 'text', required: true, label: 'Nazwisko' },
              ],
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              admin: {
                description:
                  'Trafia do danych strukturalnych (JSON-LD) jako "telephone". To NIE to samo pole co telefon w stopce (Footer → Dane kontaktowe) — tamten jest wyświetlany na stronie, ten tylko w JSON-LD. Wpisz oba, jeśli mają być spójne.',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'E-mail',
              admin: {
                description:
                  'Trafia do danych strukturalnych (JSON-LD) jako "email". To NIE to samo pole co e-mail w stopce (Footer → Dane kontaktowe) — analogicznie jak telefon.',
              },
            },
            {
              name: 'address',
              type: 'group',
              label: 'Adres',
              admin: {
                description: 'Ustrukturyzowany adres pod JSON-LD (schema.org PostalAddress).',
              },
              fields: [
                { name: 'streetAddress', type: 'text', label: 'Ulica i numer' },
                { name: 'addressLocality', type: 'text', label: 'Miasto' },
                { name: 'addressRegion', type: 'text', label: 'Województwo (np. "mazowieckie")' },
                { name: 'postalCode', type: 'text', label: 'Kod pocztowy' },
                { name: 'addressCountry', type: 'text', label: 'Kraj (kod ISO, np. "PL")', defaultValue: 'PL' },
              ],
            },
            {
              name: 'socialProfiles',
              type: 'array',
              label: 'Profile social media',
              labels: {
                singular: 'Profil',
                plural: 'Profile',
              },
              admin: {
                description:
                  'Realne URL-e profili (Facebook, Instagram, LinkedIn...) — trafiają do JSON-LD organizacji jako "sameAs". To NIE to samo co kolumna "Social Media" w stopce (tamta to menu nawigacyjne, może mieć placeholdery).',
                components: {
                  RowLabel: '/fields/RowLabel#RowLabel',
                },
              },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Platforma (np. "Instagram")' },
                { name: 'url', type: 'text', required: true, label: 'Pełny URL profilu' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
