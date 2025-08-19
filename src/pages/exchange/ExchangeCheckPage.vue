<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import SelectCurrency from '@/features/exchange/exchangeCheck/ui/SelectCurrency.vue';
import ExchangeGraph from '@/features/exchange/exchangeCheck/ui/ExchangeGraph.vue';
import InputAmount from '@/features/exchange/exchangeCheck/ui/InputAmount.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { useExchangeStore } from '@/entities/exchange/exchange.store';
import { useUserStore } from '@/entities/user/user.store';

const { t } = useI18n();
const userStore = useUserStore();
const router = useRouter();
const exchangeStore = useExchangeStore();

const targetCurrency = computed({
  get: () => userStore.userInfo.currency,
  set: (v) => userStore.setUserInfo({ currency: v }),
});
const amount = ref('');
const showCaption = ref(false);

const handleComplete = () => {
  const option = {
    amount: Number(amount.value),
    targetCurrency: targetCurrency.value,
  };
  exchangeStore.setExchangeOption(option);
  router.push(URL.PAGE.EXCHANGE_RESULT);
};

watch(amount, (newVal) => {
  showCaption.value = newVal !== '';
});
</script>

<template>
  <div class="flex flex-col gap-[10px] select-none">
    <SelectCurrency v-model="targetCurrency" />
    <ExchangeGraph :currency="targetCurrency" />
    <InputAmount v-model="amount" />
    <Caption2 v-if="showCaption" class="underline text-dol-dark-gray">
      {{ t('caption.calculatedNet') }}
    </Caption2>
    <div
      class="flex flex-col gap-[10px] p-5 bg-dol-light rounded-sm break-words"
    >
      <Head3>※ {{ t('notice.title') }}</Head3>
      <Caption1>{{ t('notice.body') }}</Caption1>
    </div>
    <LgMainButton @click="handleComplete">{{
      t('common.complete')
    }}</LgMainButton>
  </div>
</template>
