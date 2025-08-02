<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import { Icons } from '@/asset/images';
import ChargeDisplay from '@/features/transaction/charge/ui/ChargeDisplay.vue';
import ChargeAccount from '@/features/transaction/charge/ui/ChargeAccount.vue';
import QuickAddButtons from '@/features/transaction/remit/ui/QuickAddButtons.vue';
import AmountKeypad from '@/features/transaction/remit/ui/AmountKeypad.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import AccountModal from '@/features/transaction/charge/ui/AccountModal.vue';
import { getMyAccounts } from '@/features/transaction/remit/services/remit.service';
import { chargeWallet } from '@/features/transaction/charge/services/charge.service';

const router = useRouter();

const selectedAccount = reactive({
  bankType: '',
  accountNumber: '',
});
const amount = ref(0);
const accounts = ref([]);
const minError = ref(false);
const showAccountModal = ref(false);
const showPwModal = ref(false);
const showError = ref(false);
const errorMessage = ref('비밀번호가 올바르지 않습니다.');
const isComplete = ref(false);

const handleComplete = () => {
  minError.value = amount.value < 10000;

  if (!minError.value) {
    showPwModal.value = true;
  }
};

const handleSelect = (num) => {
  const newVal = parseInt(`${amount.value}${num}`, 10);
  amount.value = isNaN(newVal) ? 0 : newVal;
};

const handleDelete = () => {
  const str = amount.value.toString();
  amount.value = str.length > 1 ? parseInt(str.slice(0, -1), 10) : 0;
};

const handleSelectAccount = (account) => {
  selectedAccount.bankType = account.bankType;
  selectedAccount.accountNumber = account.accountNumber;
  showAccountModal.value = false;
};

const handlePwComplete = async (pw) => {
  const result = await chargeWallet({
    amount: amount.value,
    accountNumber: selectedAccount.accountNumber,
    walletPassword: Number(pw),
  });

  if (result.status) {
    showPwModal.value = false;
    isComplete.value = true;
  } else {
    showError.value = true;
    errorMessage.value = result.message;
  }
};

const fetchMyAccounts = async () => {
  const result = await getMyAccounts();
  if (result.status === 200) {
    accounts.value = result.data;
    selectedAccount.bankType = accounts.value[0].bankType;
    selectedAccount.accountNumber = accounts.value[0].accountNumber;
  }
};

watch(amount, () => {
  if (minError.value) {
    minError.value = false;
  }
});

onMounted(() => {
  fetchMyAccounts();
});
</script>

<template>
  <div v-if="isComplete" class="flex flex-col justify-between h-full">
    <div
      class="flex flex-col h-[60vh] w-full items-center justify-center gap-6"
    >
      <img :src="Icons.check" alt="complete" />
      <div class="flex flex-col items-center justify-center">
        <Head1> {{ amount.toLocaleString() }} P </Head1>
        <Head2 class="text-dol-dark-gray">충전 완료</Head2>
      </div>
    </div>
    <LgMainButton @click="router.push(URL.PAGE.MAIN)">확인</LgMainButton>
  </div>

  <div v-else class="flex flex-col w-full h-full">
    <ChargeDisplay :amount="amount" :minError="minError" />
    <ChargeAccount
      :bankType="selectedAccount.bankType"
      :accountNumber="selectedAccount.accountNumber"
      @click="() => (showAccountModal = true)"
    />
    <QuickAddButtons @quickAdd="(value) => (amount += value)" />
    <AmountKeypad @select="handleSelect" @delete="handleDelete" />
    <LgMainButton @click="handleComplete">완료</LgMainButton>
    <AccountModal
      :showModal="showAccountModal"
      :accounts="accounts"
      @select="handleSelectAccount"
      @close="() => (showAccountModal = false)"
    />
    <PwModal
      v-if="showPwModal"
      :showError="showError"
      :errorMessage="errorMessage"
      @complete="handlePwComplete"
      @close="
        () => {
          showPwModal = false;
          showError = false;
        }
      "
      @input="showError = false"
    />
  </div>
</template>
