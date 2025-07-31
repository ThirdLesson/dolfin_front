<script setup>
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';

const model = defineModel();
</script>

<template>
  <PlainCard>
    <Head3>환전 금액 입력(KRW)</Head3>
    <BoxInput placeholder="금액을 입력하세요" v-model="model" />
  </PlainCard>
</template>
