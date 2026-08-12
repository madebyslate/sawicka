import Blog from './Blog.astro';

export default {
  title: 'Sections/Blog',
  component: Blog,
};

export const Default = {
  args: {
    tagline: 'Insights for Business Owners',
    heading: 'Practical Accounting Advice You Can Actually Use.',
    description:
      'Stay informed with clear explanations about taxes, accounting, business regulations, and financial decisions written for business owners, not accountants.',
    postsMode: 'manual',
    manualPosts: [
      {
        id: '1',
        title: '5 Tax Mistakes Every Business Owner Should Avoid',
        slug: 'tax-mistakes',
        category: 'Tax Guide',
        excerpt: 'Stay informed with practical articles on accounting, taxes, payroll...',
        featuredImage: { url: '/media/insight-tax-mistakes.webp', alt: '' },
        publishedDate: '2026-08-05',
        readTime: '5 min read',
      },
    ],
  },
};
