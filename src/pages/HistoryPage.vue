<script setup>
import { ref } from 'vue';
import { transactions } from '@/entities/transaction/transaction.mock';
import HistoryFilter from '@/features/transaction/history/ui/HistoryFilter.vue';
import HistoryList from '@/features/transaction/history/ui/HistoryList.vue';

const showFilterModal = ref(false);
const filterTab = ref('1개월');
const categoryTab = ref('전체');
const sortTab = ref('최신순');
const minAmount = ref('');
const maxAmount = ref('');

const filteredHistories = ref([...transactions.value]);

const updateFilteredProducts = (data) => {
  filteredHistories.value = data;
};
</script>

<template>
  <div class="flex flex-col w-full min-h-screen bg-white">
    <HistoryFilter
      :filterTab="filterTab"
      :categoryTab="categoryTab"
      :sortTab="sortTab"
      :minAmount="minAmount"
      :maxAmount="maxAmount"
      :showFilterModal="showFilterModal"
      :transactions="transactions"
      @updateFilterTab="(val) => (filterTab = val)"
      @updateCategoryTab="(val) => (categoryTab = val)"
      @updateSortTab="(val) => (sortTab = val)"
      @updateMinAmount="(val) => (minAmount = val)"
      @updateMaxAmount="(val) => (maxAmount = val)"
      @updateShowFilterModal="(val) => (showFilterModal = val)"
      @updateFilteredProducts="updateFilteredProducts"
    />

    <HistoryList :transactions="filteredHistories" />
  </div>
</template>
