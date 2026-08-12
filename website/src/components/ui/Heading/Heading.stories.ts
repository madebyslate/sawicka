import Heading from './Heading.astro';

export default {
  title: 'UI/Heading',
  component: Heading,
  argTypes: {
    as: { control: { type: 'select' }, options: ['h1', 'h2', 'h3'] },
  },
};

export const H1 = {
  args: { as: 'h1', slots: { default: 'Accounting That Puts Your Business First' } },
};

export const H2 = {
  args: { as: 'h2', slots: { default: 'Everything You Might Want to Know Before We Start.' } },
};

export const H3 = {
  args: { as: 'h3', slots: { default: 'How much do your accounting services cost?' } },
};
