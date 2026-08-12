import type { Footer } from '@payload-types';
import { payloadFetch } from './client';

export async function getFooter(): Promise<Footer> {
  return payloadFetch<Footer>('/globals/footer?depth=1');
}
