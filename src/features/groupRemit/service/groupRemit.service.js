import { apiFetch } from '@/shared/utils/client';
import { groupRemit } from '@/entities/groupRemit/groupRemit.api';

export async function joinGroupRemit(data) {
  const { url, method } = groupRemit.joinGroupRemit();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return res;
}

export async function getGroupCommission() {
  const { url, method } = groupRemit.getGroupCommission();
  const response = await apiFetch(url, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function getMemberCount({ currency }) {
  const { url, method } = groupRemit.getMemberCount();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify({ currency }),
  });

  const res = await response.json();
  return res;
}
