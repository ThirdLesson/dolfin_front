import { apiFetch } from '@/shared/utils/client';
import { transaction } from '@/entities/transaction/transaction.api';
import { useUserStore } from '@/entities/user/user.store';

export const chargeWallet = async (data) => {
  const userStore = useUserStore();
  const walletId = userStore.userInfo.walletId;

  const { url, method } = transaction.charge();
  const queryUrl = `${url}/${walletId}`;
  const response = await apiFetch(queryUrl, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return res;
};
