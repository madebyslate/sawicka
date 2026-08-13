import type { GlobalCta } from '@payload-types';
import { payloadFetch } from './client';

export async function getGlobalCta(): Promise<GlobalCta> {
  return payloadFetch<GlobalCta>('/globals/global-cta?depth=1');
}
