import { getPayload } from 'payload'
import config from '../payload.config'
import { buildContent, type LexicalBlock } from './lexicalBuilder'

const homeBlockUpdates: Record<string, Record<string, unknown>> = {
  hero: {
    tagline: 'Zaufana księgowość dla przedsiębiorców',
    heading: 'Księgowość, która stawia Twoją firmę na pierwszym miejscu',
    description:
      'Od księgowości i kadr po rozliczenia podatkowe i doradztwo biznesowe — każda usługa jest prowadzona osobiście przez jedną doświadczoną księgową, która bierze pełną odpowiedzialność za Twoją firmę, a nie tylko za dokumenty.',
    trustText: 'Zaufało nam ponad 200 firm, które korzystają z rzetelnej księgowości i osobistego wsparcia finansowego.',
    trustHighlight: 'ponad 200 firm',
    primaryButton: { label: 'Umów bezpłatną rozmowę', type: 'custom', url: '#kontakt' },
    secondaryButton: { label: 'Zobacz usługi', type: 'custom', url: '#uslugi' },
    floatingBadges: [
      { label: 'Oddany partner finansowy' },
      { label: 'Zaufany partner księgowy' },
      { label: 'Księgowość prowadzona osobiście' },
    ],
  },
  painPoints: {
    tagline: 'Problemy klientów',
    heading: 'Księgowość ma zmniejszać stres, a nie go dodawać.',
    description:
      'Wielu przedsiębiorców trafia do nas sfrustrowanych powolną komunikacją, niejasnymi dokumentami albo niewiedzą, kto tak naprawdę zajmuje się ich firmą. Jeśli którakolwiek z tych sytuacji brzmi znajomo, nie jesteś sam.',
    painPoints: [
      {
        icon: '/icons/phone-off.svg',
        title: 'Nigdy nie mogę się dodzwonić do księgowej',
        description: 'Każde pytanie zamienia się w nowy wątek mailowy albo kolejną osobę, której muszę wszystko wyjaśniać od nowa.',
      },
      {
        icon: '/icons/alert.svg',
        title: 'Boję się kosztownych pomyłek',
        description: 'Jeden brakujący dokument albo źle zrozumiany przepis może stać się drogim problemem.',
      },
      {
        icon: '/icons/file-stack.svg',
        title: 'Wszystko wydaje się skomplikowane',
        description: 'Terminy podatkowe, dokumenty, przepisy — trudno wiedzieć, co naprawdę jest ważne.',
      },
      {
        icon: '/icons/refresh.svg',
        title: 'Zmiana księgowej wydaje się zbyt dużym wysiłkiem',
        description: 'Zmiana biura rachunkowego wydaje się ryzykowna i czasochłonna, więc wiele firm zostaje w miejscu.',
      },
    ],
    closingText: 'Zasługujesz na księgowość, która jest prosta, osobista i godna zaufania.',
    button: { label: 'Zobacz moje usługi', type: 'custom', url: '#uslugi' },
  },
  services: {
    tagline: 'Usługi',
    heading: 'Wszystko, czego potrzebuje Twoja firma, załatwione osobiście.',
    description:
      'Od codziennej księgowości po rejestrację firmy — każda usługa jest realizowana bezpośrednio przez osobę odpowiedzialną za Twoje konto.',
    services: [
      {
        number: '01',
        title: 'Księgowość',
        description: 'Utrzymuj dokładne, zgodne z przepisami zapisy finansowe, zawsze gotowe na kolejną decyzję.',
        areas: [
          { value: 'Ewidencja przychodów i rozchodów' },
          { value: 'Ryczałt ewidencjonowany' },
          { value: 'Pełna księgowość' },
          { value: 'Rozliczenia podatkowe' },
        ],
        button: { label: 'Dowiedz się więcej', type: 'custom', url: '#kontakt' },
      },
      {
        number: '02',
        title: 'Kadry i płace',
        description: 'Rzetelna obsługa kadrowo-płacowa, dzięki której Twoi pracownicy otrzymują wynagrodzenie poprawnie i na czas.',
        areas: [
          { value: 'Naliczanie wynagrodzeń' },
          { value: 'Dokumentacja pracownicza' },
          { value: 'Rozliczenia ZUS' },
          { value: 'Raportowanie pracownicze' },
        ],
        button: { label: 'Dowiedz się więcej', type: 'custom', url: '#kontakt' },
      },
      {
        number: '03',
        title: 'Doradztwo biznesowe i zakładanie firm',
        description:
          'Zakładanie lub zmiana formy działalności nie musi być przytłaczające. Zyskaj praktyczne wsparcie — od rejestracji po wybór odpowiedniej formy opodatkowania.',
        areas: [
          { value: 'Rejestracja firmy' },
          { value: 'Wybór formy opodatkowania' },
          { value: 'Konsultacje biznesowe' },
          { value: 'Wsparcie administracyjne' },
        ],
        button: { label: 'Dowiedz się więcej', type: 'custom', url: '#kontakt' },
      },
    ],
  },
  experienceAndTrust: {
    tagline: 'Doświadczenie i zaufanie',
    heading: 'Buduję długoterminowe relacje biznesowe oparte na zaufaniu.',
    bio: 'Sawicka Grzyb to certyfikowana księgowa, która pomaga przedsiębiorcom zarządzać finansami z pewnością siebie. Pracując bezpośrednio z każdym klientem, zapewnia rzetelną księgowość, jasną komunikację i osobiste wsparcie dopasowane do każdej firmy.',
    facts: [
      { label: 'Kariera', type: 'tags', tags: [{ value: '10+ lat doświadczenia' }] },
      {
        label: 'Doświadczenie zawodowe',
        type: 'tags',
        tags: [
          { value: 'Księgowość' },
          { value: 'Kadry i płace' },
          { value: 'Rozliczenia podatkowe' },
          { value: 'Doradztwo biznesowe' },
        ],
      },
      { label: 'Certyfikaty i uprawnienia', type: 'images' },
      { label: 'Ubezpieczenie odpowiedzialności zawodowej', type: 'tags', tags: [{ value: 'W pełni ubezpieczony specjalista' }] },
    ],
    quote:
      'Moim celem nie jest tylko prowadzenie Twojej księgowości. To zostanie księgową, o którą nigdy nie musisz się martwić.',
  },
  onboardingProcess: {
    tagline: 'Proces wdrożenia',
    heading: 'Płynne przejście od pierwszego dnia.',
    description:
      'Zmiana księgowej nie musi być stresująca. Zajmę się przejściem, dzięki czemu Ty możesz skupić się na prowadzeniu firmy.',
    steps: [
      { step: 'Krok 1', title: 'Umów bezpłatną konsultację', description: 'Porozmawiajmy o Twojej firmie, obecnej sytuacji i Twoich potrzebach.' },
      {
        step: 'Krok 2',
        title: 'Zajmę się przeniesieniem dokumentów',
        description: 'Skoordynuję przekazanie dokumentów i formalności z poprzednią księgową, gdy tylko to możliwe.',
      },
      {
        step: 'Krok 3',
        title: 'Proste wdrożenie',
        description: 'Uporządkujemy Twoje dokumenty, systemy i komunikację, żeby wszystko działało sprawnie.',
      },
      { step: 'Krok 4', title: 'Stałe wsparcie', description: 'Zachowaj zgodność z przepisami dzięki bezpośredniemu wsparciu i jasnym terminom.' },
    ],
  },
  personalRelationship: {
    tagline: 'Osobista relacja',
    heading: 'Jedna księgowa. Jedna relacja. Pełna odpowiedzialność.',
    description:
      'Duże biura często dzielą obowiązki między działy. Tutaj zawsze będziesz wiedzieć dokładnie, kto zajmuje się Twoją firmą.',
    features: [
      { icon: '/icons/user.svg', title: 'Znam Twoją firmę osobiście', description: 'Nie musisz powtarzać swojej historii różnym osobom.' },
      { icon: '/icons/messages.svg', title: 'Bezpośrednia komunikacja', description: 'Pytania trafiają wprost do osoby odpowiedzialnej.' },
      {
        icon: '/icons/zap.svg',
        title: 'Decyzje bez opóźnień',
        description: 'Żadnego „muszę zapytać koleżankę". Tylko konkretne odpowiedzi, kiedy ich potrzebujesz.',
      },
      { icon: '/icons/shield.svg', title: 'Osobista odpowiedzialność', description: 'Twoja firma zasługuje na zaangażowanie, a nie przekazywanie z rąk do rąk.' },
    ],
  },
  testimonials: {
    tagline: 'Opinie',
    heading: 'Doświadczenia klientów, które mówią same za siebie.',
    description:
      'Te opinie pochodzą od prawdziwych przedsiębiorców, którzy polegają na jasnym wsparciu księgowym i szybkiej obsłudze.',
  },
  trustStatementAndStatistics: {
    tagline: 'Zaufanie w liczbach',
    heading: 'Wspieram firmy poprzez rzetelną księgowość, przejrzystą komunikację i długoterminowe bezpieczeństwo finansowe.',
    stats: [
      { value: '8', suffix: '+', label: 'Lat doświadczenia' },
      { value: '100', suffix: '+', label: 'Obsłużonych firm' },
      { value: '99', suffix: '%', label: 'Rozliczeń podatkowych na czas' },
      { value: '100', suffix: '%', label: 'Zero kar dla klientów' },
    ],
  },
  blog: {
    tagline: 'Wskazówki dla przedsiębiorców',
    heading: 'Praktyczne porady księgowe, które naprawdę się przydają.',
    description:
      'Bądź na bieżąco dzięki jasnym wyjaśnieniom dotyczącym podatków, księgowości, przepisów i decyzji finansowych, napisanym z myślą o właścicielach firm, a nie księgowych.',
  },
  cta: {
    eyebrow: 'Gotowi do współpracy?',
    heading: 'Uprośćmy Twoją księgowość.',
    description:
      'Niezależnie od tego, czy zakładasz nową firmę, czy szukasz bardziej osobistej obsługi księgowej, chętnie pomogę. Umów się na bezpłatną rozmowę wstępną i porozmawiajmy o Twojej firmie.',
    button: { label: 'Umów bezpłatną rozmowę', type: 'custom', url: '#kontakt' },
  },
  faq: {
    tagline: 'FAQ',
    heading: 'Najczęstsze pytania, zanim zaczniemy współpracę.',
    description: 'Dowiedz się, jak wygląda proces, czego się spodziewać i jak mogę wesprzeć Twoją firmę od pierwszego dnia.',
    button: { label: 'Umów bezpłatną rozmowę', type: 'custom', url: '#kontakt' },
    faqs: [
      {
        question: 'Ile kosztują usługi księgowe?',
        answer:
          'Każda firma jest inna, więc cena zależy od potrzebnych usług, wielkości firmy i złożoności księgowości. Po bezpłatnej konsultacji otrzymasz jasną, przejrzystą wycenę bez ukrytych opłat.',
      },
      {
        question: 'Czy pomożecie mi zmienić obecną księgową?',
        answer:
          'Tak. Zajmę się procesem przekazania i skoordynuję go z poprzednią księgową, gdy tylko to możliwe, dzięki czemu przejście będzie proste i bezstresowe.',
      },
      {
        question: 'Czy musimy się spotkać osobiście?',
        answer:
          'Wcale nie. Pracuję z klientami zarówno zdalnie, jak i osobiście, w zależności od preferencji. Większość bieżącej komunikacji można sprawnie prowadzić telefonicznie lub mailowo.',
      },
    ],
  },
}

