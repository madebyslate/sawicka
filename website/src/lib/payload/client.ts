const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api';

export class PayloadApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly path: string,
  ) {
    super(message);
    this.name = 'PayloadApiError';
  }
}

export async function payloadFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${PAYLOAD_API_URL}${path}`;
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new PayloadApiError(`Payload API request failed: ${res.status} ${res.statusText}`, res.status, path);
  }

  return res.json() as Promise<T>;
}
