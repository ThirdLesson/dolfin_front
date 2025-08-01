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

const options = [
  { label: '신협은행', value: '신협은행' },
  { label: '우체국예금', value: '우체국예금' },
  { label: '전북은행', value: '전북은행' },
  { label: '새마을금고', value: '새마을금고' },
  { label: '제일은행', value: '제일은행' },
  { label: '국민은행', value: '국민은행' },
  { label: '우리은행', value: '우리은행' },
  { label: '하나은행', value: '하나은행' },
  { label: '산업은행', value: '산업은행' },
  { label: '토스뱅크', value: '토스뱅크' },
  { label: '부산은행', value: '부산은행' },
  { label: '광주은행', value: '광주은행' },
  { label: '아이엠뱅크', value: '아이엠뱅크' },
  { label: '신한은행', value: '신한은행' },
  { label: '농협', value: '농협' },
  { label: '카카오뱅크', value: '카카오뱅크' },
  { label: '케이뱅크', value: '케이뱅크' },
  { label: '씨티은행', value: '씨티은행' },
  { label: '수협은행', value: '수협은행' },
  { label: '기업은행', value: '기업은행' },
  { label: '대구은행', value: '대구은행' },
];

const router = useRouter();
const store = useTransStore();

const accountNumber = ref(null);
const bankType = ref(options[0].value);
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
      <Dropdown title="은행 선택" :options="options" v-model="bankType" />
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
