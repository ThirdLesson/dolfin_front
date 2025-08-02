<script setup>
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';

defineProps({
  amount: Number,
  balance: Number,
  recipient: String,
});
</script>

<template>
  <div class="flex flex-col">
    <Subtitle2 class="text-dol-dark-gray">{{ recipient }} 님께</Subtitle2>
    <Subtitle1>얼마를 보낼까요?</Subtitle1>
    <div class="flex flex-col items-center justify-center h-[30vh]">
      <Head1>{{ amount.toLocaleString() }} P</Head1>
      <Subtitle2 class="text-dol-dark-gray">
        현재 잔액: {{ balance?.toLocaleString() }} P
      </Subtitle2>
    </div>
  </div>
</template>
