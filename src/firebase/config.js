import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { postFCMToken } from './firebase.service';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// FCM 메시징 설정
const messaging = getMessaging(app);

// FCM 토큰 가져오기 함수
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY,
      // serviceWorkerRegistration: await navigator.serviceWorker.register(
      //   '/firebase-messaging-sw.js',
      // ),
    });

    if (currentToken) {
      // console.log('FCM 토큰 가져오기 성공!', currentToken);

      try {
        await postFCMToken({ fcmToken: currentToken });
      } catch (e) {
        console.error('토큰 전송 실패:', e);
      }

      return currentToken;
    } else {
      console.log('토큰을 가져올 수 없습니다.');
    }
  } catch (err) {
    console.log('토큰 발급 중 에러 발생:', err);
  }
};

// Foreground 메시지 수신 함수
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Foreground message 수신:', payload);
      resolve(payload);
    });
  });
