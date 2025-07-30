import { user } from '@/entities/user/user.api';
import { useUserStore } from '@/entities/user/user.store';

async function refresh() {
  const userStore = useUserStore();

  const loginId = userStore.userInfo.loginId;
  const memberId = userStore.userInfo.memberId;
  const { url, method } = user.refresh();

  const response = await fetch(url, {
    method: method,
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

  // 응답을 JSON으로 먼저 파싱
  let result;
  try {
    result = await response.clone().json();
  } catch (e) {
    result = {};
  }

  // AccessToken 만료 → refresh
  if (result.message === '토큰 재발급이 필요합니다.') {
    const refreshed = await refresh();

    if (refreshed.message === '토큰 재발급이 필요합니다.') {
      // 리프레시 성공 → 토큰 갱신하고 재요청
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
      // 리프레시 실패 → 로그인 페이지 이동
      window.location.href = '/';
    }
  }

  return response;
}
