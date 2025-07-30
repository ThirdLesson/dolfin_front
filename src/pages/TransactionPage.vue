<script setup>
import { ref } from 'vue';
import { transactions } from '@/entities/trasnsaction/transaction.mock';
import TransactionFilter from '@/features/user/transaction/ui/TransactionFilter.vue';
import TransactionList from '@/features/user/transaction/ui/TransactionList.vue';

const showFilterModal = ref(false);
const filterTab = ref('1개월');
const categoryTab = ref('전체');
const sortTab = ref('최신순');
const minAmount = ref('');
const maxAmount = ref('');

const filteredTransactions = ref([...transactions.value]);

const updateFilteredProducts = (data) => {
  filteredTransactions.value = data;
};
</script>

<template>
  <div class="flex flex-col w-full min-h-screen bg-white">
    <TransactionFilter
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

    <TransactionList :transactions="filteredTransactions" />
  </div>
</template>
