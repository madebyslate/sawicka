import { getPayload } from 'payload'
import config from '../payload.config'
import { buildContent, type LexicalBlock } from './lexicalBuilder'

const privacyPolicyContent: LexicalBlock[] = [
  { h: 2, text: 'Wprowadzenie' },
  {
    p: 'Sawicka Grzyb („my", „nas", „nasze") szanuje Twoją prywatność i dba o ochronę danych osobowych, które nam powierzasz. Niniejsza Polityka Prywatności wyjaśnia, jakie informacje zbieramy, dlaczego je zbieramy, jak je wykorzystujemy oraz jakie prawa przysługują Ci w związku z Twoimi danymi.',
  },
  {
    p: 'Korzystając z naszej strony internetowej lub usług księgowych, zgadzasz się na zbieranie i wykorzystywanie informacji zgodnie z niniejszą polityką.',
  },
  { h: 2, text: 'Administrator danych' },
  {
    p: 'Administratorem danych osobowych jest Sawicka Grzyb. Jeśli masz pytania dotyczące niniejszej polityki lub sposobu przetwarzania Twoich danych, możesz się z nami skontaktować, korzystając z danych kontaktowych podanych w stopce tej strony.',
  },
  { hr: true },
  { h: 2, text: 'Jakie informacje zbieramy' },
  { h: 3, text: 'Informacje podawane bezpośrednio przez Ciebie' },
  {
    ul: [
      'Imię, nazwisko i dane kontaktowe (adres e-mail, numer telefonu)',
      'Informacje o firmie (nazwa firmy, numer rejestrowy, NIP)',
      'Dokumenty finansowe i księgowe udostępniane nam w związku ze świadczonymi usługami',
      'Wiadomości wysyłane przez formularze kontaktowe lub e-mail',
    ],
  },
  { h: 3, text: 'Informacje zbierane automatycznie' },
  {
    ul: [
      'Adres IP i przybliżona lokalizacja',
      'Typ przeglądarki i informacje o urządzeniu',
      'Odwiedzane podstrony i czas spędzony na stronie',
      'Strona lub źródło odsyłające',
    ],
  },
  { h: 2, text: 'Podstawa prawna przetwarzania' },
  {
    p: 'Przetwarzamy Twoje dane osobowe wyłącznie wtedy, gdy mamy do tego ważną podstawę prawną zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO):',
  },
  {
    ol: [
      'Twoja zgoda (np. przy wysłaniu formularza kontaktowego)',
      'Wykonanie umowy (np. świadczenie usług księgowych)',
      'Wypełnienie obowiązku prawnego (np. wymogi dotyczące prowadzenia dokumentacji podatkowej i księgowej)',
      'Nasz prawnie uzasadniony interes (np. rozwój strony internetowej i usług)',
    ],
  },
  { hr: true },
  { h: 2, text: 'Jak wykorzystujemy Twoje informacje' },
  {
    ul: [
      'Aby świadczyć i zarządzać naszymi usługami księgowymi i doradczymi',
      'Aby odpowiadać na Twoje zapytania i się z Tobą komunikować',
      'Aby wypełniać obowiązki prawne, podatkowe i regulacyjne',
      'Aby zapewnić bezpieczeństwo i prawidłowe działanie naszej strony',
      'Aby ulepszać nasze usługi na podstawie sposobu korzystania ze strony',
    ],
  },
  { h: 2, text: 'Udostępnianie Twoich informacji' },
  {
    p: 'Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych. Udostępniamy informacje osobom trzecim tylko wtedy, gdy jest to konieczne, i zawsze z zastosowaniem odpowiednich zabezpieczeń:',
  },
  {
    ul: [
      'Organy podatkowe i instytucje publiczne, gdy wymaga tego prawo',
      'Dostawcy usług IT i hostingu wspierający nasze systemy',
      'Doradcy zawodowi (np. obsługa prawna), gdy jest to konieczne',
    ],
  },
  { hr: true },
  { h: 2, text: 'Przechowywanie danych' },
  {
    p: 'Przechowujemy dane osobowe wyłącznie tak długo, jak jest to konieczne do realizacji celów opisanych w niniejszej polityce lub jak wymaga tego obowiązujące prawo.',
  },
  { h: 4, text: 'Okresy przechowywania' },
  {
    ul: [
      'Dokumentacja księgowa i podatkowa: przechowywana zgodnie z wymogami ustawowymi prawa polskiego (zazwyczaj 5 lat)',
      'Zgłoszenia z formularza kontaktowego: przechowywane do momentu rozpatrzenia zapytania, chyba że dłuższy okres wynika z przepisów prawa',
      'Dane analityczne strony: przechowywane w formie zagregowanej i zanonimizowanej, gdy to możliwe',
    ],
  },
  { h: 2, text: 'Twoje prawa wynikające z RODO' },
  { p: 'Przysługują Ci następujące prawa dotyczące Twoich danych osobowych:' },
  {
    ul: [
      'Prawo dostępu do danych osobowych, które posiadamy na Twój temat',
      'Prawo żądania sprostowania nieprawidłowych danych',
      'Prawo żądania usunięcia danych, tam gdzie ma to zastosowanie',
      'Prawo do ograniczenia lub wniesienia sprzeciwu wobec określonego przetwarzania',
      'Prawo do przenoszenia danych',
      'Prawo do wycofania zgody w dowolnym momencie, gdy przetwarzanie odbywa się na jej podstawie',
      'Prawo wniesienia skargi do Urzędu Ochrony Danych Osobowych (UODO)',
    ],
  },
  {
    quote:
      'Aby skorzystać z któregokolwiek z tych praw, po prostu skontaktuj się z nami, korzystając z danych podanych w stopce — odpowiemy w terminach wymaganych przez prawo.',
  },
  { hr: true },
  { h: 2, text: 'Pliki cookies' },
  {
    p: 'Nasza strona wykorzystuje pliki cookies i podobne technologie, aby poprawić komfort przeglądania i zrozumieć, jak strona jest używana.',
  },
  { h: 3, text: 'Rodzaje wykorzystywanych plików cookies' },
  {
    ul: [
      'Niezbędne pliki cookies, wymagane do prawidłowego działania strony',
      'Analityczne pliki cookies, które pomagają nam zrozumieć, jak odwiedzający korzystają ze strony',
    ],
  },
  {
    p: 'W każdej chwili możesz kontrolować lub wyłączyć pliki cookies w ustawieniach przeglądarki, choć może to wpłynąć na niektóre funkcje strony.',
  },
  { h: 2, text: 'Bezpieczeństwo danych' },
  {
    p: 'Wdrażamy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieautoryzowanym dostępem, utratą lub niewłaściwym wykorzystaniem. Żadna metoda transmisji danych przez internet nie jest jednak w pełni bezpieczna i nie możemy zagwarantować absolutnego bezpieczeństwa.',
  },
  { h: 2, text: 'Zmiany w niniejszej polityce' },
  {
    p: 'Możemy od czasu do czasu aktualizować niniejszą Politykę Prywatności, aby odzwierciedlić zmiany w naszych praktykach lub wymogach prawnych. Wszelkie aktualizacje zostaną opublikowane na tej stronie wraz ze zaktualizowaną datą obowiązywania.',
  },
  { h: 2, text: 'Kontakt' },
  {
    p: 'Jeśli masz pytania dotyczące niniejszej Polityki Prywatności lub sposobu przetwarzania Twoich danych osobowych, skontaktuj się z nami, korzystając z danych kontaktowych podanych w stopce tej strony.',
  },
]

