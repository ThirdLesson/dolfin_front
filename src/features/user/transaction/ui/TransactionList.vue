<script setup>
import { computed, ref } from 'vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

const currentPage = ref(1);
const itemsPerPage = 20;

const totalPages = computed(() =>
  Math.ceil(props.transactions.length / itemsPerPage),
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return props.transactions.slice(start, start + itemsPerPage);
});

const groupedTransactions = computed(() => {
  return paginatedTransactions.value.reduce((groups, item) => {
    (groups[item.date] ||= []).push(item);
    return groups;
  }, {});
});

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
  }
};

const typeColor = (type) =>
  type === '출금' ? 'text-dol-error' : 'text-dol-main';

const isActivePage = (page) =>
  page === currentPage.value
    ? 'bg-dol-sub text-white'
    : 'bg-gray-100 text-dol-light-gray';
</script>

<template>
  <div class="flex flex-col">
    <div v-for="(items, date) in groupedTransactions" :key="date" class="pb-2">
      <div class="px-4 pt-[35px] pb-[10px] border-b border-dol-dark-gray">
        <Subtitle3 class="text-dol-dark-gray">{{ date }}</Subtitle3>
      </div>

      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="flex justify-between px-4 py-[20px] border-b border-[#D9D9D9]"
      >
        <div class="flex flex-col">
          <Caption1 class="text-dol-light-gray">{{ item.time }}</Caption1>
          <Head3 class="font-semibold">{{ item.name }}</Head3>
        </div>
        <div class="flex flex-col text-right items-end gap-1">
          <Caption1 :class="typeColor(item.type)">{{ item.type }}</Caption1>
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
        이전
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
        다음
      </SmMainButton>
    </div>
  </div>
</template>
