<script setup>
import { useRouter } from 'vue-router';
import SelectCurrency from '@/features/exchange/exchangeCheck/ui/SelectCurrency.vue';
import ExchangeGraph from '@/features/exchange/exchangeCheck/ui/ExchangeGraph.vue';
import InputAmount from '@/features/exchange/exchangeCheck/ui/InputAmount.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <SelectCurrency />
    <ExchangeGraph />
    <InputAmount />
    <LgMainButton class="mt-[10px]" @click="router.push('/exchange-result')"
      >완료</LgMainButton
    >
  </div>
</template>
