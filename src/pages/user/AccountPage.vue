<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Step1 from '@/features/user/account/ui/Step1.vue';
import Step2 from '@/features/user/account/ui/Step2.vue';
import { setWalletPw } from '@/features/user/account/services/account.service';

const router = useRouter();
const route = useRoute();

const step = ref(1);
const authCode = ref('');
const accountInfo = reactive({
  accountNumber: '',
  bankType: '',
});

const handleNext = (data) => {
  Object.assign(accountInfo, data);
  authCode.value = data.authCode;
  step.value++;
};

const currentStep = computed(() => {
  switch (step.value) {
    case 1:
      return Step1;
    case 2:
      return Step2;
  }
});

const handleComplete = async (pw) => {
  const result = await setWalletPw({
    accountNumber: Number(accountInfo.accountNumber),
    bankType: accountInfo.bankType,
    walletPassword: Number(pw),
  });

  if (result.status === 204) {
    router.push(URL.PAGE.MAIN);
  }
};

onMounted(() => {
  route.meta.onBack = () => {
    if (step.value > 1) {
      step.value--;
    } else {
      router.back();
    }
  };
});
</script>

<template>
  <div class="h-full flex flex-col justify-between overflow-y-auto select-none">
    <component
      :is="currentStep"
      :authCode="authCode"
      @next="(data) => handleNext(data)"
      @complete="(pw) => handleComplete(pw)"
    />
  </div>
</template>
