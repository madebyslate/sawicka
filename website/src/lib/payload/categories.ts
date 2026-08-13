import type { Category } from '@payload-types';
import { payloadFetch } from './client';

export async function getAllCategories(): Promise<Category[]> {
  const result = await payloadFetch<{ docs: Category[] }>(`/categories?depth=0&limit=100`);
  return result.docs;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await payloadFetch<{ docs: Category[] }>(
    `/categories?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
  );
  return result.docs[0] ?? null;
}
