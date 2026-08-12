import Button from './Button.astro';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { control: { type: 'select' }, options: ['primary', 'accent', 'outline'] },
  },
};

export const Primary = {
  args: { variant: 'primary', slots: { default: 'Book a Free Call' } },
};

export const Accent = {
  args: { variant: 'accent', slots: { default: 'Book a Free Call' } },
};

export const Outline = {
  args: { variant: 'outline', slots: { default: 'See Services' } },
  parameters: { backgrounds: { default: 'dark' } },
};

export const AsLink = {
  args: { variant: 'primary', href: '#kontakt', slots: { default: 'Book a Free Call' } },
};
