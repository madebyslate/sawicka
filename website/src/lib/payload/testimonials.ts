import type { Testimonial } from '@payload-types';
import { payloadFetch } from './client';

export async function getLatestTestimonials(limit = 3): Promise<Testimonial[]> {
  const result = await payloadFetch<{ docs: Testimonial[] }>(
    `/testimonials?sort=-createdAt&limit=${limit}&depth=2`,
  );
  return result.docs;
}
