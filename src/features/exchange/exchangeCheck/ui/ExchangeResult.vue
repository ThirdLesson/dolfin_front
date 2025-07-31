<script setup>
import { ref, watch } from 'vue';
import SmallDropdown from '@/shared/components/molecules/SmallDropdown.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import { exchangeCheck } from '../service/exchangeCheck.service';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';
import BenefitInfo from './BenefitInfo.vue';
import { useExchangeStore } from '@/entities/exchange/exchange.store';

const store = useExchangeStore();

const options = [
  {
    value: 'SELLCASH',
    label: '현찰 팔 때',
  },
  {
    value: 'GETCASH',
    label: '현찰 받을 때',
  },
  {
    value: 'SEND',
    label: '송금 보낼 때',
  },
  {
    value: 'RECEIVE',
    label: '송금 받을 때',
  },
  {
    value: 'BASE',
    label: '매매 기준율',
  },
];

const selectedType = ref('GETCASH');
const data = ref([]);

const exchangeCheckFunction = async () => {
  const result = await exchangeCheck({
    amount: store.exchangeOption.amount,
    targetCurrency: store.exchangeOption.targetCurrency,
    type: selectedType.value,
  });

  data.value = result.data.allBanks;
};

watch(
  selectedType,
  () => {
    exchangeCheckFunction();
  },
  {
    immediate: true,
  },
);
</script>
<template>
  <div class="flex flex-col">
    <div class="flex justify-end mb-[25px]">
      <SmallDropdown :options="options" v-model="selectedType" />
    </div>
    <div v-for="(item, index) in data" :key="item.index" class="mb-[15px]">
      <DoubleCard
        :title="item.bankName"
        :image="Banks[bankNameMap[item.bankName]]"
        :class="index == 0 && 'bg-[rgba(206,223,246,0.6)]'"
      >
        <div class="flex flex-col items-end">
          <Caption2>{{ item.exchangeRate }}</Caption2>
          <Subtitle2>총 {{ item.totalAmount }}</Subtitle2>
        </div>
      </DoubleCard>
      <BenefitInfo />
    </div>
  </div>
</template>
