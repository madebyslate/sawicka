import IconFeatureCard from './IconFeatureCard.astro';

// Placeholder tylko na potrzeby Storybooka — patrz komentarz w Icon.stories.ts.
const placeholder =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="12" r="9"/></svg>',
  );

export default {
  title: 'UI/IconFeatureCard',
  component: IconFeatureCard,
};

export const Default = {
  args: {
    icon: placeholder,
    title: 'I Know Your Business Personally',
    slots: { default: 'No repeating your story to different people.' },
  },
};
