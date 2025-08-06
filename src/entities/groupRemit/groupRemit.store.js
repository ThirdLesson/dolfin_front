import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGroupRemitStore = defineStore(
  'groupRemit',
  () => {
    const groupRemitInfo = ref({
      currency: '',
      remittanceDate: null,
      amount: null,
      commission: 5000,
      isSignedUp: false,
    });

    const setGroupRemitInfo = (data) => {
      groupRemitInfo.value = {
        ...groupRemitInfo.value,
        ...data,
      };
    };

    // 총 예상 금액 계산: 송금 금액 + 수수료
    const getTotalAmount = computed(() => {
      const amount = Number(groupRemitInfo.value.amount || 0);
      const commission = Number(groupRemitInfo.value.commission || 0);
      return amount + commission;
    });

    return {
      groupRemitInfo,
      setGroupRemitInfo,
      getTotalAmount,
    };
  },
  {
    persist: {
      enabled: true,
    },
  },
);