function deepMerge<T>(target: T, patch: Record<string, unknown>): T {
  const result: Record<string, unknown> = { ...(target as Record<string, unknown>) }
  for (const [key, value] of Object.entries(patch)) {
    if (Array.isArray(value)) {
      result[key] = value
    } else if (value && typeof value === 'object') {
      result[key] = deepMerge((result[key] as Record<string, unknown>) ?? {}, value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }
  return result as T
}

const testimonialUpdates: Record<string, { quote: string; company: string }> = {
  'Anna Kowalska': {
    quote:
      'Sawicka Grzyb pomogła nam zrozumieć nasze przepływy pieniężne i sprawiła, że okres rozliczeń podatkowych stał się dużo mniej stresujący. Czas reakcji jest znakomity.',
    company: 'Właścicielka, Nowak Construction',
  },
  'Paweł Nowak': {
    quote: 'Przejrzystość, terminowość i miła obsługa naprawdę zrobiły różnicę. Zawsze wiem, że moje księgi są w dobrych rękach.',
    company: 'Prezes, Pure Systems',
  },
  'Magda Zielińska': {
    quote: 'Wszystko wytłumaczyli w sposób łatwy do zrozumienia i zaoszczędzili nam czasu na cotygodniowej księgowości.',
    company: 'Założycielka, Zielińska Studio',
  },
}

const categoryUpdates: Record<string, string> = {
  'Tax Guide': 'Poradnik podatkowy',
  Payroll: 'Kadry i płace',
  'Business Tips': 'Porady biznesowe',
}

const postUpdates: Record<string, { title: string; excerpt: string; readTime: string }> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca': {
    title: '5 błędów podatkowych, których powinien unikać każdy przedsiębiorca',
    excerpt: 'Bądź na bieżąco dzięki praktycznym artykułom o księgowości, podatkach, kadrach i płacach...',
    readTime: '5 min czytania',
  },
  'co-kazdy-pracodawca-powinien-wiedziec-o-kadrach-i-placach': {
    title: 'Co każdy pracodawca powinien wiedzieć o kadrach i płacach',
    excerpt: 'Poznaj podstawy naliczania wynagrodzeń, obowiązki pracodawcy i...',
    readTime: '4 min czytania',
  },
  'kiedy-jest-odpowiedni-moment-na-zatrudnienie-ksiegowej': {
    title: 'Kiedy jest odpowiedni moment na zatrudnienie księgowej?',
    excerpt: 'Poznaj oznaki, że Twoja firma jest gotowa na profesjonalne wsparcie księgowe...',
    readTime: '6 min czytania',
  },
  'kwartalne-zaliczki-na-podatek-dla-malych-firm': {
    title: 'Kwartalne zaliczki na podatek — co powinien wiedzieć każdy mały przedsiębiorca',
    excerpt: 'Dowiedz się, kiedy mijają terminy płatności kwartalnych, jak są liczone i jak uniknąć kar...',
    readTime: '5 min czytania',
  },
  'najczestsze-bledy-w-rozliczeniach-vat-i-jak-ich-unikac': {
    title: 'Najczęstsze błędy w rozliczeniach VAT i jak ich unikać',
    excerpt: 'Od błędnych stawek po przeoczone terminy — oto błędy VAT, które kosztują firmy najwięcej...',
    readTime: '4 min czytania',
  },
  'checklista-podatkowa-na-koniec-roku-dla-przedsiebiorcow': {
    title: 'Checklista podatkowa na koniec roku dla przedsiębiorców',
    excerpt: 'Praktyczna checklista, by zamknąć rok z uporządkowanymi księgami i bez niespodzianek w ostatniej chwili...',
    readTime: '6 min czytania',
  },
  'jak-poprawnie-klasyfikowac-pracownikow-i-zleceniobiorcow': {
    title: 'Jak poprawnie klasyfikować pracowników i zleceniobiorców',
    excerpt: 'Błędna klasyfikacja może prowadzić do poważnych kar — oto jak rozpoznać różnicę...',
    readTime: '5 min czytania',
  },
  'przewodnik-po-benefitach-pracowniczych-i-potraceniach': {
    title: 'Prosty przewodnik po benefitach pracowniczych i potrąceniach z wynagrodzenia',
    excerpt: 'Co każdy pracodawca powinien wiedzieć o obowiązkowych i dobrowolnych potrąceniach z wynagrodzenia...',
    readTime: '4 min czytania',
  },
  'co-zrobic-gdy-cos-pojdzie-nie-tak-z-lista-plac': {
    title: 'Co zrobić, gdy coś pójdzie nie tak z listą płac',
    excerpt: 'Pominięta lub błędna płatność się zdarza — oto jak szybko to naprawić i zachować zgodność z przepisami...',
    readTime: '5 min czytania',
  },
  '5-sygnalow-ze-twoja-ksiegowosc-wymaga-sprawdzenia': {
    title: '5 sygnałów, że Twoja księgowość wymaga ponownego sprawdzenia',
    excerpt: 'Od niezgodnych wyciągów bankowych po spóźnione faktury — te sygnały oznaczają, że czas na przegląd...',
    readTime: '4 min czytania',
  },
  'jak-przygotowac-firme-do-udanego-audytu': {
    title: 'Jak przygotować firmę do udanego audytu',
    excerpt: 'Audyty nie muszą być stresujące — oto jak utrzymać dokumentację gotową do audytu przez cały rok...',
    readTime: '6 min czytania',
  },
  'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow': {
    title: 'Podstawy przepływów pieniężnych, które powinien znać każdy przedsiębiorca',
    excerpt: 'Zysk na papierze, a brak gotówki? Oto jak zrozumieć i zarządzać przepływami pieniężnymi w firmie...',
    readTime: '5 min czytania',
  },
}

