<script setup>
import { useRouter } from 'vue-router';

import Head2 from '../atoms/typography/Head2.vue';
import chevron from '@/asset/chevron-left.png';

const router = useRouter();
const goBack = () => router.back();
</script>

<template>
  <div class="w-full flex items-center gap-5">
    <div class="cursor-pointer flex justify-center items-center">
      <img :src="chevron" @click="goBack" />
    </div>
    <Head2>
      <slot />
    </Head2>
  </div>
</template>
