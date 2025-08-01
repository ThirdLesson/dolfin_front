<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { checkTelName } from '../services/remit.service';
import { useTransStore } from '@/entities/transaction/transaction.store';

const router = useRouter();
const store = useTransStore();

const phoneNumber = ref('');
const showError = ref(false);
const errorMsg = ref('');

const handleNext = async () => {
  const result = await checkTelName({
    phoneNumber: phoneNumber.value,
  });

  if (result?.data) {
    store.setTransInfo({
      ...store.transInfo,
      phoneNumber: phoneNumber.value,
      name: result.data.name,
    });

    router.push({
      path: URL.PAGE.REMIT_AMOUNT,
      query: { type: 'tel' },
    });
  } else {
    showError.value = true;
    errorMsg.value = result.message;
  }
};

watch([phoneNumber], () => {
  if (showError.value) {
    showError.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-[15px]">
      <Subtitle2>전화번호</Subtitle2>
      <BoxInput placeholder="전화번호를 입력하세요." v-model="phoneNumber" />
    </div>
    <div class="flex flex-col items-center">
      <Caption1
        class="text-dol-error transition-opacity duration-200"
        :class="!showError && 'opacity-0'"
      >
        {{ errorMsg }}
      </Caption1>
      <LgMainButton @click="handleNext">완료</LgMainButton>
    </div>
  </div>
</template>