const postContent: Record<string, LexicalBlock[]> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca': [
    { h: 2, text: 'Dlaczego dochodzi do tych błędów' },
    { p: 'Większość błędów podatkowych nie wynika z niedbalstwa — pojawiają się, bo przedsiębiorcy żonglują zbyt wieloma obowiązkami naraz. Rozpoznanie najczęstszych z nich to pierwszy krok, by ich uniknąć.' },
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
    { p: 'Transakcje gotówkowe najłatwiej zaniżyć — i najłatwiej wychwycić urzędowi skarbowemu podczas kontroli. Zapisywanie każdej płatności gotówkowej na bieżąco, zamiast z pamięci później, eliminuje domysły.' },
    { hr: true },
    { h: 2, text: 'Koszt pomyłki' },
    { p: 'Kary za spóźnione lub błędne rozliczenia szybko się kumulują, a powtarzające się błędy mogą sprowadzić na firmę dokładniejszą kontrolę urzędu skarbowego. Poza kosztem finansowym, pomyłki zabierają czas i energię, które powinny trafić do prowadzenia firmy.' },
    { quote: 'Firmy, które mają największe problemy z podatkami, to nie te o skomplikowanych finansach — to te bez systemu.' },
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
    { p: 'Kadry i płace to coś więcej niż terminowe wypłacanie wynagrodzeń. Obejmują pobór zaliczek podatkowych, składki na ubezpieczenia społeczne i dokładną dokumentację — wszystko to wiąże się z obowiązkami prawnymi.' },
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
    { p: 'Pracodawcy odpowiadają za prowadzenie dokładnej dokumentacji zatrudnienia, dotrzymywanie terminów raportowania i śledzenie zmian w przepisach dotyczących wynagrodzeń — nawet drobne błędy mogą skutkować karami.' },
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
    { p: 'Nawet małe firmy korzystają na profesjonalnym wsparciu księgowym. Nie chodzi o to, jak duża jest Twoja firma — chodzi o to, ile czasu i pewności chcesz odzyskać.' },
    { h: 2, text: 'Czego oczekiwać od dobrego dopasowania' },
    { p: 'Dobra księgowa staje się długoterminowym partnerem — kimś, kto zna Twoją firmę na tyle dobrze, by dawać praktyczne, terminowe rady, a nie tylko raz w roku rozliczać podatki.' },
  ],
  'kwartalne-zaliczki-na-podatek-dla-malych-firm': [
    { h: 2, text: 'Do czego służą zaliczki kwartalne' },
    { p: 'Kwartalne zaliczki na podatek pozwalają płacić szacowany podatek w ciągu roku zamiast jednej dużej kwoty na koniec. Dzięki temu unikasz kar i utrzymujesz bardziej przewidywalne przepływy pieniężne.' },
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
    { p: 'Błędy VAT rzadko są celowe — zwykle sprowadzają się do zastosowania złej stawki, przeoczenia terminu złożenia deklaracji albo nieporozumienia co do tego, co można odliczyć.' },
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
    { p: 'Błędna klasyfikacja pracownika wpływa na pobór podatku, uprawnienia do świadczeń i odpowiedzialność prawną. Pomyłka — nawet niezamierzona — może prowadzić do poważnych kar.' },
    { h: 3, text: 'Kluczowe różnice, na które warto zwrócić uwagę' },
    {
      ul: [
        'Ile kontroli masz nad tym, jak wykonywana jest praca',
        'Czy dana osoba pracuje wyłącznie dla Twojej firmy',
        'Kto zapewnia narzędzia i sprzęt',
        'Czy relacja jest stała, czy projektowa',
      ],
    },
    { quote: 'W razie wątpliwości najbezpieczniej jest szczegółowo przeanalizować charakter relacji — nie tylko nazwę stanowiska.' },
    { h: 2, text: 'Kiedy poprosić o pomoc' },
    { p: 'Jeśli nie masz pewności, jak zaklasyfikować dane stanowisko, warto skorzystać z krótkiej konsultacji przed zatrudnieniem — poprawianie błędnej klasyfikacji później jest znacznie bardziej kłopotliwe.' },
  ],
  'przewodnik-po-benefitach-pracowniczych-i-potraceniach': [
    { h: 2, text: 'Potrącenia obowiązkowe a dobrowolne' },
    { p: 'Każdy pasek wynagrodzenia zawiera mieszankę potrąceń wymaganych przez prawo i świadczeń, które firma oferuje dobrowolnie. Zrozumienie różnicy pomaga jasno komunikować wynagrodzenie pracownikom.' },
    { ul: ['Zaliczka na podatek dochodowy', 'Składki na ubezpieczenia społeczne', 'Składki na ubezpieczenie zdrowotne', 'Wpłaty na plan emerytalny'] },
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
    { p: 'Większość błędów płacowych wynika z ręcznego wprowadzania danych lub zmian w ostatniej chwili. Stały etap weryfikacji przed każdym rozliczeniem wychwytuje większość problemów, zanim dotrą do pracowników.' },
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
    { p: 'Firmy, które sprawnie przechodzą audyty, to te, które traktują prowadzenie dokumentacji jako stały nawyk, a nie gorączkowe działanie w ostatniej chwili.' },
    { h: 3, text: 'Co warto mieć uporządkowane' },
    { ul: ['Faktury i paragony', 'Wyciągi bankowe i z kart kredytowych', 'Dokumentację płacową', 'Deklaracje podatkowe i korespondencję'] },
    { quote: 'Audyt jest znacznie mniej stresujący, gdy Twoja dokumentacja już opowiada jasną, spójną historię.' },
    { h: 2, text: 'W trakcie audytu' },
    { p: 'Odpowiadaj na żądania szybko i jasno. Zaangażowanie profesjonalnej księgowej od samego początku utrzymuje dokładną komunikację i ogranicza wymianę wiadomości tam i z powrotem.' },
  ],
  'podstawy-przeplywow-pienieznych-dla-przedsiebiorcow': [
    { h: 2, text: 'Zysk to nie to samo co gotówka' },
    { p: 'Można być rentownym na papierze i jednocześnie mieć problemy z gotówką. Zrozumienie tej różnicy to jedna z najważniejszych umiejętności finansowych przedsiębiorcy.' },
    { h: 3, text: 'Co wpływa na przepływy pieniężne' },
    { ol: ['Jak szybko klienci płacą faktury', 'Jak zarządzasz zapasami lub kosztami z góry', 'Terminy spłat kredytów i dużych wydatków', 'Sezonowe zmiany przychodów'] },
    { hr: true },
    { h: 2, text: 'Budowanie nawyku śledzenia przepływów pieniężnych' },
    { p: 'Cotygodniowy, a nie tylko comiesięczny przegląd sytuacji gotówkowej znacznie ułatwia wczesne wychwycenie problemów i pewne planowanie z wyprzedzeniem.' },
  ],
}

