import { getPayload } from 'payload'
import config from '../payload.config'

const pageMetaDescriptions: Record<string, string> = {
  '/': 'Biuro rachunkowe Sawicka Grzyb — księgowość, kadry i płace oraz doradztwo biznesowe prowadzone osobiście, bez pośredników i przerzucania między działami.',
  'privacy-policy':
    'Polityka prywatności biura rachunkowego Sawicka Grzyb — jakie dane zbieramy, jak je wykorzystujemy i jakie prawa Ci przysługują zgodnie z RODO.',
  'terms-and-conditions':
    'Regulamin korzystania ze strony i usług księgowych Sawicka Grzyb — zasady współpracy, opłaty i obowiązki obu stron.',
}

const postMetaDescriptions: Record<string, string> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca':
    'Poznaj najczęstsze błędy podatkowe popełniane przez małe firmy i dowiedz się, jak ich uniknąć dzięki prostym nawykom księgowym.',
  'co-kazdy-pracodawca-powinien-wiedziec-o-kadrach-i-placach':
    'Podstawy naliczania wynagrodzeń, obowiązki pracodawcy i najczęstsze pułapki w kadrach i płacach.',
  'kiedy-jest-odpowiedni-moment-na-zatrudnienie-ksiegowej':
    'Poznaj sygnały, że Twoja firma jest gotowa na profesjonalne wsparcie księgowe i czego oczekiwać od dobrej współpracy.',
  'kwartalne-zaliczki-na-podatek-dla-malych-firm':
    'Kiedy mijają terminy kwartalnych zaliczek na podatek, jak są liczone i jak uniknąć odsetek za zwłokę.',
  'najczestsze-bledy-w-rozliczeniach-vat-i-jak-ich-unikac':
    'Najczęstsze błędy VAT — błędne stawki, przeoczone terminy i niepoprawne faktury — i jak ich unikać.',
  'checklista-podatkowa-na-koniec-roku-dla-przedsiebiorcow':
    'Praktyczna checklista na koniec roku, by zamknąć księgi bez niespodzianek w sezonie rozliczeniowym.',
  'jak-poprawnie-klasyfikowac-pracownikow-i-zleceniobiorcow':
    'Jak odróżnić pracownika od zleceniobiorcy i uniknąć kar za błędną klasyfikację zatrudnienia.',
  'przewodnik-po-benefitach-pracowniczych-i-potraceniach':
    'Obowiązkowe i dobrowolne potrącenia z wynagrodzenia — co każdy pracodawca powinien wiedzieć o benefitach pracowniczych.',
  'co-zrobic-gdy-cos-pojdzie-nie-tak-z-lista-plac':
    'Co zrobić, gdy w liście płac pojawi się błąd — jak go szybko naprawić i zachować zgodność z przepisami.',
  '5-sygnalow-ze-twoja-ksiegowosc-wymaga-sprawdzenia':
    'Pięć sygnałów ostrzegawczych, które oznaczają, że Twoja księgowość wymaga ponownego przeglądu.',
  'jak-przygotowac-firme-do-udanego-audytu':
    'Jak utrzymać dokumentację gotową do audytu przez cały rok i przejść kontrolę bez stresu.',
  'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow':
    'Zysk na papierze to nie to samo co gotówka w kasie — podstawy zarządzania przepływami pieniężnymi w firmie.',
}

const categoryContent: Record<string, { description: string; metaDescription: string }> = {
  'poradnik-podatkowy': {
    description:
      'Praktyczne wskazówki podatkowe dla przedsiębiorców — terminy, odliczenia i jak zachować zgodność z przepisami bez stresu.',
    metaDescription:
      'Artykuły o podatkach dla właścicieli firm — terminy, odliczenia, VAT i rozliczenia bez niespodzianek.',
  },
  'kadry-i-place': {
    description:
      'Wszystko, co pracodawca powinien wiedzieć o wynagrodzeniach, klasyfikacji zatrudnienia i wsparciu zespołu.',
    metaDescription:
      'Poradnik kadrowo-płacowy dla pracodawców — wynagrodzenia, klasyfikacja zatrudnienia i obowiązki wobec zespołu.',
  },
  'porady-biznesowe': {
    description:
      'Praktyczne porady dotyczące księgowości, przepływów pieniężnych i prowadzenia finansowo zdrowej firmy.',
    metaDescription:
      'Praktyczne porady biznesowe — księgowość, przepływy pieniężne i zdrowe finanse firmy.',
  },
}

async function seed() {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  if (!siteSettings.tagline) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        tagline:
          'Biuro rachunkowe Sawicka Grzyb — rzetelna księgowość, kadry i płace oraz doradztwo biznesowe dla właścicieli firm.',
      },
    })
    console.log('✓ Ustawiono Site Settings → tagline (globalny fallback meta description)')
  } else {
    console.log('↷ Site Settings → tagline już ustawiony — pomijam')
  }

  if (!siteSettings.organization?.phone) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        organization: {
          legalName: 'Sawicka Grzyb',
          phone: '(+48) 039 1038 0339',
          email: 'hello@sawickagrzyb.pl',
          address: {
            streetAddress: 'ul. Kwiatowa 12',
            addressLocality: 'Warszawa',
            addressRegion: 'mazowieckie',
            postalCode: '00-001',
            addressCountry: 'PL',
          },
        },
      },
    })
    console.log(
      '✓ Ustawiono Site Settings → Organization (dane kontaktowe placeholder — NIP, REGON/KRS, data założenia i założyciele celowo pominięte, patrz podsumowanie)',
    )
  } else {
    console.log('↷ Site Settings → Organization już ustawione — pomijam')
  }

  for (const [slug, metaDescription] of Object.entries(pageMetaDescriptions)) {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Strona "${slug}" nie istnieje — pomijam`)
      continue
    }
    if (doc.metaDescription) {
      console.log(`↷ Strona "${slug}" ma już metaDescription — pomijam`)
      continue
    }
    await payload.update({ collection: 'pages', id: doc.id, data: { metaDescription } })
    console.log(`✓ Ustawiono metaDescription dla strony "${slug}"`)
  }

  for (const [slug, metaDescription] of Object.entries(postMetaDescriptions)) {
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Post "${slug}" nie istnieje — pomijam`)
      continue
    }
    if (doc.metaDescription) {
      console.log(`↷ Post "${slug}" ma już metaDescription — pomijam`)
      continue
    }
    await payload.update({ collection: 'posts', id: doc.id, data: { metaDescription } })
    console.log(`✓ Ustawiono metaDescription dla posta "${slug}"`)
  }

  for (const [slug, content] of Object.entries(categoryContent)) {
    const { docs } = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Kategoria "${slug}" nie istnieje — pomijam`)
      continue
    }
    await payload.update({
      collection: 'categories',
      id: doc.id,
      data: { description: content.description, metaDescription: content.metaDescription },
    })
    console.log(`✓ Zaktualizowano description/metaDescription dla kategorii "${slug}"`)
  }

  console.log('\n✓ Uzupełnianie SEO i Organization zakończone')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
