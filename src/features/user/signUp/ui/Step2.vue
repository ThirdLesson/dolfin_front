<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import { sendCode, verifyCode } from '../services/signUp.service';

const emit = defineEmits(['next', 'update']);

const phoneNumber = ref('');
const code = ref('');
const isCodeValid = ref(false);

// 타이머 관련
const INITIAL_TIME = 300;
const time = ref(0);
const showTimer = ref(false);
let timer = null;

const formattedTime = computed(() => {
  const minutes = String(Math.floor(time.value / 60)).padStart(1, '0');
  const seconds = String(time.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  // 기존 타이머 정리
  if (timer) clearInterval(timer);
  time.value = INITIAL_TIME;
  showTimer.value = true;

  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

const handleComplete = () => {
  emit('update', {
    phoneNumber: phoneNumber.value,
  });
  emit('next');
};

const handleSendCode = async () => {
  const result = await sendCode({
    phoneNumber: phoneNumber.value,
  });

  if (result.status === 204) {
    isCodeValid.value = false;
    startTimer();
  }
};

const handleVerifyCode = async () => {
  const result = await verifyCode({
    phoneNumber: phoneNumber.value,
    code: Number(code.value),
  });

  if (result.status === 204) {
    isCodeValid.value = true;
  }

  isCodeValid.value = true;
};

const isValid = computed(
  () => phoneNumber.value.length == 11 && isCodeValid.value,
);

onMounted(() => {
  timer = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
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
      <div class="flex flex-col">
        <div class="flex items-end gap-2">
          <TitleInput title="인증 번호" v-model="code" />
          <SmMainButton class="shrink-0" @click="handleVerifyCode"
            >인증번호 확인</SmMainButton
          >
        </div>
        <div class="h-5 mt-1">
          <Caption1 v-if="showTimer" class="text-dol-error"
            >인증시간 {{ formattedTime }} 남음</Caption1
          >
        </div>
      </div>
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">완료</LgMainButton>
</template>