const termsAndConditionsContent: LexicalBlock[] = [
  { h: 2, text: 'Wprowadzenie' },
  {
    p: 'Niniejszy Regulamin określa zasady korzystania ze strony internetowej Sawicka Grzyb oraz świadczonych przez nas usług księgowych. Korzystając z tej strony lub naszych usług, zgadzasz się na przestrzeganie niniejszego regulaminu.',
  },
  { hr: true },
  { h: 2, text: 'Nasze usługi' },
  {
    p: 'Sawicka Grzyb świadczy usługi księgowe, kadrowo-płacowe oraz doradztwa biznesowego dla osób fizycznych i firm. Dokładny zakres usług jest ustalany indywidualnie z każdym klientem przed rozpoczęciem współpracy.',
  },
  { h: 3, text: 'Umowy o świadczenie usług' },
  {
    p: 'Konkretny zakres współpracy, produkty i opłaty są potwierdzane odrębnie z każdym klientem, pisemnie lub e-mailowo, przed rozpoczęciem jakichkolwiek prac.',
  },
  { h: 2, text: 'Korzystanie z tej strony' },
  {
    ul: [
      'Możesz korzystać z tej strony wyłącznie w zgodnych z prawem celach',
      'Treści na tej stronie mają charakter ogólnoinformacyjny i nie stanowią porady finansowej ani prawnej',
      'Zastrzegamy sobie prawo do aktualizacji lub zmiany treści strony w dowolnym momencie bez wcześniejszego powiadomienia',
    ],
  },
  { hr: true },
  { h: 2, text: 'Obowiązki klienta' },
  { p: 'Aby zapewnić dokładne i terminowe usługi księgowe, polegamy na tym, że klienci będą:' },
  {
    ol: [
      'Dostarczać kompletne, dokładne i terminowe informacje oraz dokumenty finansowe',
      'Niezwłocznie odpowiadać na prośby o wyjaśnienia lub brakujące informacje',
      'Dotrzymywać uzgodnionych terminów dostarczania dokumentacji',
      'Niezwłocznie informować nas o wszelkich zmianach istotnych dla ich sytuacji księgowej lub podatkowej',
    ],
  },
  {
    quote:
      'Dokładność i terminowość naszej pracy zależy bezpośrednio od dokładności i terminowości informacji, które nam przekazujesz.',
  },
  { h: 2, text: 'Opłaty i płatności' },
  {
    p: 'Opłaty za nasze usługi są ustalane z góry i mogą zależeć od złożoności, zakresu i częstotliwości świadczonych usług. Faktury są płatne w terminach określonych na każdej fakturze, chyba że pisemnie uzgodniono inaczej.',
  },
  { h: 4, text: 'Opóźnienia w płatnościach' },
  {
    p: 'Zastrzegamy sobie prawo do naliczania odsetek od zaległych faktur oraz do zawieszenia usług do czasu uregulowania zaległych płatności.',
  },
  { h: 2, text: 'Poufność' },
  {
    p: 'Wszystkie informacje klientów traktujemy jako poufne i nie ujawniamy ich osobom trzecim, z wyjątkiem sytuacji wymaganych przez prawo, na życzenie klienta lub gdy jest to niezbędne do realizacji uzgodnionych usług (np. składanie deklaracji do urzędów skarbowych).',
  },
  { hr: true },
  { h: 2, text: 'Ograniczenie odpowiedzialności' },
  {
    p: 'Mimo że dokładamy wszelkiej staranności przy świadczeniu naszych usług, nie ponosimy odpowiedzialności za straty wynikające z nieprawidłowych, niekompletnych lub spóźnionych informacji dostarczonych przez klienta, ani z okoliczności pozostających poza naszą uzasadnioną kontrolą.',
  },
  { h: 2, text: 'Własność intelektualna' },
  {
    p: 'Wszystkie treści na tej stronie, w tym teksty, grafiki i logotypy, stanowią własność Sawicka Grzyb, chyba że wskazano inaczej, i nie mogą być powielane bez zgody.',
  },
  { h: 2, text: 'Zakończenie współpracy' },
  {
    ul: [
      'Każda ze stron może zakończyć współpracę z zachowaniem rozsądnego, pisemnego wypowiedzenia',
      'Opłaty za prace wykonane do dnia zakończenia współpracy pozostają należne',
      'Wesprzemy sprawne przekazanie dokumentacji nowej księgowej, jeśli zostanie o to poproszone',
    ],
  },
  { h: 2, text: 'Prawo właściwe' },
  {
    p: 'Niniejszy Regulamin podlega prawu polskiemu i zgodnie z nim jest interpretowany. Wszelkie spory podlegają wyłącznej właściwości sądów polskich.',
  },
  { h: 2, text: 'Zmiany w niniejszym Regulaminie' },
  {
    p: 'Możemy od czasu do czasu aktualizować niniejszy Regulamin. Dalsze korzystanie z naszej strony lub usług po opublikowaniu zmian oznacza akceptację zaktualizowanego regulaminu.',
  },
  { h: 2, text: 'Kontakt' },
  {
    p: 'Jeśli masz pytania dotyczące niniejszego Regulaminu, skontaktuj się z nami, korzystając z danych kontaktowych podanych w stopce tej strony.',
  },
]

