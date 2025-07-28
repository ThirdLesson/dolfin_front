<script setup>
import { useRouter } from 'vue-router';
import SelectCurrency from '@/features/exchangeRate/exchangeCheck/ui/SelectCurrency.vue';
import ExchangeGraph from '@/features/exchangeRate/exchangeCheck/ui/ExchangeGraph.vue';
import InputAmount from '@/features/exchangeRate/exchangeCheck/ui/InputAmount.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';

import { exchangeCheck } from '@/features/exchangeRate/exchangeCheck/service/exchangeCheck.service';

const test = async () => {
  const result = await exchangeCheck({
    amount: 1000000,
    targetCurrency: 'VND',
    type: 'GETCASH',
  });

  console.log('res', result);
};

const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <SelectCurrency />
    <ExchangeGraph />
    <InputAmount />
    <LgMainButton class="mt-[10px]" @click="router.push('/exchange-result')">완료</LgMainButton>
  </div>
</template>
