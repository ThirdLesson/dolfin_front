<script setup>
import { ref, watch } from 'vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { addAccount } from '../services/account.service';
import { accountBankOptions } from '@/shared/constants/options';

const emit = defineEmits(['next']);

const bankId = ref('');
const bankPassword = ref('');
const accountNumber = ref('');
const bankType = ref(accountBankOptions[0].value);
const showError = ref(false);
const errorMsg = ref('');

const handleNext = async () => {
  const result = await addAccount({
    accountNumber: accountNumber.value,
    bankId: bankId.value,
    bankPassword: bankPassword.value,
    bankType: bankType.value,
  });

  if (!result.data) {
    errorMsg.value = result.message;
    showError.value = true;
    return;
  }

  const authCode = result.data.authCode;
  emit('next', {
    accountNumber: accountNumber.value,
    bankType: bankType.value,
    authCode,
  });
};

watch([bankId, bankPassword], () => {
  if (showError.value) {
    showError.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-[25vh] flex flex-col items-center justify-center gap-[5px]"
    >
      <Subtitle1>계좌를 등록해주세요.</Subtitle1>
      <Caption1>안전한 1원 인증으로 계좌를 확인합니다.</Caption1>
    </div>
    <div class="flex flex-1 flex-col justify-between">
      <div class="w-full flex flex-col gap-[15px]">
        <Dropdown
          title="은행 선택"
          :options="accountBankOptions"
          v-model="bankType"
        />
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>계좌번호</Subtitle2>
          <BoxInput v-model="accountNumber" />
        </div>
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>은행 계정 아이디</Subtitle2>
          <BoxInput v-model="bankId" />
        </div>
        <div class="flex flex-col gap-[10px]">
          <Subtitle2>은행 계정 비밀번호</Subtitle2>
          <BoxInput v-model="bankPassword" type="password" />
        </div>
      </div>
      <div class="flex flex-col items-center gap-1">
        <Caption1 v-if="showError" class="text-dol-error">{{
          errorMsg
        }}</Caption1>
        <LgMainButton @click="handleNext">다음</LgMainButton>
      </div>
    </div>
  </div>
</template>
