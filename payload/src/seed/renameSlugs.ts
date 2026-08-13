import { getPayload } from 'payload'
import config from '../payload.config'

const categorySlugRenames: Record<string, string> = {
  'tax-guide': 'poradnik-podatkowy',
  payroll: 'kadry-i-place',
  'business-tips': 'porady-biznesowe',
}

const postSlugRenames: Record<string, string> = {
  'tax-mistakes-every-business-owner-should-avoid': '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca',
  'what-every-employer-should-know-about-payroll': 'co-kazdy-pracodawca-powinien-wiedziec-o-kadrach-i-placach',
  'when-is-the-right-time-to-hire-an-accountant': 'kiedy-jest-odpowiedni-moment-na-zatrudnienie-ksiegowej',
  'understanding-quarterly-tax-payments-for-small-businesses': 'kwartalne-zaliczki-na-podatek-dla-malych-firm',
  'common-vat-mistakes-and-how-to-avoid-them': 'najczestsze-bledy-w-rozliczeniach-vat-i-jak-ich-unikac',
  'year-end-tax-planning-checklist-for-business-owners': 'checklista-podatkowa-na-koniec-roku-dla-przedsiebiorcow',
  'how-to-correctly-classify-employees-vs-contractors': 'jak-poprawnie-klasyfikowac-pracownikow-i-zleceniobiorcow',
  'a-simple-guide-to-employee-benefits-and-payroll-deductions': 'przewodnik-po-benefitach-pracowniczych-i-potraceniach',
  'what-to-do-when-payroll-goes-wrong': 'co-zrobic-gdy-cos-pojdzie-nie-tak-z-lista-plac',
  '5-signs-your-bookkeeping-needs-a-second-look': '5-sygnalow-ze-twoja-ksiegowosc-wymaga-sprawdzenia',
  'how-to-prepare-your-business-for-a-successful-audit': 'jak-przygotowac-firme-do-udanego-audytu',
  'cash-flow-basics-every-business-owner-should-know': 'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow',
}

async function rename() {
  const payload = await getPayload({ config })

  for (const [oldSlug, newSlug] of Object.entries(categorySlugRenames)) {
    const { docs } = await payload.find({ collection: 'categories', where: { slug: { equals: oldSlug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Kategoria "${oldSlug}" nie istnieje — pomijam`)
      continue
    }
    await payload.update({ collection: 'categories', id: doc.id, data: { slug: newSlug, generateSlug: false } })
    console.log(`✓ Kategoria: ${oldSlug} → ${newSlug}`)
  }

  for (const [oldSlug, newSlug] of Object.entries(postSlugRenames)) {
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: oldSlug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Post "${oldSlug}" nie istnieje — pomijam`)
      continue
    }
    await payload.update({ collection: 'posts', id: doc.id, data: { slug: newSlug, generateSlug: false } })
    console.log(`✓ Post: ${oldSlug} → ${newSlug}`)
  }

  console.log('\n✓ Zmiana slugów zakończona')
  process.exit(0)
}

rename().catch((err) => {
  console.error(err)
  process.exit(1)
})
