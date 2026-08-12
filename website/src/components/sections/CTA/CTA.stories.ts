import CTA from './CTA.astro';

export default {
  title: 'Sections/CTA',
  component: CTA,
};

export const Default = {
  args: {
    eyebrow: 'Ready to Work?',
    heading: "Let's Make Your Accounting Simpler.",
    description:
      "Whether you're starting a new business or looking for a more personal accounting experience, I'd be happy to help. Book a free introductory call and let's discuss your business.",
    backgroundImage: {
      url: '/media/ready-to-work.webp',
      alt: 'Dłoń stemplująca dokument przy biurku',
    },
    button: {
      label: 'Book a Free Call',
      type: 'custom',
      url: '#kontakt',
    },
  },
};
