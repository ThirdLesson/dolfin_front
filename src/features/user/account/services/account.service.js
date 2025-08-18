import { user } from '@/entities/user/user.api';
import { apiFetch } from '@/shared/utils/client';

export async function addAccount(data) {
  const { url, method } = user.addAccount();
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

export async function verifyAccount({ authCode }) {
  const { url, method } = user.verifyAccount();
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
  const { url, method } = user.setWalletPw();
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
  const { url, method } = user.getWalletInfo();
  const response = await apiFetch(url, { method });

  const res = await response.json();
  return res;
}
