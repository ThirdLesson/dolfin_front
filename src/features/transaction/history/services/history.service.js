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

  if (type) params.append('type', type);
  if (minAmount != null) params.append('minAmount', minAmount);
  if (maxAmount != null) params.append('maxAmount', maxAmount);

  const response = await apiFetch(`${url}?${params.toString()}`, { method });
  return response.json();
};
