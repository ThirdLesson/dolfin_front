<script setup>
import { ref, computed } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import {
  periodOptions,
  categoryOptions,
  sortOptions,
} from '@/shared/constants/options';

const props = defineProps({ showFilterModal: Boolean });
const emit = defineEmits(['updateShowFilterModal', 'updateFilter']);

const selectedPeriod = ref(periodOptions[1].value);
const selectedCategory = ref(categoryOptions[0].value);
const selectedSort = ref(sortOptions[0].value);
const minAmount = ref('');
const maxAmount = ref('');

const displayLabel = computed(() => {
  const findLabel = (tabs, val) =>
    tabs.find((t) => t.value === val)?.label || '';
  return `${findLabel(periodOptions, selectedPeriod.value)} / ${findLabel(categoryOptions, selectedCategory.value)} / ${findLabel(sortOptions, selectedSort.value)}`;
});

const applyFilters = () => {
  emit('updateFilter', {
    newPeriod: selectedPeriod.value,
    newType: selectedCategory.value,
    newSort: selectedSort.value,
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
              <SquareTab v-model="selectedPeriod" :options="periodOptions" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <Head3>유형</Head3>
          <div class="overflow-x-auto">
            <div class="flex whitespace-nowrap w-max">
              <SquareTab
                v-model="selectedCategory"
                :options="categoryOptions"
              />
            </div>
          </div>
        </div>

        <Head3>정렬</Head3>
        <SquareTab v-model="selectedSort" :options="sortOptions" />

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
