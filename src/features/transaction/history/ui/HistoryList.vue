<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { getTransactions } from '../services/history.service';

const { t } = useI18n();

const props = defineProps({
  period: { type: String, default: 'ONE_MONTH' },
  type: String,
  sortDirection: { type: String, default: 'LATEST' },
  minAmount: Number,
  maxAmount: Number,
});

const transactionGroups = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 20;

const getDisplayName = (item) => {
  if (item.type === 'DEPOSIT' || item.type === 'WITHDRAW') {
    return (
      item.counterPartyName || t(`history.label.${item.type.toLowerCase()}`)
    );
  }
  if (item.type === 'CHARGE') return t('history.label.charge');
};

const getUiType = (type) => {
  switch (type) {
    case 'WITHDRAW':
      return t('history.label.withdraw');
    case 'DEPOSIT':
      return t('history.label.deposit');
    case 'CHARGE':
      return t('history.label.charge');
    default:
      return '';
  }
};

const getTime = (createdAt) => {
  if (!createdAt) return '';
  return createdAt.includes(' ') ? createdAt.split(' ')[1] : createdAt;
};

const fetchTransactions = async () => {
  const res = await getTransactions({
    page: currentPage.value - 1,
    size: pageSize,
    period: props.period,
    type: props.type,
    sortDirection: props.sortDirection,
    minAmount: props.minAmount,
    maxAmount: props.maxAmount,
  });

  totalPages.value = res.data?.totalPages || 0;
  transactionGroups.value = res.data?.content || [];
};

const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const groupSize = 5;
  const startPage = Math.floor((current - 1) / groupSize) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, total);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchTransactions();
  }
};

watch(
  () => [
    props.period,
    props.type,
    props.sortDirection,
    props.minAmount,
    props.maxAmount,
  ],
  () => {
    currentPage.value = 1;
    fetchTransactions();
  },
);

onMounted(fetchTransactions);

const typeColor = (rawType) =>
  rawType === 'WITHDRAW' ? 'text-dol-error' : 'text-dol-main';

const isActivePage = (page) =>
  page === currentPage.value
    ? 'bg-dol-sub text-white'
    : 'bg-gray-100 text-dol-light-gray';
</script>

<template>
  <div v-if="transactionGroups.length > 0" class="flex flex-col select-none">
    <div v-for="group in transactionGroups" :key="group.date" class="pb-2">
      <div class="px-4 pt-[35px] pb-[10px] border-b border-dol-dark-gray">
        <Subtitle3 class="text-dol-dark-gray">{{ group.date }}</Subtitle3>
      </div>

      <div
        v-for="item in group.transactions"
        :key="item.createdAt"
        class="flex justify-between px-4 py-[20px] border-b border-[#D9D9D9]"
      >
        <div class="flex flex-col">
          <Caption1 class="text-dol-light-gray">{{
            getTime(item.createdAt)
          }}</Caption1>
          <Head3>{{ getDisplayName(item) }}</Head3>
        </div>
        <div class="flex flex-col text-right items-end gap-1">
          <Caption1 :class="typeColor(item.type)">{{
            getUiType(item.type)
          }}</Caption1>
          <Head3 :class="typeColor(item.type)">
            {{ item.amount.toLocaleString() }} P
          </Head3>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-2 py-4">
      <SmMainButton
        v-if="currentPage > 5"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        {{ t('common.prev') }}
      </SmMainButton>

      <P1
        v-for="page in pageNumbers"
        :key="page"
        class="px-3 py-1 cursor-pointer"
        :class="isActivePage(page)"
        @click="goToPage(page)"
      >
        {{ page }}
      </P1>

      <SmMainButton
        v-if="totalPages > 5"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        {{ t('common.next') }}
      </SmMainButton>
    </div>
  </div>
  <P1 v-else class="text-dol-dark-gray pt-[10px] text-center">
    {{ t('history.label.exists') }}</P1
  >
</template>
