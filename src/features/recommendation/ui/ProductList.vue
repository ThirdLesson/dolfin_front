<script setup>
import { ref, watch } from 'vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import { getDepositsFilter } from '../services/recommendation.service';

import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';

const props = defineProps({
  activeTab: String,
  filterTab: String,
  conditionTab: Array,
});
const emit = defineEmits(['select']);

const products = ref([]);

const periodMap = {
  '6개월': 'SIX_MONTH',
  '12개월': 'ONE_YEAR',
  '24개월': 'TWO_YEAR',
  체류기간: 'STAY_EXPIRATION',
};

const conditionMap = {
  비대면가입: 'ONLINE',
  카드사용: 'USING_CARD',
  급여연동: 'USING_SALARY_ACCOUNT',
  은행앱사용: 'BANK_APP',
  공과금연동: 'USING_UTILITY_BILL',
  첫거래: 'FIRST_BANKING',
  입출금통장: 'DEPOSIT_ACCOUNT',
  재예치: 'DEPOSIT_AGAIN',
};

const fetchDepositProducts = async () => {
  const period = periodMap[props.filterTab] || 'STAY_EXPIRATION';
  const spclConditions = (props.conditionTab || [])
    .map((c) => conditionMap[c])
    .filter(Boolean);

  const query = new URLSearchParams({
    productPeriod: period,
    pageNumber: 0,
    pageSize: 20,
  });
  spclConditions.forEach((cond) => query.append('spclConditions', cond));

  console.log('필터 요청 URL:', `?${query.toString()}`);

  const res = await getDepositsFilter(`?${query.toString()}`);
  products.value =
    res?.status === 200 && res.data?.length
      ? res.data.map(({ company, product }) => ({
          id: product.depositId,
          title: product.name,
          bank: company.name,
          basicrate: product.interestRate,
          maximumrate: product.maxInterestRate,
          period: product.saveMonth,
          preferential: (product.spclConditions || []).join(', '),
          logo: Banks[bankNameMap[company.name]] || '',
          website: company.homepageUrl,
          callcenter: company.callNumber,
        }))
      : [];
};

watch(
  () => [props.activeTab, props.filterTab, props.conditionTab],
  ([tab]) => {
    if (tab === '예금') fetchDepositProducts();
    else products.value = [];
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="flex flex-col px-4 py-4 space-y-3 overflow-y-auto">
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
  </div>
</template>
