<script setup>
import { ref, watch, computed } from 'vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import SmSubButton from '@/shared/components/atoms/button/SmSubButton.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { getDepositsFilter } from '../services/recommendation.service';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';

const props = defineProps({
  productOption: String,
  periodOption: String,
  conditionOption: Array,
});
const emit = defineEmits(['select']);

const products = ref([]);
const totalCount = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);

const fetchDepositProducts = async () => {
  const period = props.periodOption || 'STAY_EXPIRATION';
  const spclConditions = props.conditionOption || [];

  const res = await getDepositsFilter({
    productPeriod: period,
    pageNumber: currentPage.value - 1,
    spclConditions,
  });

  if (res.status === 200 && Array.isArray(res.data.content)) {
    totalCount.value = res.data.totalCount;
    totalPages.value = res.data.totalPages;

    const newItems = res.data.content.map(({ company, product }) => ({
      id: product.depositId,
      title: product.name,
      bank: company.name,
      basicrate: product.interestRate,
      maximumrate: product.maxInterestRate,
      period: product.saveMonth,
      preferential: (product.spclConditions || []).join(', '),
      website: company.homepageUrl,
      callcenter: company.callNumber,
      logo: Banks[bankNameMap[company.name]] || '',
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
    fetchDepositProducts();
  }
};

const isActivePage = (page) => {
  return page === currentPage.value
    ? 'bg-dol-sub text-white rounded-sm font-bold'
    : 'text-dol-gray hover:text-dol-main';
};

watch(
  () => [props.productOption, props.periodOption, props.conditionOption],
  ([tab]) => {
    if (tab === '예금') {
      currentPage.value = 1;
      fetchDepositProducts();
    } else {
      products.value = [];
    }
  },
  { immediate: true, deep: true },
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
      <div class="flex flex-col text-right">
        <P2 class="text-dol-dark-gray">기본 금리 {{ product.basicrate }}%</P2>
        <P2 class="text-dol-main">최대 금리 {{ product.maximumrate }}%</P2>
      </div>
    </DoubleCard>

    <div v-if="products.length === 0" class="text-center text-dol-gray py-8">
      조회 가능한 상품이 없습니다.
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
        이전
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
        다음
      </SmSubButton>
    </div>
  </div>
</template>
