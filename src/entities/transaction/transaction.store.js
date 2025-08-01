import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTransStore = defineStore(
  'trans',
  () => {
    const transInfo = ref({
      accountNumber: null,
      amount: null,
      bankType: '',
      name: '',
      phoneNumber: '',
    });

    const setTransInfo = (data) => {
      transInfo.value = { ...data };
    };

    const cleatTransInfo = () => {
      transInfo.value = {
        accountNumber: null,
        amount: null,
        bankType: '',
        name: '',
      };
    };

    return {
      transInfo,
      setTransInfo,
      cleatTransInfo,
    };
  },
  {
    persist: {
      enabled: true,
    },
  },
);
