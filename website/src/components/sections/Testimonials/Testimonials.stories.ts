import Testimonials from './Testimonials.astro';

export default {
  title: 'Sections/Testimonials',
  component: Testimonials,
};

export const Default = {
  args: {
    tagline: 'Testimonials',
    heading: 'Trusted by business owners across modern Polish companies.',
    testimonialsMode: 'manual',
    manualTestimonials: [
      {
        quote:
          'Sawicka Grzyb helped us understand our cash flow and made tax season far less stressful. Their response time is outstanding.',
        author: 'Anna Kowalska',
        company: 'Owner, Nowak Construction',
        rating: 5,
        photo: '/assets/sections/client-story-photo.png',
      },
      {
        quote:
          'The clarity, timeliness, and friendly service made a real difference. I always know my books are in good hands.',
        author: 'Paweł Nowak',
        company: 'CEO, Pure Systems',
        rating: 5,
        photo: '/assets/sections/client-story-photo.png',
      },
      {
        quote:
          'They explained everything in a way that was easy to understand and saved us time on weekly bookkeeping tasks.',
        author: 'Magda Zielińska',
        company: 'Founder, Zielińska Studio',
        rating: 5,
        photo: '/assets/sections/client-story-photo.png',
      },
    ],
  },
};
