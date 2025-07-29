import { user } from '@/entities/user/user.api';

async function refresh() {
  // todo: loginId, memberId Pinia에서 가져오기
  const { url, method } = user.refresh();
  const result = await fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: 'ss7622',
      memberId: 1,
    }),
  });

  const res = await result.json();

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  return {
    status: response.status,
    ...res,
  };
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

  // AccessToken 만료 → refresh
  if (response.status === 401) {
    const refreshed = await refresh();

    if (refreshed.data) {
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
    } else {
      // 리프레시 실패 → 로그인 페이지 이동
      window.location.href = '/';
      return;
    }
  }

  return response;
}
