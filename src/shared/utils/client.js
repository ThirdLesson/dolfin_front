import { useRouter } from 'vue-router';
import { user } from '@/entities/user/user.api';

const router = useRouter();

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

  return res.data;
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

  const response = await fetch(url, config);

  // AccessToken 만료 → refresh
  if (response.status === 401) {
    const result = await refresh();

    if (result.status === 200) {
      // 리프레시 성공 시 토큰 갱신하고 재요청
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      const retryConfig = {
        ...config,
        headers: retryHeaders,
      };

      return fetch(url, retryConfig);
    } else {
      // 리프레시 실패 시 로그인 페이지로 리디렉션
      router.push('/');
      return;
    }
  }

  return response;
}
