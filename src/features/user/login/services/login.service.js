import { user } from '@/entities/user/user.api';

export async function signIn({ loginId, password }) {
  const { url, method } = user.signIn();
  const result = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId,
      password,
    }),
  });

  const res = await result.json();

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  return res.data;
}

export async function refresh(params) {
  const { url, method } = user.refresh();
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: params.loginId,
      memberId: params.memberId,
    }),
  });

  const res = await result.json();

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  return res.data;
}

export async function signOut() {
  const { url, method } = user.signOut();
  const result = await fetch(url, {
    method: method,
  });

  const res = await result.json();
  localStorage.removeItem('accessToken');

  return res.data;
}
