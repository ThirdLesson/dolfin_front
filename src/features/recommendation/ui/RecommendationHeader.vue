<script setup>
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';

const props = defineProps({
  activeTab: String,
  filterTab: String,
  conditionTab: Array,
  showFilterModal: Boolean,
});
const emit = defineEmits([
  'update:activeTab',
  'update:filterTab',
  'update:conditionTab',
  'update:showFilterModal',
]);

const tabs = [
  { value: '예금', label: '예금' },
  { value: '적금', label: '적금' },
  { value: '신용 대출', label: '신용 대출' },
  { value: '전세 대출', label: '전세 대출' },
];
const filtertabs = [
  { value: '6개월', label: '6개월' },
  { value: '12개월', label: '12개월' },
  { value: '24개월', label: '24개월' },
  { value: '체류기간', label: '체류기간' },
];
const conditiontabs = [
  { value: '카드사용', label: '카드사용' },
  { value: '첫거래', label: '첫거래' },
  { value: '재예치', label: '재예치' },
  { value: '비대면가입', label: '비대면가입' },
  { value: '공과금연동', label: '공과금연동' },
  { value: '은행앱사용', label: '은행앱사용' },
  { value: '입출금통장', label: '입출금통장' },
  { value: '급여연동', label: '급여연동' },
];
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-[60px] w-full overflow-x-auto bg-white">
      <SquareTab
        :modelValue="props.activeTab"
        :options="tabs"
        class="flex w-max py-2"
        @update:modelValue="(val) => emit('update:activeTab', val)"
      />
    </div>

    <div
      class="sticky top-[110px] flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="emit('update:showFilterModal', true)"
    >
      <P2>상품 필터</P2>
      <i class="bi bi-caret-down-fill"></i>
    </div>

    <Modal
      v-if="props.showFilterModal"
      :title="
        props.activeTab === '신용 대출' || props.activeTab === '전세 대출'
          ? '대출 조건 설정'
          : '조회 조건 설정'
      "
      button-text="확인"
      @close="emit('update:showFilterModal', false)"
    >
      <div v-if="props.activeTab === '예금' || props.activeTab === '적금'">
        <Head3>저축 기간</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            :modelValue="props.filterTab"
            :options="filtertabs"
            class="flex w-max py-2"
            @update:modelValue="(val) => emit('update:filterTab', val)"
          />
        </div>

        <Head3 class="pt-[10px]">우대 조건 (중복 선택)</Head3>
        <SquareTab
          :modelValue="props.conditionTab"
          :options="conditiontabs"
          :multiple="true"
          class="flex flex-wrap gap-2 py-2"
          @update:modelValue="(val) => emit('update:conditionTab', val)"
        />
      </div>

      <div v-else>
        <Head3 class="pt-[15px]">대출 금리</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            :modelValue="props.filterTab"
            :options="[
              { value: '최저 기준', label: '최저 기준' },
              { value: '최고 기준', label: '최고 기준' },
              { value: '평균 기준', label: '평균 기준' },
            ]"
            class="flex w-max py-2"
            @update:modelValue="(val) => emit('update:filterTab', val)"
          />
        </div>

        <Head3 class="pt-[10px]">대출 한도</Head3>
        <div class="flex flex-col gap-2 pt-[5px]">
          <div class="flex">
            <BoxInput placeholder="최소 금액" :color="true" height="sm" />
            <p class="text-[20px] font-midium pt-[6px] px-[5px]">~</p>
            <BoxInput placeholder="최대 금액" :color="true" height="sm" />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
