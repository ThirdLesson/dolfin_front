<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import { sendCode, verifyCode } from '../services/signUp.service';

const { t } = useI18n({ useScope: 'global' });
const emit = defineEmits(['next', 'update']);

const phoneNumber = ref('');
const code = ref('');
const isCodeValid = ref(false);

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
  if (timer) clearInterval(timer);
  time.value = INITIAL_TIME;
  showTimer.value = true;
  timer = setInterval(() => {
    if (time.value > 0) time.value--;
    else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

const handleComplete = () => {
  emit('update', { phoneNumber: phoneNumber.value });
  emit('next');
};

const handleSendCode = async () => {
  const result = await sendCode({ phoneNumber: phoneNumber.value });
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
  if (result.status === 204) isCodeValid.value = true;
};

const isValid = computed(
  () => phoneNumber.value.length == 11 && isCodeValid.value,
);

onMounted(() => {
  timer = setInterval(() => {
    if (time.value > 0) time.value--;
    else clearInterval(timer);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2
      >{{ t('signup.step2.title1') }}<br />{{ t('signup.step2.title2') }}</Head2
    >
    <div class="flex flex-col gap-[40px]">
      <div class="flex items-end gap-2">
        <TitleInput
          :title="t('signup.step2.phoneNumber')"
          v-model="phoneNumber"
        />
        <SmMainButton class="shrink-0" @click="handleSendCode">
          {{ t('signup.step2.sendCode') }}
        </SmMainButton>
      </div>
      <div class="flex flex-col">
        <div class="flex items-end gap-2">
          <TitleInput :title="t('signup.step2.code')" v-model="code" />
          <SmMainButton class="shrink-0" @click="handleVerifyCode">
            {{ t('signup.step2.verifyCode') }}
          </SmMainButton>
        </div>
        <div class="h-5 mt-1">
          <Caption1 v-if="showTimer" class="text-dol-error">
            {{ t('signup.step2.timeLeft', { time: formattedTime }) }}
          </Caption1>
        </div>
      </div>
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">{{
    t('common.complete')
  }}</LgMainButton>
</template>
