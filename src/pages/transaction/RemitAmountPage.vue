<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Keypad from '@/shared/components/atoms/Keypad.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import URL from '@/shared/constants/URL';
import { useTransStore } from '@/entities/transaction/transaction.store';
import { getWalletInfo } from '@/features/user/account/services/account.service';
import {
  transferByTel,
  transferByAccount,
} from '@/features/transaction/remit/services/remit.service';

const store = useTransStore();
const route = useRoute();
const router = useRouter();

const type = route.query.type;

const quickTabs = [
  { label: '+1천', value: 1000 },
  { label: '+5천', value: 5000 },
  { label: '+1만', value: 10000 },
  { label: '+10만', value: 100000 },
];

const amount = ref(0);
const password = ref('');
const accountBalance = ref(null);
const showError = ref(false);
const errorMessage = ref('비밀번호가 올바르지 않습니다.');
const isModalOpen = ref(false);

const handleSelect = (num) => {
  const newVal = parseInt(`${amount.value}${num}`, 10);
  amount.value = isNaN(newVal) ? 0 : newVal;
};

const handlePwComplete = (pw) => {
  password.value = pw;
  handleTransfer();
};

const handleQuickAdd = (value) => {
  amount.value += value;
};

const handleDelete = () => {
  const str = amount.value.toString();
  amount.value = str.length > 1 ? parseInt(str.slice(0, -1), 10) : 0;
};

const handleTransfer = async () => {
  let result;

  if (type === 'account') {
    result = await transferByAccount({
      amount: Number(amount.value),
      password: Number(password.value),
      accountNumber: store.transInfo.accountNumber,
      bankType: store.transInfo.bankType,
      name: store.transInfo.name,
    });
  } else if (type === 'tel') {
    result = await transferByTel({
      amount: Number(amount.value),
      password: Number(password.value),
      phoneNumber: store.transInfo.phoneNumber,
    });
  }

  if (result?.status) {
    store.setTransInfo({
      ...store.transInfo,
      amount: amount.value,
    });

    router.push(URL.PAGE.REMIT_COMPLETE);
  } else {
    showError.value = true;
    errorMessage.value = result.message;
  }
};

const fetchBalanceInfo = async () => {
  const result = await getWalletInfo();

  if (result.data) {
    accountBalance.value = result.data.balance;
  }
};

onMounted(() => {
  fetchBalanceInfo();
});
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex flex-col">
      <Subtitle2 class="text-dol-dark-gray"
        >{{ store.transInfo.name }} 님께</Subtitle2
      >
      <Subtitle1>얼마를 보낼까요?</Subtitle1>
    </div>
    <div class="flex flex-col items-center justify-center h-[30vh]">
      <Head1>{{ Number(amount).toLocaleString() }} P</Head1>
      <Subtitle2 class="text-dol-dark-gray"
        >현재 잔액: {{ accountBalance?.toLocaleString() }} P</Subtitle2
      >
    </div>

    <div class="flex gap-2 justify-between w-full">
      <button
        v-for="tab in quickTabs"
        :key="tab.value"
        class="flex-1 h-10 rounded-sm border border-dol-main bg-white text-dol-main text-sm font-medium leading-none"
        @click="handleQuickAdd(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="flex-1 overflow-auto flex flex-col justify-center p-3">
      <Keypad
        :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
        :showDoubleZero="true"
        :heightFull="false"
        class="gap-[40px]"
        @select="handleSelect"
        @delete="handleDelete"
      />
    </div>

    <div>
      <LgMainButton @click="() => (isModalOpen = true)">완료</LgMainButton>
    </div>
    <PwModal
      v-if="isModalOpen"
      title="전자지갑 비밀번호"
      :errorMessage="errorMessage"
      :showError="showError"
      @input="showError = false"
      @complete="handlePwComplete"
      @close="
        () => {
          isModalOpen = false;
          showError = false;
        }
      "
    />
  </div>
</template>
