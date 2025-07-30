<script setup>
import { useRouter } from 'vue-router';
import { Icons } from '@/asset/images.js';
import URL from '@/shared/constants/URL';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const router = useRouter();
</script>

<template>
  <div
    class="w-full flex flex-col shadow-custom-shadow rounded-sm py-3 px-2 gap-[10px]"
  >
    <div class="flex flex-row">
      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer"
        @click="() => router.push(URL.PAGE.GROUP_REMIT)"
      >
        <img :src="Icons.remitMenu" alt="remitMenu" class="w-12 h-12 mb-1" />
        <P1>공통 송금</P1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer py-6 border-l border-gray-200 h-[70%] self-center"
        @click="() => router.push(URL.PAGE.RECOMMENDATION)"
      >
        <img :src="Icons.recommend" alt="recommend" class="w-12 h-12 mb-1" />
        <P1>상품 추천</P1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer py-6 border-l border-gray-200 h-[70%] self-center"
        @click="() => router.push(URL.PAGE.DUTCH)"
      >
        <img :src="Icons.dutchpay" alt="dutchpay" class="w-12 h-12 mb-1" />
        <P1>더치페이</P1>
      </div>
    </div>
  </div>
</template>
