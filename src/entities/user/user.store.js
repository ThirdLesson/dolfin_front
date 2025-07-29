import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      birth: '',
      currency: '',
      grantType: '',
      memberId: null,
      name: '',
      nationality: '',
      passportNumber: '',
      phoneNumber: '',
      remainTime: '',
    });

    const setUserInfo = (data) => {
      userInfo.value = { ...data };
    };

    const clearUserInfo = () => {
      userInfo.value = {
        birth: '',
        currency: '',
        grantType: '',
        memberId: null,
        name: '',
        nationality: '',
        passportNumber: '',
        phoneNumber: '',
        remainTime: '',
      };
    };

    const isLoggedIn = computed(() => !!userInfo.value.memberId);

    const remainDays = computed(() => {
      const targetDateStr = userInfo.value.remainTime;
      if (!targetDateStr) return 0;

      const targetDate = new Date(targetDateStr);
      const today = new Date();

      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 0 ? diffDays : 0;
    });

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLoggedIn,
      remainDays,
    };
  },
  {
    persist: {
      enabled: true,
    },
  },
);
