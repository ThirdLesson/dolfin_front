import { apiFetch } from '@/shared/utils/client';
import { recommendation } from '@/entities/recommendation/recommendation.api';

export async function getDepositsFilter({
  productPeriod,
  pageNumber,
  pageSize = 20,
  spclConditions,
}) {
  const { url, method } = recommendation.depositsFilter();

  const params = new URLSearchParams({
    productPeriod,
    pageNumber,
    pageSize,
  });

  spclConditions?.forEach((cond) => params.append('spclConditions', cond));

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}

export async function getDepositInfo(depositId) {
  const { url, method } = recommendation.depositsInfo();
  const queryUrl = `${url}/${depositId}`;

  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
}
