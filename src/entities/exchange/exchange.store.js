import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useExchangeStore = defineStore(
  'exchange',
  () => {
    const exchangeOption = ref({
      targetCurrency: '',
      amount: null,
    });

    const setExchangeOption = (data) => {
      exchangeOption.value = { ...data };
    };

    return {
      exchangeOption,
      setExchangeOption,
    };
  },
  {
    persist: {
      enabled: true,
    },
  },
);