const postFaqUpdates: Record<string, { question: string; answer: string }[]> = {
  '5-bledow-podatkowych-ktorych-powinien-unikac-kazdy-przedsiebiorca': [
    {
      question: 'Jaki jest najczęstszy błąd podatkowy popełniany przez małe firmy?',
      answer: 'Mieszanie wydatków prywatnych i firmowych to najczęstszy błąd — utrudnia księgowość i może skomplikować to, co faktycznie da się odliczyć.',
    },
    {
      question: 'Jak często powinienem/powinnam przeglądać księgi, żeby uniknąć błędów podatkowych?',
      answer: 'Dla większości małych firm dobrym punktem odniesienia jest przegląd raz w miesiącu. Czekanie do końca roku znacznie utrudnia wychwycenie i naprawienie błędów, zanim staną się kosztowne.',
    },
    {
      question: 'Czy błąd podatkowy może wywołać kontrolę?',
      answer: 'Powtarzające się lub duże niezgodności mogą zwiększyć zainteresowanie urzędu skarbowego, ale pojedyncza, uczciwa pomyłka, szybko skorygowana, rzadko sama w sobie stanowi poważny problem.',
    },
  ],
}

const privacyPolicyContent: LexicalBlock[] = [
  { h: 2, text: 'Wprowadzenie' },
  { p: 'Sawicka Grzyb („my", „nas", „nasze") szanuje Twoją prywatność i dba o ochronę danych osobowych, które nam powierzasz. Niniejsza Polityka Prywatności wyjaśnia, jakie informacje zbieramy, dlaczego je zbieramy, jak je wykorzystujemy oraz jakie prawa przysługują Ci w związku z Twoimi danymi.' },
  { p: 'Korzystając z naszej strony internetowej lub usług księgowych, zgadzasz się na zbieranie i wykorzystywanie informacji zgodnie z niniejszą polityką.' },
  { h: 2, text: 'Administrator danych' },
  { p: 'Administratorem danych osobowych jest Sawicka Grzyb. Jeśli masz pytania dotyczące niniejszej polityki lub sposobu przetwarzania Twoich danych, możesz się z nami skontaktować, korzystając z danych kontaktowych podanych w stopce tej strony.' },
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
  { p: 'Przetwarzamy Twoje dane osobowe wyłącznie wtedy, gdy mamy do tego ważną podstawę prawną zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO):' },
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
  { p: 'Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych. Udostępniamy informacje osobom trzecim tylko wtedy, gdy jest to konieczne, i zawsze z zastosowaniem odpowiednich zabezpieczeń:' },
  {
    ul: [
      'Organy podatkowe i instytucje publiczne, gdy wymaga tego prawo',
      'Dostawcy usług IT i hostingu wspierający nasze systemy',
      'Doradcy zawodowi (np. obsługa prawna), gdy jest to konieczne',
    ],
  },
  { hr: true },
  { h: 2, text: 'Przechowywanie danych' },
  { p: 'Przechowujemy dane osobowe wyłącznie tak długo, jak jest to konieczne do realizacji celów opisanych w niniejszej polityce lub jak wymaga tego obowiązujące prawo.' },
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
  { quote: 'Aby skorzystać z któregokolwiek z tych praw, po prostu skontaktuj się z nami, korzystając z danych podanych w stopce — odpowiemy w terminach wymaganych przez prawo.' },
  { hr: true },
  { h: 2, text: 'Pliki cookies' },
  { p: 'Nasza strona wykorzystuje pliki cookies i podobne technologie, aby poprawić komfort przeglądania i zrozumieć, jak strona jest używana.' },
  { h: 3, text: 'Rodzaje wykorzystywanych plików cookies' },
  {
    ul: [
      'Niezbędne pliki cookies, wymagane do prawidłowego działania strony',
      'Analityczne pliki cookies, które pomagają nam zrozumieć, jak odwiedzający korzystają ze strony',
    ],
  },
  { p: 'W każdej chwili możesz kontrolować lub wyłączyć pliki cookies w ustawieniach przeglądarki, choć może to wpłynąć na niektóre funkcje strony.' },
  { h: 2, text: 'Bezpieczeństwo danych' },
  { p: 'Wdrażamy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieautoryzowanym dostępem, utratą lub niewłaściwym wykorzystaniem. Żadna metoda transmisji danych przez internet nie jest jednak w pełni bezpieczna i nie możemy zagwarantować absolutnego bezpieczeństwa.' },
  { h: 2, text: 'Zmiany w niniejszej polityce' },
  { p: 'Możemy od czasu do czasu aktualizować niniejszą Politykę Prywatności, aby odzwierciedlić zmiany w naszych praktykach lub wymogach prawnych. Wszelkie aktualizacje zostaną opublikowane na tej stronie wraz ze zaktualizowaną datą obowiązywania.' },
  { h: 2, text: 'Kontakt' },
  { p: 'Jeśli masz pytania dotyczące niniejszej Polityki Prywatności lub sposobu przetwarzania Twoich danych osobowych, skontaktuj się z nami, korzystając z danych kontaktowych podanych w stopce tej strony.' },
]

