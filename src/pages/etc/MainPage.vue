<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/entities/user/user.store';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Wallet from '@/features/user/account/ui/Wallet.vue';
import Menu from '@/features/user/menu/ui/Menu.vue';
import RecentHistory from '@/features/transaction/history/ui/RecentHistory.vue';

const router = useRouter();
const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);
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
      <RecentHistory />
    </div>
  </div>
</template>
