import Services from './Services.astro';

export default {
  title: 'Sections/Services',
  component: Services,
};

export const Default = {
  args: {
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
        image: { url: '/media/accounting.webp', alt: '' },
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
        image: { url: '/media/hr-payroll.webp', alt: '' },
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
        image: { url: '/media/business-advisory.webp', alt: '' },
        button: { label: 'Learn More', type: 'custom', url: '#kontakt' },
      },
    ],
  },
};
