<script setup>
import { computed, ref } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';

const props = defineProps({
  showFilterModal: Boolean,
  transactions: Array,
});
const emit = defineEmits([
  'updateFilterTab',
  'updateCategoryTab',
  'updateSortTab',
  'updateMinAmount',
  'updateMaxAmount',
  'updateShowFilterModal',
  'updateFilteredProducts',
]);

const filterTab = ref('1개월');
const categoryTab = ref('전체');
const sortTab = ref('최신순');
const minAmount = ref('');
const maxAmount = ref('');

const filtertabs = [
  { value: '1주일', label: '1주일' },
  { value: '1개월', label: '1개월' },
  { value: '3개월', label: '3개월' },
  { value: '6개월', label: '6개월' },
];
const categorytabs = [
  { value: '전체', label: '전체' },
  { value: '출금', label: '출금' },
  { value: '입금', label: '입금' },
  { value: '충전', label: '충전' },
];
const sorttabs = [
  { value: '최신순', label: '최신순' },
  { value: '과거순', label: '과거순' },
];

const selectedFilterLabel = computed(() => {
  const period = filterTab.value;
  const category = categoryTab.value || '전체';
  return `${period} / ${category} / ${sortTab.value}`;
});

const filteredTransactions = ref([...props.transactions]);

const applyFilters = () => {
  let data = [...(props.transactions || [])];

  const months = parseInt(filterTab.value?.replace('개월', '')) || 0;
  if (months > 0) {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    data = data.filter((item) => new Date(item.date) >= cutoff);
  }

  if (categoryTab.value && categoryTab.value !== '전체') {
    data = data.filter((item) => item.type === categoryTab.value);
  }

  const minVal = parseInt(minAmount.value) || 0;
  const maxVal = parseInt(maxAmount.value) || Infinity;
  data = data.filter((item) => {
    const amt = item.amount || 0;
    return amt >= minVal && amt <= maxVal;
  });

  data.sort((a, b) =>
    sortTab.value === '최신순'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date),
  );

  filteredTransactions.value = data;

  emit('updateFilterTab', filterTab.value);
  emit('updateCategoryTab', categoryTab.value);
  emit('updateSortTab', sortTab.value);
  emit('updateMinAmount', minVal);
  emit('updateMaxAmount', maxVal);
  emit('updateFilteredProducts', data);
  emit('updateShowFilterModal', false);
};

const dateRange = computed(() => {
  if (!filteredTransactions.value.length) return '';
  const firstDate = filteredTransactions.value[0].date;
  const lastDate =
    filteredTransactions.value[filteredTransactions.value.length - 1].date;
  return `${lastDate} ~ ${firstDate}`;
});
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="emit('updateShowFilterModal', true)"
    >
      <P2>{{ selectedFilterLabel }}</P2>
      <i class="bi bi-caret-down-fill"></i>
    </div>

    <div v-if="dateRange" class="text-dol-light-gray text-xs px-4 pt-3 mt-1">
      {{ dateRange }}
    </div>

    <Modal
      v-if="props.showFilterModal"
      title="조회 조건 설정"
      button-text="조회"
      @confirm="applyFilters"
      @close="emit('updateShowFilterModal', false)"
    >
      <Head3>조회 기간</Head3>
      <div class="overflow-x-auto whitespace-nowrap">
        <SquareTab
          v-model="filterTab"
          :options="filtertabs"
          class="flex w-max py-2"
        />
      </div>

      <Head3 class="pt-[10px]">유형</Head3>
      <div class="overflow-x-auto whitespace-nowrap">
        <SquareTab
          v-model="categoryTab"
          :options="categorytabs"
          class="flex w-max gap-2 py-2"
        />
      </div>

      <Head3 class="pt-[10px]">정렬</Head3>
      <SquareTab
        v-model="sortTab"
        :options="sorttabs"
        class="flex w-max py-2"
      />

      <Head3 class="pt-[10px]">금액 범위</Head3>
      <div class="flex flex-col gap-2 pt-[5px]">
        <div class="flex">
          <BoxInput
            v-model="minAmount"
            placeholder="최소 금액"
            :color="true"
            height="sm"
          />
          <Subtitle1 class="text-[20px] pt-[6px] px-[5px]">~</Subtitle1>
          <BoxInput
            v-model="maxAmount"
            placeholder="최대 금액"
            :color="true"
            height="sm"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
