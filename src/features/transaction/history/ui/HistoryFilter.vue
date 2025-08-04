<script setup>
import { ref, computed } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';

const props = defineProps({ showFilterModal: Boolean });
const emit = defineEmits(['updateShowFilterModal', 'updateFilter']);

const filterTab = ref('ONE_MONTH');
const categoryTab = ref(undefined);
const sortTab = ref('LATEST');
const minAmount = ref('');
const maxAmount = ref('');

const filtertabs = [
  { value: 'ONE_WEEK', label: '1주일' },
  { value: 'ONE_MONTH', label: '1개월' },
  { value: 'THREE_MONTH', label: '3개월' },
  { value: 'SIX_MONTH', label: '6개월' },
];
const categorytabs = [
  { value: undefined, label: '전체' },
  { value: 'WITHDRAW', label: '출금' },
  { value: 'DEPOSIT', label: '입금' },
  { value: 'CHARGE', label: '충전' },
];
const sorttabs = [
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '과거순' },
];

const displayLabel = computed(() => {
  const findLabel = (tabs, val) =>
    tabs.find((t) => t.value === val)?.label || '';
  return `${findLabel(filtertabs, filterTab.value)} / ${findLabel(categorytabs, categoryTab.value)} / ${findLabel(sorttabs, sortTab.value)}`;
});

const applyFilters = () => {
  emit('updateFilter', {
    newPeriod: filterTab.value,
    newType: categoryTab.value,
    newSort: sortTab.value,
    newMin: minAmount.value ? Number(minAmount.value) : undefined,
    newMax: maxAmount.value ? Number(maxAmount.value) : undefined,
  });
  emit('updateShowFilterModal', false);
};
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="emit('updateShowFilterModal', true)"
    >
      <Caption1>{{ displayLabel }}</Caption1>
      <i class="bi bi-caret-down-fill"></i>
    </div>

    <Modal
      v-if="props.showFilterModal"
      title="조회 조건 설정"
      button-text="조회"
      @confirm="applyFilters"
      @close="emit('updateShowFilterModal', false)"
    >
      <div class="flex flex-col gap-[10px]">
        <div class="flex flex-col gap-2">
          <Head3>조회 기간</Head3>
          <div class="overflow-x-auto">
            <div class="flex whitespace-nowrap w-max">
              <SquareTab v-model="filterTab" :options="filtertabs" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <Head3>유형</Head3>
          <div class="overflow-x-auto">
            <div class="flex whitespace-nowrap w-max">
              <SquareTab v-model="categoryTab" :options="categorytabs" />
            </div>
          </div>
        </div>

        <Head3>정렬</Head3>
        <SquareTab v-model="sortTab" :options="sorttabs" />

        <Head3>금액 범위</Head3>
        <div class="flex flex-col gap-2">
          <div class="flex">
            <BoxInput
              v-model="minAmount"
              placeholder="최소 금액"
              :color="true"
              height="sm"
            />
            <Subtitle1 class="px-[5px]">~</Subtitle1>
            <BoxInput
              v-model="maxAmount"
              placeholder="최대 금액"
              :color="true"
              height="sm"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
