<script setup>
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import loading from '@/asset/logo/loading.gif';
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col justify-center items-center overflow-hidden"
  >
    <img
      :src="loading"
      alt="loading"
      class="max-w-[30%] max-h-[30%] object-contain mb-4"
    />
    <Head2 class="text-dol-dark-gray">로딩중. . .</Head2>
  </div>
</template>
