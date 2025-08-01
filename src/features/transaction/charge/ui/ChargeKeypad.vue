<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/user.store';
import { chargeWallet } from '../services/charge.service';
import { getLinkedAccounts } from '@/features/user/account/services/account.service';
import { Icons } from '@/asset/images';

import Keypad from '@/shared/components/atoms/Keypad.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import ChargeModal from './ChargeModal.vue';
import URL from '@/shared/constants/URL';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';

const router = useRouter();
const userStore = useUserStore();
const walletId = computed(() => userStore.userInfo.walletId);
const pwError = ref(false);
const minAmountError = ref(false);

const accounts = ref([]);
const selectedAccount = reactive({
  bankType: '',
  accountNumber: '',
});

const fetchMyAccounts = async () => {
  if (!walletId.value) return;

  const res = await getLinkedAccounts(walletId.value);
  if (res.status === 200 && res.data?.length) {
    accounts.value = res.data;
    selectedAccount.bankType = accounts.value[0].bankType;
    selectedAccount.accountNumber = accounts.value[0].accountNumber;
  }
};

onMounted(() => {
  fetchMyAccounts();
});

const amount = ref(0);

const quickTabs = [
  { label: '+1천', value: 1000 },
  { label: '+5천', value: 5000 },
  { label: '+1만', value: 10000 },
  { label: '+10만', value: 100000 },
];

const showModal = ref(false);
const showPwModal = ref(false);
const showComplete = ref(false);

const handleQuickAdd = (value) => {
  amount.value += value;
};

const handleSelect = (num) => {
  const newVal = parseInt(`${amount.value}${num}`, 10);
  amount.value = isNaN(newVal) ? 0 : newVal;
};

const handleDelete = () => {
  const str = amount.value.toString();
  amount.value = str.length > 1 ? parseInt(str.slice(0, -1), 10) : 0;
};

const handleSubmit = () => {
  minAmountError.value = amount.value < 10000;
  if (!minAmountError.value) {
    showPwModal.value = true;
  }
};

const handlePasswordComplete = async (walletPassword) => {
  pwError.value = false;
  if (!walletId.value) {
    pwError.value = true;
    return;
  }

  try {
    const res = await chargeWallet({
      walletId: walletId.value,
      amount: amount.value,
      accountNumber: selectedAccount.accountNumber,
      walletPassword: walletPassword.toString(),
    });

    if (res?.status === 204 || res?.message === 'NO_CONTENT') {
      showPwModal.value = false;
      showComplete.value = true;
      if (res.data?.newBalance !== undefined) {
        userStore.setWalletBalance(res.data.newBalance);
      }
    } else if (res?.code === 'W-004') {
      pwError.value = true;
    } else {
      alert('충전에 실패했습니다. 다시 시도해주세요.');
    }
  } catch {
    pwError.value = true;
  }
};

const handleConfirm = () => {
  router.push(URL.PAGE.MAIN);
};

const handleSelectAccount = (account) => {
  selectedAccount.bankType = account.bankType;
  selectedAccount.accountNumber = account.accountNumber;
  showModal.value = false;
};
</script>

<template>
  <div
    v-if="showComplete"
    class="flex flex-col justify-between items-center h-full pt-16"
  >
    <div class="flex flex-col items-center gap-3">
      <img :src="Icons.check" alt="check" class="w-[64px] h-[64px]" />
      <Head1> {{ amount.toLocaleString() }} P </Head1>
      <Head2 class="text-dol-dark-gray">충전 완료</Head2>
    </div>

    <LgMainButton class="w-full" @click="handleConfirm">확인</LgMainButton>
  </div>

  <div v-else class="flex flex-col h-full px-6 pb-6 pt-4 gap-4 justify-between">
    <div class="flex flex-col gap-6">
      <Subtitle1 class="text-left">얼마를 충전할까요?</Subtitle1>

      <div class="flex flex-col gap-2 text-center pt-[80px]">
        <Subtitle2 class="text-dol-dark-gray">충전 금액</Subtitle2>
        <Head1>{{ amount.toLocaleString() }} 원</Head1>
        <Caption2 v-if="minAmountError" class="text-dol-error">
          최소 충전 금액은 10,000원부터 입니다.
        </Caption2>
      </div>

      <div
        class="flex cursor-pointer justify-end pt-[80px]"
        @click="showModal = true"
      >
        <P1 class="text-dol-dark-gray">
          충전 계좌: {{ selectedAccount.bankType }}
          {{ selectedAccount.accountNumber }}
        </P1>
        <i class="bi bi-caret-down-fill ml-1"></i>
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
    </div>

    <div class="flex-1 overflow-auto flex flex-col justify-center pb-6">
      <Keypad
        :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
        :showDoubleZero="true"
        :heightFull="false"
        class="gap-[50px]"
        @select="handleSelect"
        @delete="handleDelete"
      />
    </div>

    <div class="w-full">
      <LgMainButton class="w-full h-14 text-base" @click="handleSubmit">
        완료
      </LgMainButton>
    </div>
  </div>

  <ChargeModal
    :showModal="showModal"
    :accounts="accounts"
    :showPwModal="showPwModal"
    :showError="pwError"
    @selectAccount="handleSelectAccount"
    @closeModal="showModal = false"
    @closePwModal="showPwModal = false"
    @passwordComplete="handlePasswordComplete"
  />
</template>
