import ExperienceAndTrust from './ExperienceAndTrust.astro';

export default {
  title: 'Sections/ExperienceAndTrust',
  component: ExperienceAndTrust,
};

export const Default = {
  args: {
    tagline: 'Experience and Trust',
    heading: 'Building Long-Term Business Relationships Through Trust.',
    portrait: { url: '/media/portrait.webp', alt: 'Sawicka Grzyb' },
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
      {
        label: 'Certifications & Licenses',
        type: 'images',
        images: [
          { image: { url: '/media/certification-1.webp', alt: 'Certyfikat zawodowy' } },
          { image: { url: '/media/certification-2.webp', alt: 'Certyfikat zawodowy' } },
        ],
      },
      { label: 'Professional Liability Insurance', type: 'tags', tags: [{ value: 'Fully Insured Professional' }] },
    ],
    quote:
      "My goal isn't simply to manage your accounting. It's to become the accountant you never have to worry about.",
  },
};
