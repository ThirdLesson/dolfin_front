<script setup>
import { ref } from 'vue';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const infos = [
  {
    label: '여권번호',
    value: 'M123456',
  },
  {
    label: '국적',
    value: '미국',
  },
  {
    label: '생년월일',
    value: '2001.01.01',
  },
  {
    label: '체류기간 만료일',
    value: '2030.01.01',
  },
];
</script>

<template>
  <div class="flex flex-col flex-1 gap-[5vh] justify-center">
    <div class="flex flex-col gap-[8vh]">
      <Head2>루나키키 님, 환영합니다!</Head2>
      <Subtitle2 class="text-dol-dark"
        ><span class="text-dol-dark-gray">|</span> 잔여 체류 기간 확인
        결과</Subtitle2
      >
    </div>
    <div class="flex flex-col gap-3">
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
      <P1 class="text-dol-dark text-end"
        >해당 정보가 맞다면 완료 버튼을 눌러주세요</P1
      >
    </div>
  </div>
  <LgMainButton @click="handleComplete">완료</LgMainButton>
</template>
