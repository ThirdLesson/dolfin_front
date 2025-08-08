<script setup>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import Step1 from '@/features/user/signUp/ui/Step1.vue';
import Step2 from '@/features/user/signUp/ui/Step2.vue';
import Step3 from '@/features/user/signUp/ui/Step3.vue';
import Step4 from '@/features/user/signUp/ui/Step4.vue';
import URL from '@/shared/constants/URL';
import { signUp } from '@/features/user/signUp/services/signUp.service';
import { formatDate } from '@/shared/utils/format';

const router = useRouter();

const step = ref(3);
const signUpResult = ref(null);
const joinSuccess = ref(true);

const signupData = reactive({
  birth: null,
  country: '',
  loginId: '',
  name: '',
  nationality: '',
  passportNumber: '',
  password: '',
  phoneNumber: '',
});

const currentStep = computed(() => {
  switch (step.value) {
    case 1:
      return Step1;
    case 2:
      return Step2;
    case 3:
      return Step3;
    case 4:
      return Step4;
  }
});

// ms(밀리초) 동안 대기하는 Promise 함수
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const handleSignUp = async () => {
  await router.push(URL.PAGE.LOADING);

  // 회원가입 API 요청과 5초 대기를 동시에 실행
  const [result] = await Promise.all([
    signUp({
      birth: formatDate(signupData.birth, '-'),
      country: signupData.country,
      loginId: signupData.loginId,
      name: signupData.name,
      nationality: signupData.nationality,
      passportNumber: signupData.passportNumber,
      password: signupData.password,
      phoneNumber: formatDate(signupData.phoneNumber, '-'),
    }),
    wait(5000),
  ]);

  if (result.status !== 200) {
    alert('회원가입 실패');
    joinSuccess.value = false;
    return router.replace(URL.PAGE.SIGNUP);
  }

  signUpResult.value = result.data;
  step.value = 4;
};
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <component
      :is="currentStep"
      :joinSuccess="joinSuccess"
      :signUpResult="signUpResult"
      v-bind="signupData"
      @next="() => step++"
      @prev="() => step--"
      @submit="handleSignUp"
      @update="(data) => Object.assign(signupData, data)"
    />
  </div>
</template>
