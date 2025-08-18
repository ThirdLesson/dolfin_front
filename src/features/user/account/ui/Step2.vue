<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import { verifyAccount } from '../services/account.service';
import { useUserStore } from '@/entities/user/user.store';

const { t } = useI18n();

const emit = defineEmits(['complete']);
const props = defineProps({
  authCode: {
    type: String,
    default: '',
  },
});

const userStore = useUserStore();

const password = ref('');
const passwordCheck = ref('');
const isModalOpen = ref(false);
const isCheckModalOpen = ref(false);
const showError = ref(false);
const inputAuthCode = ref(props.authCode);

const time = ref(300);
let timer;

const hasWallet = computed(() => !!userStore.userInfo.walletId);

const formattedTime = computed(() => {
  const minutes = String(Math.floor(time.value / 60)).padStart(1, '0');
  const seconds = String(time.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});

const handleComplete = async () => {
  const result = await verifyAccount({
    authCode: inputAuthCode.value,
  });

  if (result.status !== 204) return;

  if (hasWallet.value) {
    emit('complete', null);
    return;
  }
  isModalOpen.value = true;
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
      <Subtitle1>{{ t('account.verify.title') }}</Subtitle1>
      <Caption1>{{ t('account.verify.caption') }}</Caption1>
    </div>

    <div class="flex flex-col flex-1 justify-between">
      <div class="w-full flex flex-col items-end gap-1">
        <BoxInput
          :title="t('account.verify.depositor')"
          v-model="inputAuthCode"
        />
        <Caption1 class="text-dol-error">
          {{ t('account.verify.timer', { time: formattedTime }) }}
        </Caption1>
      </div>

      <div class="flex flex-col gap-1 w-full items-center">
        <Caption1 class="underline text-dol-dark-gray">
          {{ t('account.verify.demoNotice') }}
        </Caption1>
        <LgMainButton :disabled="!isValid" @click="handleComplete">
          {{ t('common.complete') }}
        </LgMainButton>
      </div>
    </div>
  </div>

  <PwModal
    v-if="isModalOpen"
    :title="t('account.verify.walletPwSetTitle')"
    @complete="handlePwComplete"
    @close="() => (isModalOpen = false)"
  />
  <PwModal
    v-if="isCheckModalOpen"
    :title="t('account.verify.walletPwConfirmTitle')"
    :errorMessage="t('account.verify.walletPwMismatch')"
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
