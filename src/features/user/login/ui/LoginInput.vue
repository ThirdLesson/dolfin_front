<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import P1 from '@/shared/components/atoms/typography/P1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';

import { signIn } from '../services/login.service';
import { refresh } from '../services/login.service';

const router = useRouter();

const loginId = ref('ss7622');
const password = ref('');
const isLoggedIn = ref(false);
const memberId = ref(1);

const handleLogin = async () => {
  const result = await signIn({
    loginId: loginId.value,
    password: password.value,
  });

  if (result) {
    router.push('/main'); // 로그인 성공 후 페이지 이동
    isLoggedIn.value = true;
    // 사용자 정보 store에 저장
  } else {
    alert('로그인에 실패했습니다.');
  }

  loginId.value = '';
  password.value = '';
};

const refreshFunction = async () => {
  const result = await refresh({
    loginId: loginId.value,
    memberId: memberId.value,
  });

  console.log('refresh', result);
};

// isLoggedIn이 true로 바뀔 때 refreshFunction 실행
watch(isLoggedIn, (newVal) => {
  if (newVal) {
    refreshFunction();
  }
});
</script>
<template>
  <div class="flex flex-col gap-[25px]">
    <BoxInput placeholder="ID" v-model="loginId" />
    <BoxInput placeholder="PASSWORD" v-model="password" type="password" />
    <div class="flex justify-center items-center gap-[50px] text-dol-dark-gray">
      <P1 class="underline cursor-pointer" @click="() => router.push('/signup')"
        >회원가입</P1
      >
      <P1>|</P1>
      <P1 class="underline cursor-pointer">비밀번호 찾기</P1>
    </div>
    <LgMainButton @click="handleLogin">완료</LgMainButton>
  </div>
</template>
