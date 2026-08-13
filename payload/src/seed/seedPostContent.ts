import { getPayload } from 'payload'
import config from '../payload.config'
import { buildContent, type LexicalBlock as Block } from './lexicalBuilder'

const postContent: Record<string, Block[]> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca': [
    { h: 2, text: 'Dlaczego dochodzi do tych błędów' },
    {
      p: 'Większość błędów podatkowych nie wynika z niedbalstwa — pojawiają się, bo przedsiębiorcy żonglują zbyt wieloma obowiązkami naraz. Rozpoznanie najczęstszych z nich to pierwszy krok, by ich uniknąć.',
    },
    { h: 3, text: 'Najczęstsze błędy' },
    {
      ul: [
        'Mieszanie wydatków prywatnych i firmowych',
        'Przeoczenie kwartalnych terminów rozliczeń',
        'Zaniżanie dochodów gotówkowych',
        'Brak przechowywania paragonów i dokumentów potwierdzających',
        'Błędna klasyfikacja pracowników',
      ],
    },
    { h: 4, text: 'Bliżej rozliczania gotówki' },
    {
      p: 'Transakcje gotówkowe najłatwiej zaniżyć — i najłatwiej wychwycić urzędowi skarbowemu podczas kontroli. Zapisywanie każdej płatności gotówkowej na bieżąco, zamiast z pamięci później, eliminuje domysły.',
    },
    { hr: true },
    { h: 2, text: 'Koszt pomyłki' },
    {
      p: 'Kary za spóźnione lub błędne rozliczenia szybko się kumulują, a powtarzające się błędy mogą sprowadzić na firmę dokładniejszą kontrolę urzędu skarbowego. Poza kosztem finansowym, pomyłki zabierają czas i energię, które powinny trafić do prowadzenia firmy.',
    },
    {
      quote:
        'Firmy, które mają największe problemy z podatkami, to nie te o skomplikowanych finansach — to te bez systemu.',
    },
    { h: 3, text: 'Kroki do podjęcia już teraz' },
    {
      ol: [
        'Rozdziel konto firmowe i prywatne, jeśli jeszcze tego nie zrobiłeś',
        'Ustaw przypomnienia w kalendarzu dla każdego terminu rozliczenia',
        'Zacznij zapisywać transakcje gotówkowe codziennie',
        'Umów przegląd z księgową',
      ],
    },
    { h: 2, text: 'Szybka samokontrola' },
    {
      checklist: [
        { text: 'Wydatki firmowe i prywatne są rozdzielone', checked: true },
        { text: 'Wszystkie kwartalne terminy są we wspólnym kalendarzu', checked: true },
        { text: 'Dochód gotówkowy jest zapisywany na bieżąco' },
        { text: 'Paragony są przechowywane cyfrowo, a nie w pudełku po butach' },
      ],
    },
    { h: 2, text: 'Jak być zawsze o krok do przodu' },
    { p: 'Prosta rutyna — osobne konta, comiesięczna księgowość i kalendarz terminów — zapobiega niemal każdemu błędowi z tej listy, zanim się pojawi.' },
  ],
  'co-kazdy-pracodawca-powinien-wiedziec-o-kadrach-i-placach': [
    { h: 2, text: 'Podstawy prowadzenia listy płac' },
    {
      p: 'Kadry i płace to coś więcej niż terminowe wypłacanie wynagrodzeń. Obejmują pobór zaliczek podatkowych, składki na ubezpieczenia społeczne i dokładną dokumentację — wszystko to wiąże się z obowiązkami prawnymi.',
    },
    { h: 3, text: 'Co obejmuje każde rozliczenie wynagrodzeń' },
    {
      ol: [
        'Obliczenie wynagrodzenia brutto dla każdego pracownika',
        'Pobranie właściwych podatków i składek',
        'Wystawienie pasków wynagrodzeń',
        'Złożenie deklaracji i przekazanie płatności do odpowiednich urzędów',
      ],
    },
    { h: 3, text: 'Najczęstsze obowiązki pracodawcy' },
    {
      p: 'Pracodawcy odpowiadają za prowadzenie dokładnej dokumentacji zatrudnienia, dotrzymywanie terminów raportowania i śledzenie zmian w przepisach dotyczących wynagrodzeń — nawet drobne błędy mogą skutkować karami.',
    },
    { h: 2, text: 'Dobre kadry i płace od pierwszego dnia' },
    { p: 'Ustalenie jasnego procesu rozliczania wynagrodzeń wcześnie — zamiast naprawiania problemów, gdy już się pojawią — oszczędza czas i chroni zarówno firmę, jak i pracowników.' },
  ],
  'kiedy-jest-odpowiedni-moment-na-zatrudnienie-ksiegowej': [
    { h: 2, text: 'Sygnały, że możesz być gotowy' },
    {
      ul: [
        'Poświęcasz co tydzień godziny na księgowość zamiast prowadzić firmę',
        'Okres rozliczeń podatkowych jest stresujący lub niejasny',
        'Twoja firma rośnie, a finanse robią się coraz bardziej złożone',
        'Zdarzyły Ci się w przeszłości kosztowne pomyłki',
      ],
    },
    { h: 3, text: 'To nie tylko kwestia wielkości firmy' },
    {
      p: 'Nawet małe firmy korzystają na profesjonalnym wsparciu księgowym. Nie chodzi o to, jak duża jest Twoja firma — chodzi o to, ile czasu i pewności chcesz odzyskać.',
    },
    { h: 2, text: 'Czego oczekiwać od dobrego dopasowania' },
    { p: 'Dobra księgowa staje się długoterminowym partnerem — kimś, kto zna Twoją firmę na tyle dobrze, by dawać praktyczne, terminowe rady, a nie tylko raz w roku rozliczać podatki.' },
  ],
  'kwartalne-zaliczki-na-podatek-dla-malych-firm': [
    { h: 2, text: 'Do czego służą zaliczki kwartalne' },
    {
      p: 'Kwartalne zaliczki na podatek pozwalają płacić szacowany podatek w ciągu roku zamiast jednej dużej kwoty na koniec. Dzięki temu unikasz kar i utrzymujesz bardziej przewidywalne przepływy pieniężne.',
    },
    { h: 3, text: 'Jak liczone są zaliczki' },
    {
      ol: [
        'Oszacuj przewidywany dochód roczny',
        'Oblicz podatek należny od tego szacunku',
        'Podziel całość na cztery płatności',
        'Koryguj każdy kwartał, jeśli dochód się zmienia',
      ],
    },
    { hr: true },
    { h: 2, text: 'Co się dzieje, gdy przegapisz termin' },
    { p: 'Przeoczenie zaliczki kwartalnej zwykle skutkuje odsetkami od niezapłaconej kwoty. Jak najszybsze uregulowanie zaległości ogranicza dodatkowy koszt.' },
  ],
  'najczestsze-bledy-w-rozliczeniach-vat-i-jak-ich-unikac': [
    { h: 2, text: 'Skąd zwykle biorą się błędy VAT' },
    {
      p: 'Błędy VAT rzadko są celowe — zwykle sprowadzają się do zastosowania złej stawki, przeoczenia terminu złożenia deklaracji albo nieporozumienia co do tego, co można odliczyć.',
    },
    {
      ul: [
        'Zastosowanie błędnej stawki VAT do produktu lub usługi',
        'Odliczenie VAT od niekwalifikujących się wydatków',
        'Spóźnione lub niekompletne deklaracje VAT',
        'Błędne dane na fakturach',
      ],
    },
    { h: 2, text: 'Budowanie niezawodnego procesu' },
    { p: 'Comiesięczny przegląd zapisów VAT, a nie tylko w momencie składania deklaracji, znacznie ułatwia wychwycenie błędów, zanim staną się większym problemem.' },
  ],
  'checklista-podatkowa-na-koniec-roku-dla-przedsiebiorcow': [
    { h: 2, text: 'Zamknij rok z pewnością siebie' },
    { p: 'Odrobina przygotowania przed końcem roku może zaoszczędzić sporo czasu i stresu, gdy nadejdzie okres rozliczeń podatkowych. Skorzystaj z tej checklisty jako punktu wyjścia.' },
    {
      checklist: [
        { text: 'Uzgodnij wyciągi bankowe i z kart kredytowych', checked: true },
        { text: 'Przejrzyj zaległe faktury i wydatki', checked: true },
        { text: 'Potwierdź aktualność dokumentacji pracowników i zleceniobiorców' },
        { text: 'Oszacuj zobowiązanie podatkowe za rok' },
        { text: 'Uporządkuj paragony i dokumenty potwierdzające' },
        { text: 'Umów przegląd końcoworoczny z księgową' },
      ],
    },
    { h: 3, text: 'Dlaczego warto zacząć wcześnie' },
    { p: 'Rozpoczęcie tego procesu w czwartym kwartale — zamiast w styczniu — daje czas na wprowadzenie korekt, gdy nadal mogą coś zmienić.' },
  ],
  'jak-poprawnie-klasyfikowac-pracownikow-i-zleceniobiorcow': [
    { h: 2, text: 'Dlaczego klasyfikacja ma znaczenie' },
    {
      p: 'Błędna klasyfikacja pracownika wpływa na pobór podatku, uprawnienia do świadczeń i odpowiedzialność prawną. Pomyłka — nawet niezamierzona — może prowadzić do poważnych kar.',
    },
    { h: 3, text: 'Kluczowe różnice, na które warto zwrócić uwagę' },
    {
      ul: [
        'Ile kontroli masz nad tym, jak wykonywana jest praca',
        'Czy dana osoba pracuje wyłącznie dla Twojej firmy',
        'Kto zapewnia narzędzia i sprzęt',
        'Czy relacja jest stała, czy projektowa',
      ],
    },
    {
      quote: 'W razie wątpliwości najbezpieczniej jest szczegółowo przeanalizować charakter relacji — nie tylko nazwę stanowiska.',
    },
    { h: 2, text: 'Kiedy poprosić o pomoc' },
    { p: 'Jeśli nie masz pewności, jak zaklasyfikować dane stanowisko, warto skorzystać z krótkiej konsultacji przed zatrudnieniem — poprawianie błędnej klasyfikacji później jest znacznie bardziej kłopotliwe.' },
  ],
  'przewodnik-po-benefitach-pracowniczych-i-potraceniach': [
    { h: 2, text: 'Potrącenia obowiązkowe a dobrowolne' },
    {
      p: 'Każdy pasek wynagrodzenia zawiera mieszankę potrąceń wymaganych przez prawo i świadczeń, które firma oferuje dobrowolnie. Zrozumienie różnicy pomaga jasno komunikować wynagrodzenie pracownikom.',
    },
    {
      ul: ['Zaliczka na podatek dochodowy', 'Składki na ubezpieczenia społeczne', 'Składki na ubezpieczenie zdrowotne', 'Wpłaty na plan emerytalny'],
    },
    { h: 4, text: 'O dobrowolnych świadczeniach' },
    { p: 'Dobrowolne świadczenia, jak dodatkowe ubezpieczenie czy programy wellness, mogą być silnym narzędziem rekrutacyjnym — ale muszą być dokładnie śledzone w rozliczeniach płacowych, by uniknąć błędów.' },
    { h: 2, text: 'Zachowanie przejrzystości' },
    { p: 'Jasne, spójne paski wynagrodzeń zmniejszają liczbę pytań ze strony pracowników i budują zaufanie — drobne szczegóły, jak czytelne oznaczenie potrąceń, robią realną różnicę.' },
  ],
  'co-zrobic-gdy-cos-pojdzie-nie-tak-z-lista-plac': [
    { h: 2, text: 'Pierwsze kroki po wystąpieniu błędu' },
    {
      ol: [
        'Ustal dokładnie, co poszło nie tak i których pracowników to dotyczy',
        'Oblicz właściwą kwotę należną lub nadpłaconą',
        'Niezwłocznie poinformuj zainteresowanych pracowników',
        'Popraw płatność tak szybko, jak to możliwe',
        'Zaktualizuj odpowiednio dokumentację i deklaracje',
      ],
    },
    { hr: true },
    { h: 2, text: 'Jak zapobiec powtórce' },
    {
      p: 'Większość błędów płacowych wynika z ręcznego wprowadzania danych lub zmian w ostatniej chwili. Stały etap weryfikacji przed każdym rozliczeniem wychwytuje większość problemów, zanim dotrą do pracowników.',
    },
  ],
  '5-sygnalow-ze-twoja-ksiegowosc-wymaga-sprawdzenia': [
    { h: 2, text: 'Sygnały ostrzegawcze, na które warto zwrócić uwagę' },
    { p: 'Problemy z księgowością rzadko dają o sobie znać wprost — pojawiają się jako drobne niezgodności, które narastają z czasem.' },
    {
      checklist: [
        { text: 'Wyciągi bankowe przestały się zgadzać z Twoimi zapisami' },
        { text: 'Faktury są często wysyłane z opóźnieniem albo zapominane' },
        { text: 'Nie masz pewności co do bieżącej sytuacji gotówkowej' },
        { text: 'Wydatki są kategoryzowane niekonsekwentnie' },
        { text: 'Przygotowanie raportów zajmuje dłużej, niż powinno' },
      ],
    },
    { h: 3, text: 'Na czym polega przegląd' },
    { p: 'Przegląd księgowości sprawdza, czy transakcje są zapisywane poprawnie, konta są uzgodnione, a raporty odzwierciedlają to, co faktycznie dzieje się w firmie.' },
  ],
  'jak-przygotowac-firme-do-udanego-audytu': [
    { h: 2, text: 'Gotowość do audytu przez cały rok' },
    {
      p: 'Firmy, które sprawnie przechodzą audyty, to te, które traktują prowadzenie dokumentacji jako stały nawyk, a nie gorączkowe działanie w ostatniej chwili.',
    },
    { h: 3, text: 'Co warto mieć uporządkowane' },
    {
      ul: ['Faktury i paragony', 'Wyciągi bankowe i z kart kredytowych', 'Dokumentację płacową', 'Deklaracje podatkowe i korespondencję'],
    },
    {
      quote: 'Audyt jest znacznie mniej stresujący, gdy Twoja dokumentacja już opowiada jasną, spójną historię.',
    },
    { h: 2, text: 'W trakcie audytu' },
    { p: 'Odpowiadaj na żądania szybko i jasno. Zaangażowanie profesjonalnej księgowej od samego początku utrzymuje dokładną komunikację i ogranicza wymianę wiadomości tam i z powrotem.' },
  ],
  'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow': [
    { h: 2, text: 'Zysk to nie to samo co gotówka' },
    {
      p: 'Można być rentownym na papierze i jednocześnie mieć problemy z gotówką. Zrozumienie tej różnicy to jedna z najważniejszych umiejętności finansowych przedsiębiorcy.',
    },
    { h: 3, text: 'Co wpływa na przepływy pieniężne' },
    {
      ol: ['Jak szybko klienci płacą faktury', 'Jak zarządzasz zapasami lub kosztami z góry', 'Terminy spłat kredytów i dużych wydatków', 'Sezonowe zmiany przychodów'],
    },
    { hr: true },
    { h: 2, text: 'Budowanie nawyku śledzenia przepływów pieniężnych' },
    { p: 'Cotygodniowy, a nie tylko comiesięczny przegląd sytuacji gotówkowej znacznie ułatwia wczesne wychwycenie problemów i pewne planowanie z wyprzedzeniem.' },
  ],
}

