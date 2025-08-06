import { apiFetch } from '@/shared/utils/client';
import { recommendation } from '@/entities/recommendation/recommendation.api';

export async function getDeposits(data) {
  const { url, method } = recommendation.deposits();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getDepositsFilter(query = '') {
  const { url, method } = recommendation.depositsFilter();
  const queryUrl = `${url}${query}`;

  const response = await apiFetch(queryUrl, { method });
  return await response.json();
}

export async function getDepositInfo(depositId) {
  const { url, method } = recommendation.depositsInfo();
  const queryUrl = `${url}/${depositId}`;

  const response = await apiFetch(queryUrl, { method });
  return await response.json();
}
