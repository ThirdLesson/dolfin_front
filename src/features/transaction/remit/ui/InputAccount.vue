<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { checkAccountName } from '../services/remit.service';
import { useTransStore } from '@/entities/transaction/transaction.store';
import { transferBankOptions } from '@/shared/constants/options';

const router = useRouter();
const store = useTransStore();

const accountNumber = ref(null);
const bankType = ref(transferBankOptions[0].value);
const showError = ref(false);
const errorMsg = ref('');

const handleNext = async () => {
  const result = await checkAccountName({
    accountNumber: accountNumber.value,
    bankType: bankType.value,
  });

  if (result?.status) {
    store.setTransInfo({
      accountNumber: Number(accountNumber.value),
      bankType: bankType.value,
      name: result.data.name,
    });

    router.push({
      path: URL.PAGE.REMIT_AMOUNT,
      query: { type: 'account' },
    });
  } else {
    showError.value = true;
    errorMsg.value = result.message;
  }
};

watch([accountNumber], () => {
  if (showError.value) {
    showError.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-[15px]">
      <div class="flex flex-col gap-[15px]">
        <Subtitle2>계좌번호</Subtitle2>
        <BoxInput
          placeholder="계좌번호를 입력하세요."
          v-model="accountNumber"
        />
      </div>
      <Dropdown
        title="은행 선택"
        :options="transferBankOptions"
        v-model="bankType"
      />
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
