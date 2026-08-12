import PersonalRelationship from './PersonalRelationship.astro';

export default {
  title: 'Sections/PersonalRelationship',
  component: PersonalRelationship,
};

export const Default = {
  args: {
    tagline: 'Personal Relationship',
    heading: 'One Accountant. One Relationship. Complete Responsibility.',
    description:
      "Large firms often divide responsibilities across departments. Here, you'll always know exactly who's looking after your business.",
    image: { url: '/media/why-work-with-me.webp', alt: '' },
    features: [
      {
        icon: '/icons/user.svg',
        title: 'I Know Your Business Personally',
        description: 'No repeating your story to different people.',
      },
      {
        icon: '/icons/messages.svg',
        title: 'Direct Communication',
        description: 'Questions go directly to the person responsible.',
      },
      {
        icon: '/icons/zap.svg',
        title: 'Decisions Without Delays',
        description: 'No "I\'ll ask a colleague." Just practical answers when you need them.',
      },
      {
        icon: '/icons/shield.svg',
        title: 'Personal Accountability',
        description: 'Your business deserves ownership not handoffs.',
      },
    ],
  },
};
