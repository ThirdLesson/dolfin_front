<script setup>
import { ref } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';

const props = defineProps({
  showFilterModal: Boolean,
});

const emit = defineEmits(['updateShowFilterModal', 'updateFilter']);

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

const convertPeriod = (label) => {
  switch (label) {
    case '1주일':
      return 'ONE_WEEK';
    case '1개월':
      return 'ONE_MONTH';
    case '3개월':
      return 'THREE_MONTH';
    case '6개월':
      return 'SIX_MONTH';
    default:
      return 'ONE_MONTH';
  }
};

const convertType = (label) => {
  switch (label) {
    case '출금':
      return 'WITHDRAW';
    case '입금':
      return 'DEPOSIT';
    case '충전':
      return 'CHARGE';
    default:
      return undefined;
  }
};

const convertSort = (label) => (label === '과거순' ? 'OLDEST' : 'LATEST');

const applyFilters = () => {
  emit('updateFilter', {
    newPeriod: convertPeriod(filterTab.value),
    newType: convertType(categoryTab.value),
    newSort: convertSort(sortTab.value),
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
      <Caption1>{{ filterTab }} / {{ categoryTab }} / {{ sortTab }}</Caption1>
      <i class="bi bi-caret-down-fill"></i>
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
          <Subtitle1 class="pt-[6px] px-[5px]">~</Subtitle1>
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
