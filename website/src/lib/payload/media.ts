import type { Media } from '@payload-types';

const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api';
const PAYLOAD_ORIGIN = new URL(PAYLOAD_API_URL).origin;

export function resolveMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === 'number') return undefined;
  if (!media.url) return undefined;
  return media.url.startsWith('http') ? media.url : `${PAYLOAD_ORIGIN}${media.url}`;
}
