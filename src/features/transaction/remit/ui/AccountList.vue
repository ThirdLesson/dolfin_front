<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';
import { formatAccountNumber } from '@/shared/utils/format';
import { getMyAccounts, getRecentAccounts } from '../services/remit.service';
import { useTransStore } from '@/entities/transaction/transaction.store';
import { useUserStore } from '@/entities/user/user.store';

const router = useRouter();
const transStore = useTransStore();
const userStore = useUserStore();

const myAccounts = ref([]);
const recentAccounts = ref([]);

const handleSelectAccount = (item) => {
  transStore.setTransInfo({
    ...transStore.transInfo,
    accountNumber: item.accountNumber,
    bankType: item.bankType,
    name: item.name || userStore.userInfo.name,
  });

  router.push({
    path: URL.PAGE.REMIT_AMOUNT,
    query: { type: 'account' },
  });
};

const fetchMyAccounts = async () => {
  const result = await getMyAccounts();

  if (result.data) {
    myAccounts.value = result.data;
  }
};

const fetchRecentAccounts = async () => {
  const result = await getRecentAccounts();

  if (result.data) {
    recentAccounts.value = result.data;
  }
};

onMounted(() => {
  fetchMyAccounts();
  fetchRecentAccounts();
});
</script>

<template>
  <div class="flex flex-col gap-[15px]">
    <Subtitle2>내 계좌</Subtitle2>
    <DoubleCard
      v-for="(item, index) in myAccounts"
      :key="index"
      :title="item.bankType"
      :image="Banks[bankNameMap[item.bankType]]"
      @click="handleSelectAccount(item)"
    >
      <Subtitle2>{{ formatAccountNumber(item.accountNumber) }}</Subtitle2>
    </DoubleCard>
  </div>
  <div class="flex flex-col gap-[15px]">
    <Subtitle2>최근 거래 목록</Subtitle2>
    <DoubleCard
      v-for="(item, index) in recentAccounts"
      :key="index"
      :title="item.name"
      :subtitle="item.bankType"
      :image="Banks[bankNameMap[item.bankType]]"
      @click="handleSelectAccount(item)"
    >
      <Subtitle2>{{ formatAccountNumber(item.accountNumber) }}</Subtitle2>
    </DoubleCard>
  </div>
</template>
