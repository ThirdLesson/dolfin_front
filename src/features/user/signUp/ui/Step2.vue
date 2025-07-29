<script setup>
import { ref, computed, watch } from 'vue';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import { sendCode, verifyCode } from '../services/signUp.service';

const emit = defineEmits(['next', 'update']);

const phoneNumber = ref('');
const code = ref('');
const isCodeValid = ref(false);

const handleComplete = () => {
  emit('update', {
    phoneNumber: phoneNumber.value,
  });
  emit('next');
};

const handleSendCode = async () => {
  // const result = await sendCode({
  //   phoneNumber: phoneNumber.value,
  // });

  if (result.status === 204) {
    alert('인증번호가 성공적으로 전송됐습니다.');
  }
};

const handleVerifyCode = async () => {
  // const result = await verifyCode({
  //   phoneNumber: phoneNumber.value,
  //   code: Number(code.value),
  // });

  // if (result.status === 204) {
  //   isCodeValid.value = true;
  // }

  isCodeValid.value = true;
};

const isValid = computed(
  () => phoneNumber.value.length == 11 && isCodeValid.value,
);

watch(code, (newCode) => {
  console.log('newCode', newCode);
});
</script>
<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2>본인 확인을 위해<br />휴대폰 번호를 알려주세요</Head2>
    <div class="flex flex-col gap-[40px]">
      <div class="flex items-end gap-2">
        <TitleInput title="휴대폰 번호" v-model="phoneNumber" />
        <SmMainButton class="shrink-0" @click="handleSendCode"
          >인증번호 받기</SmMainButton
        >
      </div>
      <div class="flex items-end gap-2">
        <TitleInput title="인증 번호" v-model="code" />
        <SmMainButton class="shrink-0" @click="handleVerifyCode"
          >인증번호 확인</SmMainButton
        >
      </div>
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">완료</LgMainButton>
</template>
