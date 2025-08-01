import { transaction } from '@/entities/transaction/transaction.api';
import { user } from '@/entities/user/user.api';
import { apiFetch } from '@/shared/utils/client';
import { useUserStore } from '@/entities/user/user.store';

export async function getMyAccounts() {
  const userStore = useUserStore();
  const walletId = userStore.userInfo.walletId;

  const { url, method } = user.getMyAccounts();
  const queryUrl = `${url}/${walletId}`;
  const response = await apiFetch(queryUrl, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function getRecentTels() {
  const { url, method } = transaction.getRecentTels();
  const response = await apiFetch(url, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function getRecentAccounts() {
  const { url, method } = transaction.getRecentAccounts();
  const response = await apiFetch(url, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function transferByTel(data) {
  const { url, method } = transaction.transferByTel();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return res;
}

export async function transferByAccount(data) {
  const { url, method } = transaction.transferByAccount();
  const response = await apiFetch(url, {
    method,
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return res;
}

export async function checkAccountName({ accountNumber, bankType }) {
  const { url, method } = transaction.checkAccountName();
  const queryUrl = `${url}?accountNumber=${encodeURIComponent(accountNumber)}&bankType=${encodeURIComponent(bankType)}`;

  const response = await apiFetch(queryUrl, {
    method,
  });

  const res = await response.json();
  return res;
}

export async function checkTelName({ phoneNumber }) {
  const { url, method } = transaction.checkTelName();
  const queryUrl = `${url}?phoneNumber=${encodeURIComponent(phoneNumber)}`;
  const response = await apiFetch(queryUrl, {
    method,
  });

  const res = await response.json();
  return res;
}
