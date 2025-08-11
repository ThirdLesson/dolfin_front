<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/user.store';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Wallet from '@/features/user/account/ui/Wallet.vue';
import Menu from '@/features/user/menu/ui/Menu.vue';
import RecentHistory from '@/features/transaction/history/ui/RecentHistory.vue';
import { requestForToken, onMessageListener } from '@/firebase/config';

const { t } = useI18n();

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isFCMInitialized } = storeToRefs(userStore);

onMounted(async () => {
  if (!userInfo.value.memberId || isFCMInitialized.value) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('알림 권한 거부됨');
      return;
    }

    const token = await requestForToken();
    if (token) {
      console.log('✅ FCM 토큰 발급 성공:');
      isFCMInitialized.value = true;
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
        console.error('메시지 수신 리스너 등록 실패:', err);
      });
  } catch (err) {
    console.error('FCM 처리 실패:', err);
  }
});
</script>

<template>
  <div class="h-full flex flex-col gap-5">
    <div
      class="flex items-center gap-2 cursor-pointer pt-[70px]"
      @click="() => router.push(URL.PAGE.MYPAGE)"
    >
      <Head2
        >{{ userInfo.name || t('mypage.user') }}{{ t('common.suffix') }}</Head2
      >
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