const postFaqs: Record<string, { question: string; answer: string }[]> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca': [
    {
      question: 'Jaki jest najczęstszy błąd podatkowy popełniany przez małe firmy?',
      answer:
        'Mieszanie wydatków prywatnych i firmowych to najczęstszy błąd — utrudnia księgowość i może skomplikować to, co faktycznie da się odliczyć.',
    },
    {
      question: 'Jak często powinienem/powinnam przeglądać księgi, żeby uniknąć błędów podatkowych?',
      answer:
        'Dla większości małych firm dobrym punktem odniesienia jest przegląd raz w miesiącu. Czekanie do końca roku znacznie utrudnia wychwycenie i naprawienie błędów, zanim staną się kosztowne.',
    },
    {
      question: 'Czy błąd podatkowy może wywołać kontrolę?',
      answer:
        'Powtarzające się lub duże niezgodności mogą zwiększyć zainteresowanie urzędu skarbowego, ale pojedyncza, uczciwa pomyłka, szybko skorygowana, rzadko sama w sobie stanowi poważny problem.',
    },
  ],
}

async function seed() {
  const payload = await getPayload({ config })

  for (const [slug, blocks] of Object.entries(postContent)) {
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = docs[0]

    if (!post) {
      console.log(`↷ Post "${slug}" nie istnieje — pomijam`)
      continue
    }

    if (post.content) {
      console.log(`↷ Post "${slug}" ma już treść — pomijam`)
    } else {
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: { content: buildContent(blocks) },
      })
      console.log(`✓ Dodano treść do posta "${slug}"`)
    }

    const faqs = postFaqs[slug]
    if (faqs) {
      if (post.faqs && post.faqs.length > 0) {
        console.log(`↷ Post "${slug}" ma już FAQ — pomijam`)
      } else {
        await payload.update({
          collection: 'posts',
          id: post.id,
          data: { faqs },
        })
        console.log(`✓ Dodano FAQ do posta "${slug}"`)
      }
    }
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
