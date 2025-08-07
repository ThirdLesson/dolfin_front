import { user } from '@/entities/user/user.api';
import { useUserStore } from '@/entities/user/user.store';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

export async function signIn({ loginId, password }) {
  const { url, method } = user.signIn();
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
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

export async function signOut() {
  const userStore = useUserStore();
  const groupStore = useGroupRemitStore();

  const { url, method } = user.signOut();
  const result = await fetch(url, {
    method: method,
  });

  const res = await result.json();
  localStorage.removeItem('accessToken');
  userStore.clearUserInfo();
  groupStore.clearGroupRemitInfo();

  return res.data;
}
