import { apiFetch } from '@/shared/utils/client';
import { transaction } from '@/entities/transaction/transaction.api';

export const getTransactions = async ({
  page,
  size,
  period = 'ONE_MONTH',
  type,
  sortDirection = 'LATEST',
  minAmount,
  maxAmount,
}) => {
  const { url, method } = transaction.history();

  const params = new URLSearchParams({
    page,
    size,
    period,
    sortDirection,
  });

  if (type && type !== 'ALL') {
    params.append('type', type);
  }
  if (minAmount !== null && minAmount !== '') {
    params.append('minAmount', minAmount);
  }
  if (maxAmount !== null && maxAmount !== '') {
    params.append('maxAmount', maxAmount);
  }

  const queryUrl = `${url}?${params.toString()}`;
  const response = await apiFetch(queryUrl, { method });

  const res = await response.json();
  return res;
};
