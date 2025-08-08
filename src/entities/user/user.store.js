import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      loginId: '',
      birth: '',
      currency: '',
      grantType: '',
      memberId: null,
      name: '',
      nationality: '',
      passportNumber: '',
      phoneNumber: '',
      remainTime: '',
      walletId: null,
    });

    const isLoggedIn = ref(false);
    const isFCMInitialized = ref(false);

    const setLoginState = (state) => {
      isLoggedIn.value = state;
    };

    const setUserInfo = (data) => {
      userInfo.value = { ...data };
    };

    const setWalletId = (id) => {
      userInfo.value.walletId = id;
    };

    const clearUserInfo = () => {
      userInfo.value = {
        loginId: '',
        birth: '',
        currency: '',
        grantType: '',
        memberId: null,
        name: '',
        nationality: '',
        passportNumber: '',
        phoneNumber: '',
        remainTime: '',
        walletId: null,
      };
      isLoggedIn.value = false;
      isFCMInitialized.value = false;
    };

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
      isLoggedIn,
      isFCMInitialized,
      setLoginState,
      setUserInfo,
      clearUserInfo,
      isLoggedIn,
      remainDays,
      setWalletId,
    };
  },
  {
    persist: {
      enabled: true,
    },
  },
);
