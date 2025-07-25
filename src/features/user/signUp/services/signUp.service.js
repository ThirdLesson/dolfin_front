import { user } from '@/entities/user/user.api';

export async function checkId({ loginId }) {
  const { url, method } = user.checkId();
  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId,
    }),
  });

  const res = await result.json();
  return res.data;
}

export async function signUp({ data }) {
  const { url, method } = user.signUp();
  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });

  const res = await result.json();
  return res.data;
}
