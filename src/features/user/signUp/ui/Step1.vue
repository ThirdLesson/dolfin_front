<script setup>
import { ref, computed } from 'vue';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';

import { checkId } from '../services/signUp.service';

const emit = defineEmits(['next', 'update']);

const loginId = ref('');
const password = ref('');
const passwordCheck = ref('');
const isIdValid = ref(false);

const checkIdFunction = async () => {
  isIdValid.value = true;

  const result = await checkId({
    loginId: loginId.value,
  });

  // if (result) {
  //   isIdValid.value = true;
  // }
};

const handleComplete = () => {
  if (password.value !== passwordCheck.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  emit('update', {
    loginId: loginId.value,
    password: password.value,
  });
  emit('next');
};

const isValid = computed(
  () =>
    loginId.value && isIdValid.value && password.value && passwordCheck.value,
);
</script>

<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2>사용하실 아이디와 <br />비밀번호를 알려주세요</Head2>
    <div class="flex flex-col gap-[40px]">
      <TitleInput title="아이디" v-model="loginId" />
      <div class="flex items-end gap-2">
        <TitleInput title="비밀번호" type="password" v-model="password" />
        <SmMainButton class="shrink-0" @click="checkIdFunction"
          >중복확인</SmMainButton
        >
      </div>
      <TitleInput
        title="비밀번호 확인"
        type="password"
        v-model="passwordCheck"
      />
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">완료</LgMainButton>
</template>
