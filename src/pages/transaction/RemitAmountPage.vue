<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AmountDisplay from '@/features/transaction/remit/ui/AmountDisplay.vue';
import QuickAddButtons from '@/features/transaction/remit/ui/QuickAddButtons.vue';
import AmountKeypad from '@/features/transaction/remit/ui/AmountKeypad.vue';
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
const router = useRouter();
const route = useRoute();

const type = route.query.type;

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

const handleDelete = () => {
  const str = amount.value.toString();
  amount.value = str.length > 1 ? parseInt(str.slice(0, -1), 10) : 0;
};

const handlePwComplete = (pw) => {
  password.value = pw;
  handleTransfer();
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
  <div class="flex flex-col w-full h-full">
    <AmountDisplay
      :amount="amount"
      :balance="accountBalance"
      :recipient="store.transInfo.name"
    />
    <QuickAddButtons @quickAdd="(value) => (amount += value)" />
    <AmountKeypad @select="handleSelect" @delete="handleDelete" />
    <LgMainButton @click="() => (isModalOpen = true)">완료</LgMainButton>
    <PwModal
      v-if="isModalOpen"
      :showError="showError"
      :errorMessage="errorMessage"
      @complete="handlePwComplete"
      @close="
        () => {
          isModalOpen = false;
          showError = false;
        }
      "
      @input="showError = false"
    />
  </div>
</template>
