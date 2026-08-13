import type { Post } from '@payload-types';
import { payloadFetch } from './client';

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  const result = await payloadFetch<{ docs: Post[] }>(
    `/posts?sort=-publishedDate&limit=${limit}&depth=1`,
  );
  return result.docs;
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await payloadFetch<{ docs: Post[] }>(`/posts?sort=-publishedDate&limit=100&depth=1`);
  return result.docs;
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const result = await payloadFetch<{ docs: Post[] }>(
    `/posts?where[category][equals]=${categoryId}&sort=-publishedDate&limit=100&depth=1`,
  );
  return result.docs;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await payloadFetch<{ docs: Post[] }>(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  );
  return result.docs[0] ?? null;
}

export function getPostHref(post: Post): string {
  const categorySlug = typeof post.category === 'object' ? post.category?.slug : undefined;
  return categorySlug ? `/${categorySlug}/${post.slug}` : `/blog/${post.slug}`;
}
