<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import { verifyCode } from '../services/account.service';

const emit = defineEmits(['complete']);
const props = defineProps({
  authCode: {
    type: String,
    default: '',
  },
});

const password = ref('');
const passwordCheck = ref('');
const isModalOpen = ref(false);
const isCheckModalOpen = ref(false);
const showError = ref(false);
const inputAuthCode = ref(props.authCode);

const time = ref(300);
let timer;

const formattedTime = computed(() => {
  const minutes = String(Math.floor(time.value / 60)).padStart(1, '0');
  const seconds = String(time.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});

const handleComplete = async () => {
  const result = await verifyCode({
    authCode: Number(inputAuthCode.value),
  });

  if (result.status === 204) {
    isModalOpen.value = true;
  }
};

const handlePwComplete = (pw) => {
  password.value = pw;
  isModalOpen.value = false;
  isCheckModalOpen.value = true;
};

const handlePwCheckComplete = (pw) => {
  passwordCheck.value = pw;

  if (password.value === passwordCheck.value) {
    isCheckModalOpen.value = false;
    emit('complete', password.value);
  } else {
    showError.value = true;
  }
};

const isValid = computed(
  () => time.value !== 0 && inputAuthCode.value.length === 4,
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
  <div class="flex flex-col h-full">
    <div
      class="w-full h-[25vh] flex flex-col items-center justify-center gap-[5px]"
    >
      <Subtitle1>입금자명을 확인해주세요</Subtitle1>
      <Caption1>계좌로 입금된 1원의 입금자명을 입력해주세요.</Caption1>
    </div>
    <div class="flex flex-col flex-1 justify-between">
      <div class="w-full flex flex-col items-end gap-1">
        <div class="w-full flex flex-col gap-[10px]">
          <Subtitle2>입금자명</Subtitle2>
          <BoxInput v-model="inputAuthCode" />
        </div>
        <Caption1 class="text-dol-error"
          >인증시간 {{ formattedTime }} 남음</Caption1
        >
      </div>
      <div class="flex flex-col gap-1 w-full items-center">
        <Caption1 class="underline text-dol-dark-gray"
          >데모버전에서는 1원 인증 기능을 제공하지 않습니다.</Caption1
        >
        <LgMainButton :disabled="!isValid" @click="handleComplete"
          >완료</LgMainButton
        >
      </div>
    </div>
  </div>
  <PwModal
    v-if="isModalOpen"
    title="전자지갑 비밀번호 설정"
    @complete="handlePwComplete"
    @close="() => (isModalOpen = false)"
  />
  <PwModal
    v-if="isCheckModalOpen"
    title="비밀번호 확인"
    errorMessage="비밀번호가 일치하지 않습니다."
    :showError="showError"
    @input="showError = false"
    @complete="handlePwCheckComplete"
    @close="
      () => {
        isCheckModalOpen = false;
        showError = false;
      }
    "
  />
</template>
