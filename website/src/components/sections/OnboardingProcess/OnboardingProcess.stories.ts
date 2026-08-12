import OnboardingProcess from './OnboardingProcess.astro';

export default {
  title: 'Sections/OnboardingProcess',
  component: OnboardingProcess,
};

export const Default = {
  args: {
    tagline: 'Onboarding Process',
    heading: 'A Smooth Transition From Day One.',
    description:
      "Changing accountants shouldn't be stressful. I handle the transition so you can stay focused on running your business.",
    image: { url: '/media/how-we-work.webp', alt: '' },
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
};
