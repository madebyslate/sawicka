import type { SiteSetting } from '@payload-types';
import { payloadFetch } from './client';

export async function getSiteSettings(): Promise<SiteSetting> {
  return payloadFetch<SiteSetting>('/globals/site-settings');
}
