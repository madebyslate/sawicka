import Section from './Section.astro';

export default {
  title: 'UI/Section',
  component: Section,
};

export const Default = {
  args: {
    slots: {
      default: '<div style="background: #efe7d8; padding: 2rem; text-align: center;">Section content</div>',
    },
  },
};
