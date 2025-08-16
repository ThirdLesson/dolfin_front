importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyCoFE5jVGp6fHu54zexrYKJe8O3GXAJBy0',
  authDomain: 'dolfin-1df70.firebaseapp.com',
  projectId: 'dolfin-1df70',
  storageBucket: 'dolfin-1df70.firebasestorage.app',
  messagingSenderId: '111816839009',
  appId: '1:111816839009:web:fa8d778ac8f2fc1235bf20',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: '/favicon/favicon-32x32.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
