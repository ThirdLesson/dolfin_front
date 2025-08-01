<script setup>
import { ref } from 'vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import SmallDropdown from '@/shared/components/molecules/SmallDropdown.vue';

const selectedType = ref('USD');

const options = [
  { value: 'USD', label: 'USD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'CAD', label: 'CAD' },
  { value: 'HKD', label: 'HKD' },
  { value: 'CNY', label: 'CNY' },
  { value: 'THB', label: 'THB' },
  { value: 'IDR', label: 'IDR' },
  { value: 'VND', label: 'VND' },
  { value: 'RUB', label: 'RUB' },
  { value: 'MYR', label: 'MYR' },
];
</script>

<template>
  <Head2>공동 송금에 참여하여</Head2>
  <Head2>수수료를 절약해보세요.</Head2>
  <SmallDropdown :options="options" v-model="selectedType" />
</template>
