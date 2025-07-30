<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SelectCurrency from '@/features/exchange/exchangeCheck/ui/SelectCurrency.vue';
import ExchangeGraph from '@/features/exchange/exchangeCheck/ui/ExchangeGraph.vue';
import InputAmount from '@/features/exchange/exchangeCheck/ui/InputAmount.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { useExchangeStore } from '@/entities/exchange/exchange.store';
import { useUserStore } from '@/entities/user/user.store';

const userStore = useUserStore();
const router = useRouter();
const exchangeStore = useExchangeStore();

const targetCurrency = ref(userStore.userInfo.currency);
const amount = ref('');
 
const handleComplete = () => {
  const option = {
    amount: Number(amount.value),
    targetCurrency: targetCurrency.value,
  };

  exchangeStore.setExchangeOption(option);
  router.push('/exchange-result');
};
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <SelectCurrency v-model="targetCurrency" />
    <ExchangeGraph :currency="targetCurrency" />
    <InputAmount v-model="amount" />
    <LgMainButton class="mt-[10px]" @click="handleComplete">완료</LgMainButton>
  </div>
</template>
