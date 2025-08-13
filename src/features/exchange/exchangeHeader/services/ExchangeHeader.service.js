import { exchange } from '@/entities/exchange/exchange.api';
import { apiFetch } from '@/shared/utils/client';

export async function getLiveExchange() {
  const { url, method } = exchange.live();
  const response = await apiFetch(url, {
    method,
  });

  const res = await response.json();
  return res;
}
