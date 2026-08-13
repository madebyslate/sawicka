import { getPayload } from 'payload'
import config from '../payload.config'
import { buildContent, type LexicalBlock } from './lexicalBuilder'

const privacyPolicyContent: LexicalBlock[] = [
  { h: 2, text: 'Introduction' },
  {
    p: 'Sawicka Grzyb ("we", "us", "our") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains what information we collect, why we collect it, how we use it, and the rights you have regarding your data.',
  },
  {
    p: 'By using our website or engaging our accounting services, you agree to the collection and use of information in accordance with this policy.',
  },
  { h: 2, text: 'Data Controller' },
  {
    p: 'Sawicka Grzyb is the data controller responsible for your personal data. If you have any questions about this policy or how your data is handled, you can reach us using the contact details listed in the footer of this website.',
  },
  { hr: true },
  { h: 2, text: 'What Information We Collect' },
  { h: 3, text: 'Information You Provide Directly' },
  {
    ul: [
      'Name and contact details (email address, phone number)',
      'Business information (company name, registration number, tax ID)',
      'Financial and accounting documents you share with us for our services',
      'Messages you send through our contact forms or by email',
    ],
  },
  { h: 3, text: 'Information Collected Automatically' },
  {
    ul: [
      'IP address and approximate location',
      'Browser type and device information',
      'Pages visited and time spent on our website',
      'Referring website or source',
    ],
  },
  { h: 2, text: 'Legal Basis for Processing' },
  {
    p: 'We process your personal data only when we have a valid legal basis to do so under the General Data Protection Regulation (GDPR):',
  },
  {
    ol: [
      'Your consent (e.g. when you submit a contact form)',
      'Performance of a contract (e.g. providing accounting services)',
      'Compliance with a legal obligation (e.g. tax and accounting record-keeping requirements)',
      'Our legitimate interests (e.g. improving our website and services)',
    ],
  },
  { hr: true },
  { h: 2, text: 'How We Use Your Information' },
  {
    ul: [
      'To provide and manage our accounting and advisory services',
      'To respond to your inquiries and communicate with you',
      'To comply with legal, tax, and regulatory obligations',
      'To maintain the security and proper functioning of our website',
      'To improve our services based on how the website is used',
    ],
  },
  { h: 2, text: 'Sharing Your Information' },
  {
    p: 'We do not sell or rent your personal data. We only share information with third parties when necessary, and always with appropriate safeguards in place:',
  },
  {
    ul: [
      'Tax authorities and public institutions, where required by law',
      'IT and hosting providers who support our systems',
      'Professional advisors (e.g. legal counsel), where necessary',
    ],
  },
  { hr: true },
  { h: 2, text: 'Data Retention' },
  {
    p: 'We retain personal data only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law.',
  },
  { h: 4, text: 'Retention Periods' },
  {
    ul: [
      'Accounting and tax records: retained in line with statutory requirements under Polish law (typically 5 years)',
      'Contact form submissions: retained until your inquiry is resolved, unless a longer period is legally required',
      'Website analytics data: retained in aggregated, anonymized form where possible',
    ],
  },
  { h: 2, text: 'Your Rights Under GDPR' },
  { p: 'You have the following rights regarding your personal data:' },
  {
    ul: [
      'Right to access the personal data we hold about you',
      'Right to request correction of inaccurate data',
      'Right to request erasure of your data, where applicable',
      'Right to restrict or object to certain processing',
      'Right to data portability',
      'Right to withdraw consent at any time, where processing is based on consent',
      'Right to lodge a complaint with the Polish Data Protection Authority (UODO)',
    ],
  },
  {
    quote:
      'To exercise any of these rights, simply contact us using the details in the footer — we will respond within the timeframes required by law.',
  },
  { hr: true },
  { h: 2, text: 'Cookies' },
  {
    p: 'Our website uses cookies and similar technologies to improve your browsing experience and understand how our website is used.',
  },
  { h: 3, text: 'Types of Cookies We Use' },
  {
    ul: [
      'Essential cookies, required for the website to function properly',
      'Analytics cookies, which help us understand how visitors use the site',
    ],
  },
  {
    p: 'You can control or disable cookies through your browser settings at any time, though this may affect certain website functionality.',
  },
  { h: 2, text: 'Data Security' },
  {
    p: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },
  { h: 2, text: 'Changes to This Policy' },
  {
    p: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date.',
  },
  { h: 2, text: 'Contact Us' },
  {
    p: 'If you have any questions about this Privacy Policy or how we handle your personal data, please get in touch using the contact details in the footer of this website.',
  },
]

