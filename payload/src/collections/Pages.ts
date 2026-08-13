import type { CollectionConfig, TextField } from 'payload'
import { slugField } from 'payload'
import { afterChangeCollection, afterDeleteCollection } from '../hooks/triggerDeployHook'
import { authenticated } from '../access/authenticated'
import { HeroBlock } from '../blocks/HeroBlock'
import { CTABlock } from '../blocks/CTABlock'
import { BlogBlock } from '../blocks/BlogBlock'
import { FaqBlock } from '../blocks/FaqBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { OnboardingProcessBlock } from '../blocks/OnboardingProcessBlock'
import { ExperienceAndTrustBlock } from '../blocks/ExperienceAndTrustBlock'
import { PersonalRelationshipBlock } from '../blocks/PersonalRelationshipBlock'
import { ServicesBlock } from '../blocks/ServicesBlock'
import { PainPointsBlock } from '../blocks/PainPointsBlock'
import { TrustStatementAndStatisticsBlock } from '../blocks/TrustStatementAndStatisticsBlock'
import { TextPageBlock } from '../blocks/TextPageBlock'
import { seoFields } from '../fields/seoFields'
import { pageTemplates } from '../templates/pageTemplates'
import { applyPageTemplate } from '../hooks/applyPageTemplate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Strona',
    plural: 'Strony',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [applyPageTemplate],
    afterChange: [afterChangeCollection],
    afterDelete: [afterDeleteCollection],
  },
  admin: {
    group: 'Treść',
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'slug', 'updatedAt'],
    preview: (doc) => {
      const slug = doc.slug as string | undefined
      if (!slug) return null
      const baseUrl = process.env.PUBLIC_FRONTEND_URL || ''
      return slug === '/' ? baseUrl || '/' : `${baseUrl}/${slug}`
    },
  },
  fields: [
    {
      name: 'template',
      type: 'select',
      label: 'Szablon startowy',
      options: pageTemplates.map((t) => ({ label: t.label, value: t.value })),
      defaultValue: 'blank',
      admin: {
        description:
          'Określa TYLKO początkową zawartość przy tworzeniu strony — bloki nadal można dowolnie dodawać, usuwać, edytować i przestawiać. Wybór nie ma żadnego wpływu później (nic się nie synchronizuje ani nie nadpisuje).',
        // Widoczne tylko przy tworzeniu nowej strony — `data.id` istnieje
        // dopiero po pierwszym zapisie. To ten sam, standardowy wzorzec
        // Payloada na "pole tylko na create".
        condition: (data) => !data?.id,
        components: {
          // Podmienia domyślny SelectField, żeby zawartość (bloki) pojawiała
          // się w polu `content` OD RAZU po wyborze wariantu, nie dopiero po
          // zapisie — patrz doc comment w fields/TemplateSelectField.tsx.
          Field: '/fields/TemplateSelectField#TemplateSelectField',
        },
      },
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Zawartość (bloki)',
      admin: {
        width: '60%',
      },
      blocks: [
        HeroBlock,
        TrustStatementAndStatisticsBlock,
        PainPointsBlock,
        ServicesBlock,
        PersonalRelationshipBlock,
        ExperienceAndTrustBlock,
        OnboardingProcessBlock,
        TestimonialsBlock,
        BlogBlock,
        FaqBlock,
        CTABlock,
        TextPageBlock,
      ],
    },
    {
      name: 'internalName',
      type: 'text',
      required: true,
      label: 'Internal page name',
      admin: {
        position: 'sidebar',
        description: 'Nazwa używana tylko w panelu administracyjnym. Nie wyświetla się na stronie.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      admin: {
        position: 'sidebar',
        description: 'Nazwa strony widoczna publicznie. Pojawia się w pasku tytułu przeglądarki oraz w wynikach wyszukiwania.',
      },
    },
    slugField({
      position: 'sidebar',
      overrides: (field) => {
        const slugTextField = field.fields[1] as TextField
        slugTextField.label = 'Page URL / slug'
        slugTextField.admin = {
          ...slugTextField.admin,
          description:
            'Adres URL strony. Slug musi być unikalny w serwisie i powinien być krótki oraz czytelny. Strona główna serwisu ma slug "/".',
        }
        return field
      },
    }),
    ...seoFields(),
  ],
}
