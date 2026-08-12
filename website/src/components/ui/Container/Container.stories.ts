import Container from './Container.astro';

export default {
  title: 'UI/Container',
  component: Container,
};

export const Default = {
  args: {
    slots: {
      default: '<div style="background: #efe7d8; padding: 2rem; text-align: center;">1320px max-width content</div>',
    },
  },
};
