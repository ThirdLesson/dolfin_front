import URL from '@/shared/constants/URL';
import { user } from '@/entities/user/user.api';
import { useUserStore } from '@/entities/user/user.store';
import { signOut } from '@/features/user/login/services/login.service';

async function refresh() {
  const userStore = useUserStore();

  const loginId = userStore.userInfo.loginId;
  const memberId = userStore.userInfo.memberId;
  const { url, method } = user.refresh();

  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId,
      memberId,
    }),
  });

  const res = await response.json();

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  return res;
}

export async function apiFetch(url, options = {}) {
  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const config = {
    method: options.method,
    credentials: 'include',
    headers,
    ...options,
  };

  let response = await fetch(url, config);

  let result;
  try {
    result = await response.clone().json();
  } catch (e) {
    result = {};
  }

  if (result.message === '토큰 재발급이 필요합니다.') {
    const refreshed = await refresh();

    if (refreshed.message === '토큰 재발급이 필요합니다.') {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      const retryConfig = {
        ...config,
        headers: retryHeaders,
      };

      response = await fetch(url, retryConfig);
    }

    if (refreshed.message === '로그인이 필요한 서비스입니다.') {
      await signOut();
      window.location.href = URL.PAGE.LOGIN;
    }
  }

  return response;
}
