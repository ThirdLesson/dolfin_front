import { transaction } from '@/entities/transaction/transaction.api';
import { user } from '@/entities/user/user.api';
import { apiFetch } from '@/shared/utils/client';

export async function addAccount(data) {
  const { url, method } = transaction.addAccount();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}

export async function verifyCode({ authCode }) {
  const { url, method } = transaction.verifyCode();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify({ authCode }),
  });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}

export async function setWalletPw(data) {
  const { url, method } = transaction.setWalletPw();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}

export async function getWalletInfo() {
  const { url, method } = user.wallet();
  const response = await apiFetch(url, { method });

  const res = await response.json();
  return res;
}

export async function getLinkedAccounts(walletId) {
  const { url, method } = transaction.getLinkedAccounts(walletId);
  const response = await apiFetch(url, { method });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}
