import BlogCard from './BlogCard.astro';
import type { Post } from '@payload-types';

// Placeholder tylko na potrzeby Storybooka — patrz komentarz w Icon.stories.ts.
const placeholderImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="#efe7d8"/></svg>',
  );

const post: Post = {
  id: 1,
  title: '5 Common Tax Mistakes Business Owners Make',
  slug: 'common-tax-mistakes',
  generateSlug: false,
  excerpt: 'Avoid these frequent, costly errors that catch business owners off guard every tax season.',
  publishedDate: '2026-01-15T00:00:00.000Z',
  readTime: '5 min read',
  featuredImage: {
    id: 1,
    alt: 'Osoba przegląda dokumenty podatkowe',
    url: placeholderImage,
    updatedAt: '',
    createdAt: '',
  },
  category: {
    id: 1,
    name: 'Taxes',
    slug: 'taxes',
    generateSlug: false,
    updatedAt: '',
    createdAt: '',
  },
  updatedAt: '',
  createdAt: '',
};

export default {
  title: 'UI/BlogCard',
  component: BlogCard,
};

export const Default = {
  args: { post },
};
