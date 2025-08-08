<script setup>
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import {
  conditionOptions,
  recommendPeriodOptions,
  productOptions,
} from '@/shared/constants/options';

const productOption = defineModel('productOption');
const periodOption = defineModel('periodOption');
const conditionOption = defineModel('conditionOption');
const showFilterModal = defineModel('showFilterModal');
</script>

<template>
  <div class="flex flex-col">
    <div class="sticky top-[60px] w-full overflow-x-auto bg-white">
      <SquareTab
        v-model="productOption"
        :options="productOptions"
        class="flex w-max py-2"
      />
    </div>

    <div
      class="sticky top-[110px] flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="showFilterModal = true"
    >
      <P2>상품 필터</P2>
      <i class="bi bi-caret-down-fill" />
    </div>

    <Modal
      v-if="showFilterModal"
      :title="
        productOption === '개인 신용 대출' || productOption === '전세 대출'
          ? '대출 조건 설정'
          : '조회 조건 설정'
      "
      button-text="확인"
      @close="showFilterModal = false"
    >
      <div v-if="productOption === '예금' || productOption === '적금'">
        <Head3>저축 기간</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            v-model="periodOption"
            :options="recommendPeriodOptions"
            class="flex w-max py-2"
          />
        </div>

        <Head3 class="pt-[10px]">우대 조건 (중복 선택)</Head3>
        <SquareTab
          v-model="conditionOption"
          :options="conditionOptions"
          :multiple="true"
          class="flex flex-wrap gap-2 py-2"
        />
      </div>

      <div v-else>
        <Head3 class="pt-[15px]">대출 금리</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            v-model="periodOption"
            :options="[
              { value: '최저 기준', label: '최저 기준' },
              { value: '최고 기준', label: '최고 기준' },
              { value: '평균 기준', label: '평균 기준' },
            ]"
            class="flex w-max py-2"
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
