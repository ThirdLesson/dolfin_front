import { apiFetch } from '@/shared/utils/client';

export async function postFCMToken({ fcmToken }) {
  const url = `${import.meta.env.VITE_APP_API_URL}/fcm`;
  const method = 'POST';

  const response = await apiFetch(url, {
    method,
    body: JSON.stringify({
      fcmToken,
    }),
  });

  const res = await response.json();
  return res;
}
