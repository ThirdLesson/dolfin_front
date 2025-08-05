<script setup>
import { ref, watch, computed } from 'vue';
import SmallDropdown from '@/shared/components/molecules/SmallDropdown.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import { exchangeCheck } from '../service/exchangeCheck.service';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';
import BenefitInfo from './BenefitInfo.vue';
import { useExchangeStore } from '@/entities/exchange/exchange.store';
import { exchangeOptions } from '@/shared/constants/options';

const store = useExchangeStore();

const selectedType = ref(exchangeOptions[0].value);
const data = ref([]);

const isSendType = computed(() => selectedType.value === 'SEND');

const exchangeCheckFunction = async () => {
  const result = await exchangeCheck({
    amount: store.exchangeOption.amount,
    targetCurrency: store.exchangeOption.targetCurrency,
    type: selectedType.value,
  });

  data.value = result.data.banks;
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
    <div class="w-full flex flex-col items-end mb-[20px] gap-[15px]">
      <SmallDropdown :options="exchangeOptions" v-model="selectedType" />
      <div
        v-if="isSendType"
        class="w-full flex flex-col p-4 rounded-sm bg-dol-light"
      >
        <Subtitle3>※ 유의 사항</Subtitle3>
        <Caption1
          >창구를 통한 해외 송금 이외에는 외국환 등록이 필요합니다.</Caption1
        >
      </div>
    </div>
    <div v-for="item in data" :key="item.index" class="mb-[15px]">
      <DoubleCard
        :title="item.bankName"
        :image="Banks[bankNameMap[item.bankName]]"
      >
        <div class="flex flex-col items-end">
          <Caption2>{{ item.exchangeRate }}</Caption2>
          <Subtitle2>총 {{ item.totalAmount }}</Subtitle2>
        </div>
      </DoubleCard>
      <BenefitInfo
        v-if="item.policyList.length > 0"
        :policyList="item.policyList"
        :changguAmount="isSendType ? item.changguAmount : null"
      />
    </div>
  </div>
</template>
