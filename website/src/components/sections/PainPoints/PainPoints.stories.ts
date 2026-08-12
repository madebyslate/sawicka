import PainPoints from './PainPoints.astro';

export default {
  title: 'Sections/PainPoints',
  component: PainPoints,
};

export const Default = {
  args: {
    tagline: 'Pain Points',
    heading: 'Accounting Should Reduce Stress, Not Create More of It.',
    description:
      "Many business owners come to us after feeling frustrated with slow communication, confusing paperwork, or never knowing who is actually handling their business. If any of these situations sound familiar, you're not alone.",
    image: { url: '/media/sound-familiar-meeting.webp', alt: '' },
    painPoints: [
      {
        icon: '/icons/phone-off.svg',
        title: 'I Never Reach My Accountant',
        description: 'Every question becomes a new email chain or another person to explain everything to.',
      },
      {
        icon: '/icons/alert.svg',
        title: "I'm Afraid of Costly Mistakes",
        description: 'One missed document or misunderstood regulation can become an expensive problem.',
      },
      {
        icon: '/icons/file-stack.svg',
        title: 'Everything Feels Complicated',
        description: "Tax deadlines, paperwork, regulations — it's difficult to know what really matters.",
      },
      {
        icon: '/icons/refresh.svg',
        title: 'Switching Seems Like Too Much Work',
        description: 'Changing accountants feels risky and time-consuming, so many businesses stay stuck.',
      },
    ],
    closingText: 'You deserve accounting that feels straightforward, personal, and dependable.',
    button: { label: 'Explore My Services', type: 'custom', url: '#uslugi' },
  },
};
