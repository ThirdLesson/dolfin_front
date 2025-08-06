<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/entities/user/user.store';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Wallet from '@/features/user/account/ui/Wallet.vue';
import Menu from '@/features/user/menu/ui/Menu.vue';
import RecentHistory from '@/features/transaction/history/ui/RecentHistory.vue';
import { requestForToken, onMessageListener } from '@/firebase/config';

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isFCMInitialized } = storeToRefs(userStore);

watch(
  () => userInfo.value.memberId,
  async (memberId) => {
    if (memberId && !isFCMInitialized.value) {
      isFCMInitialized.value = true;

      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await requestForToken();
          if (token) {
            console.log('로그인 후 FCM 토큰 발급 완료');
          }
        }
      }

      onMessageListener()
        .then((payload) => {
          console.log('메시지 수신:', payload);
          if (Notification.permission === 'granted') {
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: '/favicon/favicon-32x32.png',
            });
          }
        })
        .catch((err) => {
          console.error('메시지 수신 에러:', err);
        });
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-5">
    <div
      class="flex items-center gap-2 cursor-pointer pt-[70px]"
      @click="() => router.push(URL.PAGE.MYPAGE)"
    >
      <Head2>{{ userInfo.name }} 님</Head2>
      <Head2>&gt;</Head2>
    </div>
    <div class="flex flex-col gap-4">
      <Wallet />
      <Menu />
      <div @click="() => router.push(URL.PAGE.HISTORY)">
        <RecentHistory />
      </div>
    </div>
  </div>
</template>
