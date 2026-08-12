import Hero from './Hero.astro';

export default {
  title: 'Sections/Hero',
  component: Hero,
};

export const Default = {
  args: {
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
};