const termsAndConditionsContent: LexicalBlock[] = [
  { h: 2, text: 'Wprowadzenie' },
  { p: 'Niniejszy Regulamin określa zasady korzystania ze strony internetowej Sawicka Grzyb oraz świadczonych przez nas usług księgowych. Korzystając z tej strony lub naszych usług, zgadzasz się na przestrzeganie niniejszego regulaminu.' },
  { hr: true },
  { h: 2, text: 'Nasze usługi' },
  { p: 'Sawicka Grzyb świadczy usługi księgowe, kadrowo-płacowe oraz doradztwa biznesowego dla osób fizycznych i firm. Dokładny zakres usług jest ustalany indywidualnie z każdym klientem przed rozpoczęciem współpracy.' },
  { h: 3, text: 'Umowy o świadczenie usług' },
  { p: 'Konkretny zakres współpracy, produkty i opłaty są potwierdzane odrębnie z każdym klientem, pisemnie lub e-mailowo, przed rozpoczęciem jakichkolwiek prac.' },
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
  { quote: 'Dokładność i terminowość naszej pracy zależy bezpośrednio od dokładności i terminowości informacji, które nam przekazujesz.' },
  { h: 2, text: 'Opłaty i płatności' },
  { p: 'Opłaty za nasze usługi są ustalane z góry i mogą zależeć od złożoności, zakresu i częstotliwości świadczonych usług. Faktury są płatne w terminach określonych na każdej fakturze, chyba że pisemnie uzgodniono inaczej.' },
  { h: 4, text: 'Opóźnienia w płatnościach' },
  { p: 'Zastrzegamy sobie prawo do naliczania odsetek od zaległych faktur oraz do zawieszenia usług do czasu uregulowania zaległych płatności.' },
  { h: 2, text: 'Poufność' },
  { p: 'Wszystkie informacje klientów traktujemy jako poufne i nie ujawniamy ich osobom trzecim, z wyjątkiem sytuacji wymaganych przez prawo, na życzenie klienta lub gdy jest to niezbędne do realizacji uzgodnionych usług (np. składanie deklaracji do urzędów skarbowych).' },
  { hr: true },
  { h: 2, text: 'Ograniczenie odpowiedzialności' },
  { p: 'Mimo że dokładamy wszelkiej staranności przy świadczeniu naszych usług, nie ponosimy odpowiedzialności za straty wynikające z nieprawidłowych, niekompletnych lub spóźnionych informacji dostarczonych przez klienta, ani z okoliczności pozostających poza naszą uzasadnioną kontrolą.' },
  { h: 2, text: 'Własność intelektualna' },
  { p: 'Wszystkie treści na tej stronie, w tym teksty, grafiki i logotypy, stanowią własność Sawicka Grzyb, chyba że wskazano inaczej, i nie mogą być powielane bez zgody.' },
  { h: 2, text: 'Zakończenie współpracy' },
  {
    ul: [
      'Każda ze stron może zakończyć współpracę z zachowaniem rozsądnego, pisemnego wypowiedzenia',
      'Opłaty za prace wykonane do dnia zakończenia współpracy pozostają należne',
      'Wesprzemy sprawne przekazanie dokumentacji nowej księgowej, jeśli zostanie o to poproszone',
    ],
  },
  { h: 2, text: 'Prawo właściwe' },
  { p: 'Niniejszy Regulamin podlega prawu polskiemu i zgodnie z nim jest interpretowany. Wszelkie spory podlegają wyłącznej właściwości sądów polskich.' },
  { h: 2, text: 'Zmiany w niniejszym Regulaminie' },
  { p: 'Możemy od czasu do czasu aktualizować niniejszy Regulamin. Dalsze korzystanie z naszej strony lub usług po opublikowaniu zmian oznacza akceptację zaktualizowanego regulaminu.' },
  { h: 2, text: 'Kontakt' },
  { p: 'Jeśli masz pytania dotyczące niniejszego Regulaminu, skontaktuj się z nami, korzystając z danych kontaktowych podanych w stopce tej strony.' },
]

