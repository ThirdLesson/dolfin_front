<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import SmSubButton from '@/shared/components/atoms/button/SmSubButton.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import { getJeonseLoanFilter } from '../services/recommendation.service';
import { interestRateOptions } from '@/shared/constants/options';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';

const { t } = useI18n();

const props = defineProps({ showModal: Boolean });
const emit = defineEmits(['select', 'confirm']);

const products = ref([]);
const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const interestRateOption = ref('AVG_RATE');
const minAmount = ref(null);
const maxAmount = ref(null);

const fetchPersonalLoanProducts = async () => {
  const res = await getJeonseLoanFilter({
    page: currentPage.value - 1,
    filterType: interestRateOption.value,
    minAmount: minAmount.value || 0,
    maxAmount: maxAmount.value || 1000000000,
  });

  if (res.status === 200 && Array.isArray(res.data?.loans)) {
    totalCount.value = res.data.totalCount;
    totalPages.value = res.data.totalPages;

    const newItems = res.data.loans.map((loan) => ({
      id: loan.personalCreditLoanId,
      title: loan.productName,
      bank: loan.companyName,
      interestRate: loan.selectedRate,
      logo: Banks[bankNameMap[loan.companyName]] || '',
    }));

    products.value = newItems;
  } else {
    products.value = [];
    totalCount.value = 0;
    totalPages.value = 0;
  }
};

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
    fetchPersonalLoanProducts();
  }
};

const isActivePage = (page) =>
  page === currentPage.value
    ? 'bg-dol-sub text-white rounded-sm font-bold'
    : 'text-dol-gray hover:text-dol-main';

watch(
  () => [interestRateOption.value, minAmount.value, maxAmount.value],
  () => {
    currentPage.value = 1;
    fetchPersonalLoanProducts();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-[15px]">
    <DoubleCard
      v-for="product in products"
      :key="product.id"
      :image="product.logo"
      :title="product.title"
      :subtitle="product.bank"
      @click="emit('select', product)"
    >
      <div class="flex flex-col text-right shrink-0">
        <P2 class="text-dol-main">{{
          t('recommendation.common.ratePerYear', { rate: product.interestRate })
        }}</P2>
      </div>
    </DoubleCard>

    <div v-if="products.length === 0" class="text-center text-dol-gray py-8">
      {{ t('recommendation.common.noResults') }}
    </div>

    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 py-4"
    >
      <SmSubButton
        v-if="currentPage > 5"
        @click="goToPage(currentPage - 1)"
        class="text-white"
      >
        {{ t('recommendation.common.prev') }}
      </SmSubButton>

      <P1
        v-for="page in pageNumbers"
        :key="page"
        class="px-3 py-1 cursor-pointer"
        :class="isActivePage(page)"
        @click="goToPage(page)"
      >
        {{ page }}
      </P1>

      <SmSubButton
        v-if="totalPages > 5"
        @click="goToPage(currentPage + 1)"
        class="text-white"
      >
        {{ t('recommendation.common.next') }}
      </SmSubButton>
    </div>
  </div>

  <Modal
    v-if="showModal"
    :title="t('recommendation.loan.filterTitle')"
    :button-text="t('recommendation.common.search')"
    @close="emit('close')"
    @confirm="emit('close')"
  >
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-[10px]">
        <Head3>{{ t('recommendation.loan.rate') }}</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            v-model="interestRateOption"
            :options="interestRateOptions"
            class="flex w-max"
          />
        </div>
      </div>

      <div class="flex flex-col gap-[10px]">
        <Head3>{{ t('recommendation.loan.limit') }}</Head3>
        <div class="flex">
          <BoxInput
            :placeholder="t('recommendation.loan.minAmount')"
            :color="true"
            height="sm"
            v-model="minAmount"
          />
          <p class="text-[20px] font-midium pt-[6px] px-[5px]">
            {{ t('recommendation.common.range') }}
          </p>
          <BoxInput
            :placeholder="t('recommendation.loan.maxAmount')"
            :color="true"
            height="sm"
            v-model="maxAmount"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>
