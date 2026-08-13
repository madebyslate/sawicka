import type { Page, Post } from '@payload-types';

interface ReferenceValue {
  relationTo: string;
  value: number | Page | Post;
}

export interface LinkLike {
  label?: string | null;
  type?: 'reference' | 'custom' | null;
  reference?: ReferenceValue | null;
  url?: string | null;
}

export function resolveLinkHref(link: LinkLike | null | undefined): string {
  if (!link) return '#';

  if (link.type === 'reference' && link.reference && typeof link.reference.value === 'object') {
    const { relationTo, value } = link.reference;

    switch (relationTo) {
      case 'pages': {
        const slug = (value as Page).slug;
        return slug === '/' ? '/' : `/${slug}`;
      }
      case 'posts': {
        const post = value as Post;
        const categorySlug = typeof post.category === 'object' ? post.category?.slug : undefined;
        return categorySlug ? `/${categorySlug}/${post.slug}` : `/blog/${post.slug}`;
      }
      default:
        return '#';
    }
  }

  if (link.type === 'custom' && link.url) {
    return link.url;
  }

  return '#';
}
