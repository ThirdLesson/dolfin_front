<script setup>
import { ref, computed, watch } from 'vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import { checkId } from '../services/signUp.service';

const emit = defineEmits(['next', 'update']);

const loginId = ref('');
const password = ref('');
const passwordCheck = ref('');
const isIdValid = ref(null);
const idErrorMsg = ref('');
const pwErrorMsg = ref('');

// 최소 10자, 영문 대소문자, 숫자, 특수문자 각각 최소 1개
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;

const handleCheckId = async () => {
  if (loginId.value.length < 6) {
    isIdValid.value = false;
    idErrorMsg.value = '아이디는 6자 이상이어야 합니다.';
    return;
  }
  idErrorMsg.value = '';

  const result = await checkId({
    loginId: loginId.value,
  });

  if (result.status === 400) {
    isIdValid.value = false;
    idErrorMsg.value = '이미 존재하는 회원 아이디입니다.';
  } else {
    isIdValid.value = true;
  }
};

const handleComplete = () => {
  if (password.value !== passwordCheck.value) {
    pwErrorMsg.value = '비밀번호가 일치하지 않습니다.';
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
    loginId.value.length >= 6 &&
    isIdValid.value === true &&
    password.value &&
    passwordCheck.value,
);

watch(loginId, () => {
  isIdValid.value = null;
  idErrorMsg.value = '';
});

watch(password, () => {
  if (!password.value) {
    pwErrorMsg.value = '';
    return;
  }
  if (!passwordPattern.test(password.value)) {
    pwErrorMsg.value =
      '비밀번호는 10자 이상, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
  } else {
    pwErrorMsg.value = '';
  }
});
</script>

<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2>사용하실 아이디와 <br />비밀번호를 알려주세요</Head2>
    <div class="flex flex-col gap-[40px]">
      <div class="flex flex-col gap-[2px]">
        <div class="flex items-end gap-2">
          <TitleInput title="아이디" v-model="loginId" />
          <SmMainButton class="shrink-0" @click="handleCheckId"
            >중복확인</SmMainButton
          >
        </div>
        <div class="h-[2px]">
          <Caption2 v-if="idErrorMsg" class="text-dol-error">{{
            idErrorMsg
          }}</Caption2>
          <Caption2 v-else-if="isIdValid === true" class="text-dol-dark"
            >사용 가능한 회원 아이디입니다.</Caption2
          >
        </div>
      </div>

      <div class="flex flex-col gap-[2px]">
        <TitleInput title="비밀번호" type="password" v-model="password" />
        <div class="h-[2px]">
          <Caption2 v-if="pwErrorMsg" class="text-dol-error">{{
            pwErrorMsg
          }}</Caption2>
        </div>
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
