<script setup>
import { ref } from 'vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';

// todo: api 명세서가 어떤지 보고 korengmap 쓸 수 있으면 쓰기
const options = [
  { label: '신협은행', value: 'cuh' },
  { label: '우체국예금', value: 'epost' },
  { label: '전북은행', value: 'jeonbuk' },
  { label: '새마을금고', value: 'mg' },
  { label: 'SC제일은행', value: 'sc' },
  { label: 'KB국민은행', value: 'kb' },
  { label: '우리은행', value: 'woori' },
  { label: '하나은행', value: 'hana' },
  { label: '산업은행', value: 'kdb' },
  { label: '토스뱅크', value: 'toss' },
  { label: '부산은행', value: 'bnk' },
  { label: '광주은행', value: 'gwangju' },
  { label: '아이엠뱅크', value: 'iambank' },
  { label: '신한은행', value: 'shinhan' },
  { label: '농협', value: 'nonghyup' },
  { label: '카카오뱅크', value: 'kakaobank' },
  { label: '케이뱅크', value: 'kbank' },
  { label: '씨티은행', value: 'citi' },
  { label: '수협은행', value: 'suhyup' },
  { label: '기업은행', value: 'ibk' },
  { label: '대구은행', value: 'daegu' },
];

const emit = defineEmits(['next']);

const bankType = ref('');
const accountNumber = ref('');
const bankId = ref('');
const bankPassword = ref('');
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-[25vh] flex flex-col items-center justify-center gap-[5px]"
    >
      <Subtitle1>계좌를 등록해주세요.</Subtitle1>
      <Caption1>안전한 1원 인증으로 계좌를 확인합니다.</Caption1>
    </div>
    <div class="flex flex-1 flex-col justify-between">
      <div class="w-full flex flex-col gap-[15px]">
        <Dropdown title="은행 선택" :options="options" v-model="bankType" />
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>계좌번호</Subtitle2>
          <BoxInput v-model="accountNumber" />
        </div>
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>은행 계정 아이디</Subtitle2>
          <BoxInput v-model="bankId" />
        </div>
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>은행 계정 비밀번호</Subtitle2>
          <BoxInput v-model="bankPassword" />
        </div>
      </div>
      <LgMainButton @click="emit('next')">다음</LgMainButton>
    </div>
  </div>
</template>
