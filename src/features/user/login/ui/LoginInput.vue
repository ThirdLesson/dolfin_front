<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { signIn } from '../services/login.service';
import { useUserStore } from '@/entities/user/user.store';

const router = useRouter();
const userStore = useUserStore();

const loginId = ref('');
const password = ref('');

const handleLogin = async () => {
  const result = await signIn({
    loginId: loginId.value,
    password: password.value,
  });

  if (result) {
    userStore.setUserInfo(result);
    router.push('/main');
  } else {
    alert('로그인에 실패했습니다.');
  }

  loginId.value = '';
  password.value = '';
};
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
    <LgMainButton @click="handleLogin">로그인</LgMainButton>
  </div>
</template>
