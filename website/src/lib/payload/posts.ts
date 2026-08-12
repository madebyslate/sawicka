import type { Post } from '@payload-types';
import { payloadFetch } from './client';

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  const result = await payloadFetch<{ docs: Post[] }>(
    `/posts?sort=-publishedDate&limit=${limit}&depth=1`,
  );
  return result.docs;
}
