<script setup>
import { ref } from 'vue';
import HistoryFilter from '@/features/transaction/history/ui/HistoryFilter.vue';
import HistoryList from '@/features/transaction/history/ui/HistoryList.vue';

const showFilterModal = ref(false);

const period = ref('ONE_MONTH');
const type = ref(undefined);
const sortDirection = ref('LATEST');
const minAmount = ref(undefined);
const maxAmount = ref(undefined);

const updateFilter = ({ newPeriod, newType, newSort, newMin, newMax }) => {
  period.value = newPeriod;
  type.value = newType;
  sortDirection.value = newSort;
  minAmount.value = newMin;
  maxAmount.value = newMax;
  showFilterModal.value = false;
};
</script>

<template>
  <div class="flex flex-col">
    <HistoryFilter
      :showFilterModal="showFilterModal"
      @updateShowFilterModal="(val) => (showFilterModal = val)"
      @updateFilter="updateFilter"
    />

    <HistoryList
      :period="period"
      :type="type"
      :sortDirection="sortDirection"
      :minAmount="minAmount"
      :maxAmount="maxAmount"
    />
  </div>
</template>
