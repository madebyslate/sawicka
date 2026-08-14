import type { Media } from '@payload-types';

const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api';
const PUBLIC_SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? new URL(PAYLOAD_API_URL).origin;
const PUBLIC_SITE_ORIGIN = new URL(PUBLIC_SITE_URL).origin;

function toAbsolute(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${PUBLIC_SITE_ORIGIN}${url}`;
}

export function resolveMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === 'number') return undefined;
  return toAbsolute(media.url);
}

type MediaSizeName = 'thumbnail' | 'card';

interface ResolvedMediaSize {
  url: string;
  width?: number;
  height?: number;
}

export function resolveMediaSize(
  media: number | Media | null | undefined,
  size: MediaSizeName,
): ResolvedMediaSize | undefined {
  if (!media || typeof media === 'number') return undefined;

  const variant = media.sizes?.[size];
  const variantUrl = toAbsolute(variant?.url);
  if (variantUrl) {
    return { url: variantUrl, width: variant?.width ?? undefined, height: variant?.height ?? undefined };
  }

  const fallbackUrl = toAbsolute(media.url);
  if (!fallbackUrl) return undefined;
  return { url: fallbackUrl, width: media.width ?? undefined, height: media.height ?? undefined };
}
