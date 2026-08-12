import type { Header } from '@payload-types';
import { payloadFetch } from './client';

export async function getHeader(): Promise<Header> {
  return payloadFetch<Header>('/globals/header?depth=1');
}
