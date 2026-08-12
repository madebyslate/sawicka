import type { Page } from '@payload-types';
import { payloadFetch } from './client';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const result = await payloadFetch<{ docs: Page[] }>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=3&limit=1`,
  );
  return result.docs[0] ?? null;
}

export async function getAllPages(): Promise<Page[]> {
  const result = await payloadFetch<{ docs: Page[] }>(`/pages?depth=0&limit=100`);
  return result.docs;
}