const termsAndConditionsContent: LexicalBlock[] = [
  { h: 2, text: 'Introduction' },
  {
    p: 'These Terms & Conditions govern your use of the Sawicka Grzyb website and the accounting services we provide. By using this website or engaging our services, you agree to be bound by these terms.',
  },
  { hr: true },
  { h: 2, text: 'Our Services' },
  {
    p: 'Sawicka Grzyb provides accounting, bookkeeping, payroll, and business advisory services to individuals and businesses. The exact scope of services is agreed individually with each client before work begins.',
  },
  { h: 3, text: 'Service Agreements' },
  {
    p: 'Specific engagements, deliverables, and fees are confirmed separately with each client, either in writing or by email, before any work commences.',
  },
  { h: 2, text: 'Use of This Website' },
  {
    ul: [
      'You may use this website for lawful purposes only',
      'Content on this website is provided for general information and does not constitute financial or legal advice',
      'We may update or change website content at any time without prior notice',
    ],
  },
  { hr: true },
  { h: 2, text: 'Client Responsibilities' },
  { p: 'To provide accurate and timely accounting services, we rely on our clients to:' },
  {
    ol: [
      'Provide complete, accurate, and timely financial information and documents',
      'Respond promptly to requests for clarification or missing information',
      'Meet agreed deadlines for submitting documentation',
      'Inform us promptly of any changes relevant to their accounting or tax situation',
    ],
  },
  {
    quote:
      'The accuracy and timeliness of our work depends directly on the accuracy and timeliness of the information you provide.',
  },
  { h: 2, text: 'Fees and Payment' },
  {
    p: 'Fees for our services are agreed in advance and may depend on the complexity, scope, and frequency of the services provided. Invoices are payable within the terms specified on each invoice, unless otherwise agreed in writing.',
  },
  { h: 4, text: 'Late Payment' },
  {
    p: 'We reserve the right to charge interest on overdue invoices and to pause services until outstanding payments are settled.',
  },
  { h: 2, text: 'Confidentiality' },
  {
    p: 'We treat all client information as confidential and will not disclose it to third parties except where required by law, requested by the client, or necessary to deliver the agreed services (e.g. filing with tax authorities).',
  },
  { hr: true },
  { h: 2, text: 'Limitation of Liability' },
  {
    p: 'While we take every reasonable care in providing our services, we cannot be held liable for losses arising from inaccurate, incomplete, or late information provided by the client, or from circumstances beyond our reasonable control.',
  },
  { h: 2, text: 'Intellectual Property' },
  {
    p: 'All content on this website, including text, graphics, and logos, is the property of Sawicka Grzyb unless otherwise stated, and may not be reproduced without permission.',
  },
  { h: 2, text: 'Termination of Services' },
  {
    ul: [
      'Either party may terminate an engagement with reasonable written notice',
      'Fees for work completed up to the termination date remain payable',
      'We will support a smooth handover of records to a new accountant where requested',
    ],
  },
  { h: 2, text: 'Governing Law' },
  {
    p: 'These Terms & Conditions are governed by and construed in accordance with the laws of Poland. Any disputes will be subject to the exclusive jurisdiction of the Polish courts.',
  },
  { h: 2, text: 'Changes to These Terms' },
  {
    p: 'We may update these Terms & Conditions from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms.',
  },
  { h: 2, text: 'Contact Us' },
  {
    p: 'If you have any questions about these Terms & Conditions, please get in touch using the contact details in the footer of this website.',
  },
]

const textPages: Record<string, { title: string; tagline: string; heading: string; content: LexicalBlock[] }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    tagline: 'Legal',
    heading: 'Privacy Policy',
    content: privacyPolicyContent,
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    tagline: 'Legal',
    heading: 'Terms & Conditions',
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
