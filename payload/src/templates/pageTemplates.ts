export interface PageTemplateDefinition {
  label: string
  value: string

  getInitialContent: () => Record<string, unknown>[]
}

export const pageTemplates: PageTemplateDefinition[] = [
  {
    label: 'Homepage',
    value: 'homepage',
    getInitialContent: () => [
      {
        blockType: 'hero',
        tagline: 'Trusted Accounting for Business Owners',
        heading: 'Accounting That Puts Your Business First',
        description:
          'From bookkeeping and payroll to tax compliance and business advice, every service is handled personally by one experienced accountant who takes full responsibility for your business not just your paperwork.',
        trustText: 'Trusted by 200+ businesses with reliable accounting and personal financial support.',
        trustHighlight: '200+ businesses',
        primaryButton: { label: 'Book a Free Call', type: 'custom', url: '#kontakt' },
        secondaryButton: { label: 'See Services', type: 'custom', url: '#uslugi' },
        floatingBadges: [
          { label: 'Dedicated Financial Partner' },
          { label: 'Trusted Accounting Partner' },
          { label: 'Accounting Done Personally' },
        ],
      },
      {
        blockType: 'trustStatementAndStatistics',
        tagline: 'Trust Statement and Statistics',
        heading:
          'Supporting Businesses with Reliable Accounting, Transparent Communication, and Long-Term Financial Confidence.',
        stats: [
          { value: '8', suffix: '+', label: 'Years of Experience' },
          { value: '100', suffix: '+', label: 'Businesses Supported' },
          { value: '99', suffix: '%', label: 'On-Time Tax Filing' },
          { value: '100', suffix: '%', label: 'Zero penalties for clients' },
        ],
      },
      {
        blockType: 'painPoints',
        tagline: 'Pain Points',
        heading: 'Accounting Should Reduce Stress, Not Create More of It.',
        description:
          "Many business owners come to us after feeling frustrated with slow communication, confusing paperwork, or never knowing who is actually handling their business. If any of these situations sound familiar, you're not alone.",
        // image (wymagane) — celowo pominięte, patrz komentarz u góry pliku.
        painPoints: [
          {
            // iconImage (wymagane wizualnie) — celowo pominięte, patrz komentarz u góry pliku.
            title: 'I Never Reach My Accountant',
            description: 'Every question becomes a new email chain or another person to explain everything to.',
          },
          {
            title: "I'm Afraid of Costly Mistakes",
            description: 'One missed document or misunderstood regulation can become an expensive problem.',
          },
          {
            title: 'Everything Feels Complicated',
            description: "Tax deadlines, paperwork, regulations — it's difficult to know what really matters.",
          },
          {
            title: 'Switching Seems Like Too Much Work',
            description: 'Changing accountants feels risky and time-consuming, so many businesses stay stuck.',
          },
        ],
        closingText: 'You deserve accounting that feels straightforward, personal, and dependable.',
        button: { label: 'Explore My Services', type: 'custom', url: '#uslugi' },
      },
      {
        blockType: 'services',
        tagline: 'Services',
        heading: 'Everything Your Business Needs, Handled Personally.',
        description:
          'From daily bookkeeping to business registration, every service is delivered directly by the person responsible for your account.',
        services: [
          {
            number: '01',
            title: 'Accounting',
            description: 'Keep your financial records accurate, compliant, and always ready for the next decision.',
            areas: [
              { value: 'Revenue & expense bookkeeping' },
              { value: 'Lump-sum taxation' },
              { value: 'Full accounting' },
              { value: 'Tax settlements' },
            ],
            // image (wymagane) — celowo pominięte.
            button: { label: 'Learn More', type: 'custom', url: '#kontakt' },
          },
          {
            number: '02',
            title: 'HR & Payroll',
            description: 'Reliable payroll administration so your employees are paid correctly and on time.',
            areas: [
              { value: 'Payroll processing' },
              { value: 'Employment documentation' },
              { value: 'Social security administration' },
              { value: 'Employee reporting' },
            ],
            button: { label: 'Learn More', type: 'custom', url: '#kontakt' },
          },
          {
            number: '03',
            title: 'Business Advisory & Company Setup',
            description:
              "Starting or changing a business doesn't have to be overwhelming. Receive practical guidance from registration to choosing the right tax structure.",
            areas: [
              { value: 'Company registration' },
              { value: 'Tax form selection' },
              { value: 'Business consultation' },
              { value: 'Administrative support' },
            ],
            button: { label: 'Learn More', type: 'custom', url: '#kontakt' },
          },
        ],
      },
      {
        blockType: 'personalRelationship',
        tagline: 'Personal Relationship',
        heading: 'One Accountant. One Relationship. Complete Responsibility.',
        description:
          "Large firms often divide responsibilities across departments. Here, you'll always know exactly who's looking after your business.",
        // image (wymagane) — celowo pominięte.
        features: [
          {
            title: 'I Know Your Business Personally',
            description: 'No repeating your story to different people.',
          },
          {
            title: 'Direct Communication',
            description: 'Questions go directly to the person responsible.',
          },
          {
            title: 'Decisions Without Delays',
            description: 'No "I\'ll ask a colleague." Just practical answers when you need them.',
          },
          {
            title: 'Personal Accountability',
            description: 'Your business deserves ownership not handoffs.',
          },
        ],
      },
      {
        blockType: 'experienceAndTrust',
        tagline: 'Experience and Trust',
        heading: 'Building Long-Term Business Relationships Through Trust.',
        // portrait (wymagane) — celowo pominięte.
        bio: 'Sawicka Grzyb is a certified accountant dedicated to helping business owners manage their finances with confidence. By working directly with every client, she provides reliable accounting, clear communication, and personal support tailored to each business.',
        facts: [
          { label: 'Career', type: 'tags', tags: [{ value: '10+ Years' }] },
          {
            label: 'Professional Experience',
            type: 'tags',
            tags: [
              { value: 'Bookkeeping' },
              { value: 'Payroll Management' },
              { value: 'Tax Compliance' },
              { value: 'Business Advisory' },
            ],
          },
          // "Certifications & Licenses" (type: images) celowo pominięte —
          // bez realnych zdjęć certyfikatów nie ma czym wypełnić images[].
          { label: 'Professional Liability Insurance', type: 'tags', tags: [{ value: 'Fully Insured Professional' }] },
        ],
        quote:
          "My goal isn't simply to manage your accounting. It's to become the accountant you never have to worry about.",
      },
      {
        blockType: 'onboardingProcess',
        tagline: 'Onboarding Process',
        heading: 'A Smooth Transition From Day One.',
        description:
          "Changing accountants shouldn't be stressful. I handle the transition so you can stay focused on running your business.",
        // image (wymagane) — celowo pominięte.
        steps: [
          {
            step: 'Step 1',
            title: 'Book a Free Consultation',
            description: "Let's discuss your business, current situation, and what you need.",
          },
          {
            step: 'Step 2',
            title: 'We Handle the Transfer',
            description:
              "I'll coordinate the transfer of documents and formalities with your previous accountant whenever possible.",
          },
          {
            step: 'Step 3',
            title: 'Simple Onboarding',
            description: "We'll organize your documents, systems, and communication so everything runs smoothly.",
          },
          {
            step: 'Step 4',
            title: 'Ongoing Support',
            description: 'Stay compliant with direct support and clear deadlines.',
          },
        ],
      },
      {
        blockType: 'testimonials',
        tagline: 'Testimonials',
        heading: 'Client experiences that speak for the service.',
        testimonialsMode: 'latest',
      },
      {
        blockType: 'faq',
        tagline: 'FAQ',
        heading: 'Most common questions answered before we start.',
        description:
          'Get clarity on how the process works, what to expect, and how we can support your business from day one.',
        button: { label: 'Book a Free Call', type: 'custom', url: '#kontakt' },
        faqs: [
          {
            question: 'How much do your accounting services cost?',
            answer:
              'Every business is different, so pricing depends on the services you need, the size of your business, and the complexity of your accounting. After a free consultation, you’ll receive a clear, transparent quote with no hidden fees.',
          },
          {
            question: 'Can you help me switch from my current accountant?',
            answer:
              'Yes. I’ll handle the transfer process and coordinate with your previous accountant whenever possible, making the transition as simple and stress-free as possible.',
          },
          {
            question: 'Do we need to meet in person?',
            answer:
              'Not at all. I work with clients both remotely and in person, depending on your preference. Most day-to-day communication can be handled efficiently by phone or email.',
          },
        ],
      },
      {
        blockType: 'blog',
        tagline: 'Insights for Business Owners',
        heading: 'Practical Accounting Advice You Can Actually Use.',
        description:
          'Stay informed with clear explanations about taxes, accounting, business regulations, and financial decisions written for business owners, not accountants.',
        postsMode: 'latest',
      },
      {
        blockType: 'cta',
        eyebrow: 'Ready to Work?',
        heading: "Let's Make Your Accounting Simpler.",
        description:
          "Whether you're starting a new business or looking for a more personal accounting experience, I'd be happy to help. Book a free introductory call and let's discuss your business.",
        // backgroundImage (wymagane) — celowo pominięte.
        button: { label: 'Book a Free Call', type: 'custom', url: '#kontakt' },
      },
    ],
  },
  {
    label: 'Text Page',
    value: 'text-page',
    getInitialContent: () => [
      {
        blockType: 'textPage',
        tagline: 'Legal',
        heading: 'Privacy Policy',
        // content (richText) — celowo pominięte, uzupełnia się bezpośrednio w edytorze.
      },
    ],
  },
  {
    label: 'Blank',
    value: 'blank',
    getInitialContent: () => [],
  },
]
