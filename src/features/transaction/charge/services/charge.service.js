import { apiFetch } from '@/shared/utils/client';
import { transaction } from '@/entities/transaction/transaction.api';

export const chargeWallet = async ({
  walletId,
  amount,
  accountNumber,
  walletPassword,
}) => {
  const { url, method } = transaction.charge(walletId);

  const response = await apiFetch(`${url}/${walletId}`, {
    method,
    body: JSON.stringify({
      amount,
      accountNumber,
      walletPassword,
    }),
  });

  return await response.json();
};
