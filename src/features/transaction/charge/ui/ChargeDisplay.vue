<script setup>
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption2.vue';

const props = defineProps({
  amount: Number,
  minError: Boolean,
});
</script>

<template>
  <div class="flex flex-col">
    <Subtitle1>얼마를 충전할까요?</Subtitle1>
    <div class="flex flex-col items-center justify-center h-[30vh]">
      <Subtitle2 class="text-dol-dark-gray">충전 금액</Subtitle2>
      <Head1>{{ amount.toLocaleString() }} 원</Head1>
      <Caption1
        :class="!minError && 'opacity-0'"
        class="text-dol-error transition-opacity duration-200"
      >
        최소 충전 금액은 10,000원부터 입니다.
      </Caption1>
    </div>
  </div>
</template>
