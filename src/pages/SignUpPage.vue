<script setup>
import { ref, computed, reactive, watch } from 'vue';

import Step1 from '@/features/user/signUp/ui/Step1.vue';
import Step2 from '@/features/user/signUp/ui/Step2.vue';
import Step3 from '@/features/user/signUp/ui/Step3.vue';
import Step4 from '@/features/user/signUp/ui/Step4.vue';

import { signUp } from '@/features/user/signUp/services/signUp.service';

const step = ref(1);

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

const signupData = reactive({
  birth: 0,
  country: '',
  loginId: '',
  name: '',
  nationality: '',
  passportNumber: '',
  password: '',
  phoneNumber: '',
});

const submit = async () => {
  console.log('최종 제출할 데이터:', signupData);
  const result = await signUp({
    birth: signupData.birth,
    country: signupData.country,
    loginId: signupData.loginId,
    name: signupData.name,
    nationality: signupData.nationality,
    passportNumber: signupData.passportNumber,
    password: signupData.password,
    phoneNumber: signupData.phoneNumber,
  });

  if (result) {
    alert('회원가입 실패');
  }
};

watch(
  signupData,
  (newVal) => {
    console.log('signupData 변경됨:', newVal);
  },
  { deep: true },
);
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <component
      :is="currentStep"
      v-bind="signupData"
      @next="() => step++"
      @prev="() => step--"
      @submit="submit"
      @update="(data) => Object.assign(signupData, data)"
    />
  </div>
</template>