async function sync() {
  const payload = await getPayload({ config })

  const homePage = await payload.find({ collection: 'pages', where: { slug: { equals: '/' } }, limit: 1 })
  const page = homePage.docs[0]

  if (page) {
    const content = (page.content ?? []) as Record<string, unknown>[]
    const nextContent = content.map((block) => {
      const patch = homeBlockUpdates[block.blockType as string]
      return patch ? deepMerge(block, patch) : block
    })
    await payload.update({ collection: 'pages', id: page.id, data: { content: nextContent } })
    console.log('✓ Zaktualizowano bloki na stronie "home" (polski tekst)')
  } else {
    console.log('↷ Strona "home" nie istnieje — pomijam')
  }

  await payload.updateGlobal({
    slug: 'global-cta',
    data: {
      eyebrow: 'Gotowi do współpracy?',
      heading: 'Uprośćmy Twoją księgowość.',
      description:
        'Niezależnie od tego, czy zakładasz nową firmę, czy szukasz bardziej osobistej obsługi księgowej, chętnie pomogę. Umów się na bezpłatną rozmowę wstępną i porozmawiajmy o Twojej firmie.',
      button: { label: 'Umów bezpłatną rozmowę', type: 'custom', url: '#kontakt' },
    },
  })
  console.log('✓ Zaktualizowano globalne CTA')

  const menuLabelsByName: Record<string, string[]> = {
    Header: ['Usługi', 'O mnie', 'Jak pracujemy', 'Blog', 'Kontakt'],
    'Quick Links': ['Usługi', 'O mnie', 'Jak pracujemy', 'Blog', 'Kontakt'],
    Services: ['Księgowość', 'Kadry i płace', 'Doradztwo biznesowe i zakładanie firm'],
    'Footer Links': ['Polityka prywatności', 'Regulamin'],
  }

  for (const [name, labels] of Object.entries(menuLabelsByName)) {
    const { docs } = await payload.find({ collection: 'menu', where: { name: { equals: name } }, limit: 1 })
    const menu = docs[0]
    if (!menu || !menu.items) continue
    const nextItems = menu.items.map((item, index) => (labels[index] ? { ...item, label: labels[index] } : item))
    await payload.update({ collection: 'menu', id: menu.id, data: { items: nextItems } })
    console.log(`✓ Zaktualizowano menu "${name}" (polski tekst)`)
  }

  const sectionAnchorUrls = ['/#uslugi', '/#o-mnie', '/#jak-pracujemy', '/blog', '/#kontakt']
  for (const name of ['Header', 'Quick Links']) {
    const { docs } = await payload.find({ collection: 'menu', where: { name: { equals: name } }, limit: 1 })
    const menu = docs[0]
    if (!menu || !menu.items) continue
    const nextItems = menu.items.map((item, index) =>
      sectionAnchorUrls[index] ? { ...item, url: sectionAnchorUrls[index] } : item,
    )
    await payload.update({ collection: 'menu', id: menu.id, data: { items: nextItems } })
    console.log(`✓ Zaktualizowano menu "${name}" (nowe polskie anchor ID)`)
  }

  await payload.updateGlobal({ slug: 'header', data: { cta: { label: 'Umów rozmowę', type: 'custom', url: '#' } } })
  console.log('✓ Zaktualizowano Header.cta')

  const footerGlobal = await payload.findGlobal({ slug: 'footer' })
  if (footerGlobal.linkColumns && footerGlobal.linkColumns.length > 0) {
    const columnTitles = ['Szybkie linki', 'Usługi', 'Social Media']
    const nextLinkColumns = footerGlobal.linkColumns.map((col, index) =>
      columnTitles[index] ? { ...col, title: columnTitles[index] } : col,
    )
    await payload.updateGlobal({ slug: 'footer', data: { linkColumns: nextLinkColumns } })
    console.log('✓ Zaktualizowano Footer.linkColumns (tytuły kolumn)')
  }

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      contact: {
        address: { label: 'Adres', value: 'ul. Kwiatowa 12\n00-001 Warszawa' },
        phone: { label: 'Telefon' },
        email: { label: 'Email' },
        hours: { label: 'Godziny pracy', value: 'Poniedziałek - Piątek,\n9:00 - 17:00' },
      },
    },
  })
  console.log('✓ Zaktualizowano Footer.contact')

  for (const [author, patch] of Object.entries(testimonialUpdates)) {
    const { docs } = await payload.find({ collection: 'testimonials', where: { author: { equals: author } }, limit: 1 })
    const doc = docs[0]
    if (!doc) continue
    await payload.update({ collection: 'testimonials', id: doc.id, data: patch })
    console.log(`✓ Zaktualizowano opinię "${author}"`)
  }

  for (const [oldName, newName] of Object.entries(categoryUpdates)) {
    const { docs } = await payload.find({ collection: 'categories', where: { name: { equals: oldName } }, limit: 1 })
    const doc = docs[0]
    if (!doc) continue
    await payload.update({
      collection: 'categories',
      id: doc.id,
      data: { name: newName, internalName: newName, heading: newName },
    })
    console.log(`✓ Zaktualizowano kategorię "${oldName}" → "${newName}"`)
  }

  for (const [slug, patch] of Object.entries(postUpdates)) {
    const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Post "${slug}" nie istnieje — pomijam`)
      continue
    }
    const data: Record<string, unknown> = { ...patch }
    const blocks = postContent[slug]
    if (blocks) data.content = buildContent(blocks)
    const faqs = postFaqUpdates[slug]
    if (faqs) data.faqs = faqs

    await payload.update({ collection: 'posts', id: doc.id, data })
    console.log(`✓ Zaktualizowano wpis "${slug}"`)
  }

  const textPages: Record<string, { tagline: string; heading: string; content: LexicalBlock[]; title: string }> = {
    'privacy-policy': { title: 'Polityka Prywatności', tagline: 'Informacje prawne', heading: 'Polityka Prywatności', content: privacyPolicyContent },
    'terms-and-conditions': { title: 'Regulamin', tagline: 'Informacje prawne', heading: 'Regulamin', content: termsAndConditionsContent },
  }

  for (const [slug, textPage] of Object.entries(textPages)) {
    const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    const doc = docs[0]
    if (!doc) {
      console.log(`↷ Strona "${slug}" nie istnieje — pomijam`)
      continue
    }
    const textPageBlock = {
      blockType: 'textPage' as const,
      tagline: textPage.tagline,
      heading: textPage.heading,
      content: buildContent(textPage.content),
    }
    await payload.update({
      collection: 'pages',
      id: doc.id,
      data: { title: textPage.title, internalName: textPage.title, content: [textPageBlock] },
    })
    console.log(`✓ Zaktualizowano stronę "${slug}"`)
  }

  console.log('\n✓ Synchronizacja polskich treści zakończona')
  process.exit(0)
}

sync().catch((err) => {
  console.error(err)
  process.exit(1)
})
