<script setup>
import { ref, watch } from 'vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { addAccount } from '../services/account.service';

const options = [
  { label: '신협은행', value: '신협은행' },
  { label: '우체국예금', value: '우체국예금' },
  { label: '전북은행', value: '전북은행' },
  { label: '새마을금고', value: '새마을금고' },
  { label: '제일은행', value: '제일은행' },
  { label: '국민은행', value: '국민은행' },
  { label: '우리은행', value: '우리은행' },
  { label: '하나은행', value: '하나은행' },
  { label: '산업은행', value: '산업은행' },
  { label: '토스뱅크', value: '토스뱅크' },
  { label: '부산은행', value: '부산은행' },
  { label: '광주은행', value: '광주은행' },
  { label: '아이엠뱅크', value: '아이엠뱅크' },
  { label: '신한은행', value: '신한은행' },
  { label: '농협', value: '농협' },
  { label: '카카오뱅크', value: '카카오뱅크' },
  { label: '케이뱅크', value: '케이뱅크' },
  { label: '씨티은행', value: '씨티은행' },
  { label: '수협은행', value: '수협은행' },
  { label: '기업은행', value: '기업은행' },
  { label: '대구은행', value: '대구은행' },
];

const emit = defineEmits(['next']);

const bankId = ref('');
const bankPassword = ref('');
const accountNumber = ref('');
const bankType = ref(options[0].value);
const showError = ref(false);

const handleNext = async () => {
  const result = await addAccount({
    accountNumber: accountNumber.value,
    bankId: bankId.value,
    bankPassword: bankPassword.value,
    bankType: bankType.value,
  });

  if (!result.data) {
    showError.value = true;
    return;
  }

  const authCode = result.data.authCode;
  emit('next', {
    accountNumber: accountNumber.value,
    bankType: bankType.value,
    authCode,
  });
};

watch([bankId, bankPassword], () => {
  if (showError.value) {
    showError.value = false;
  }
});
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
          <BoxInput v-model="bankPassword" type="password" />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <Caption1 v-if="showError" class="text-dol-error"
          >은행 아이디 또는 비밀번호가 일치하지 않습니다.</Caption1
        >
        <LgMainButton @click="handleNext">다음</LgMainButton>
      </div>
    </div>
  </div>
</template>
