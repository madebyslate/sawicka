import Icon from './Icon.astro';

// Placeholder SVG tylko na potrzeby Storybooka — w realnym kodzie strony src
// zawsze wskazuje na pobrany i zacommitowany asset wyeksportowany z Figmy
// (patrz komentarz w Icon.astro), nigdy na ręcznie rysowany kształt.
const placeholder =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#030f22" stroke-width="1.5"><path d="M4 4l16 16M20 4L4 20"/></svg>',
  );

export default {
  title: 'UI/Icon',
  component: Icon,
};

export const Default = {
  args: { src: placeholder, alt: '', size: 24 },
};

export const Large = {
  args: { src: placeholder, alt: '', size: 48 },
};
