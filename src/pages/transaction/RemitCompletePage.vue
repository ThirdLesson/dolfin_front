<script setup>
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons } from '@/asset/images';
import { useTransStore } from '@/entities/transaction/transaction.store';

const router = useRouter();
const store = useTransStore();
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex flex-col h-[60vh] w-full items-center justify-center gap-6"
    >
      <img :src="Icons.check" alt="complete" />
      <div class="flex flex-col items-center">
        <Head2 class="text-dol-dark-gray"
          >{{ store.transInfo.name }} 님께</Head2
        >
        <Head1 class="m-[-5px]">
          {{ Number(store.transInfo.amount).toLocaleString() }} P</Head1
        >
        <Head2 class="text-dol-dark-gray">송금완료</Head2>
      </div>
    </div>
    <LgMainButton @click="() => router.push(URL.PAGE.MAIN)">확인</LgMainButton>
  </div>
</template>
