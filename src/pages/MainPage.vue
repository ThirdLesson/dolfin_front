<script setup>
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';

import Wallet from '@/features/user/account/ui/Wallet.vue';
import Menu from '@/features/user/menu/ui/Menu.vue';
import RecentHistory from '@/features/transaction/history/ui/RecentHistory.vue';

const router = useRouter();
const name = '루나키키';
const goToPage = (path) => router.push(path);
</script>

<template>
  <div class="flex flex-col bg-white min-h-screen overflow-auto pb-[80px]">
    <div
      class="flex items-center gap-1 px-4 cursor-pointer flex-none pt-[80px]"
      @click="goToPage(URL.PAGE.MYPAGE)"
    >
      <Head2>{{ name }} 님</Head2>
      <Head2>&gt;</Head2>
    </div>

    <div class="flex flex-col px-4 gap-4 mt-4">
      <Wallet />
      <Menu />
      <RecentHistory />
    </div>
  </div>
</template>
