import { user } from '@/entities/user/user.api';

export async function checkId({ loginId }) {
  const { url, method } = user.checkId();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId,
    }),
  });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}

export async function sendCode({ phoneNumber }) {
  const { url, method } = user.sendCode();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
    }),
  });

  const res = await response.json();
  return res;
}

export async function verifyCode({ code, phoneNumber }) {
  const { url, method } = user.verifyCode();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      phoneNumber,
    }),
  });

  const res = await response.json();
  return res;
}

export async function signUp(data) {
  const { url, method } = user.signUp();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  return {
    status: response.status,
    ...res,
  };
}
