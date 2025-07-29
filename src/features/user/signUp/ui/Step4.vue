<script setup>
import { useRouter } from 'vue-router';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { formatDate } from '@/shared/utils/format';

const props = defineProps({
  signUpResult: Object,
});

const router = useRouter();

const infos = [
  {
    label: '여권번호',
    value: props.signUpResult?.passportNumber,
  },
  {
    label: '국적',
    value: props.signUpResult?.nationality,
  },
  {
    label: '생년월일',
    value: formatDate(props.signUpResult?.birth),
  },
  {
    label: '체류기간 만료일',
    value: formatDate(props.signUpResult?.remainTime),
  },
];
</script>

<template>
  <div class="flex flex-col flex-1 gap-[5vh] justify-center">
    <div class="flex flex-col gap-[8vh]">
      <Head2>{{ props.signUpResult?.name }} 님, 환영합니다!</Head2>
      <Subtitle2 class="text-dol-dark"
        ><span class="text-dol-dark-gray">|</span> 잔여 체류 기간 확인
        결과</Subtitle2
      >
    </div>

    <section>
      <div class="w-full h-[2px] bg-dol-light-gray" />
      <div
        v-for="info in infos"
        :key="info.value"
        class="w-full px-4 py-3 flex border-b border-1 border-dol-light-gray"
      >
        <div class="w-[80%] flex items-center justify-between">
          <Subtitle2>{{ info.label }}</Subtitle2>
          <P1>{{ info.value }}</P1>
        </div>
      </div>
      <div class="w-full h-[1px] bg-dol-light-gray" />
    </section>
  </div>
  <LgMainButton @click="router.push('/')">완료</LgMainButton>
</template>
