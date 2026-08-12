import type { Media } from '@payload-types';

const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api';
const PUBLIC_SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? new URL(PAYLOAD_API_URL).origin;
const PUBLIC_SITE_ORIGIN = new URL(PUBLIC_SITE_URL).origin;

export function resolveMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === 'number') return undefined;
  if (!media.url) return undefined;
  return media.url.startsWith('http') ? media.url : `${PUBLIC_SITE_ORIGIN}${media.url}`;
}