const textPages: Record<string, { title: string; tagline: string; heading: string; content: LexicalBlock[] }> = {
  'privacy-policy': {
    title: 'Polityka Prywatności',
    tagline: 'Informacje prawne',
    heading: 'Polityka Prywatności',
    content: privacyPolicyContent,
  },
  'terms-and-conditions': {
    title: 'Regulamin',
    tagline: 'Informacje prawne',
    heading: 'Regulamin',
    content: termsAndConditionsContent,
  },
}

async function seed() {
  const payload = await getPayload({ config })

  for (const [slug, page] of Object.entries(textPages)) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    const doc = existing.docs[0]

    const textPageBlock = {
      blockType: 'textPage' as const,
      tagline: page.tagline,
      heading: page.heading,
      content: buildContent(page.content),
    }

    if (doc) {
      await payload.update({
        collection: 'pages',
        id: doc.id,
        data: { content: [textPageBlock] },
      })
      console.log(`✓ Zaktualizowano treść strony "${slug}"`)
      continue
    }

    const created = await payload.create({
      collection: 'pages',
      data: {
        internalName: page.title,
        title: page.title,
        slug,
        generateSlug: false,
        content: [textPageBlock],
      },
      draft: false,
    })
    console.log(`✓ Utworzono stronę "${slug}" (${created.id})`)
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
