import { map } from '@/entities/map/map.api';
import { apiFetch } from '@/shared/utils/client';

export async function getBanks() {
  const { url, method } = map.banks();
  const response = await apiFetch(url, { method });

  const res = await response.json();
  return res.data;
}

export async function getCenters() {
  const { url, method } = map.centers();
  const response = await apiFetch(url, { method });

  const res = await response.json();
  return res.data;
}
