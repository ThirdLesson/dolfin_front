<script setup>
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import ExchangeResult from '@/features/exchange/exchangeCheck/ui/ExchangeResult.vue';

const { t } = useI18n();
</script>
<template>
  <div>
    <Head2>
      {{ t('header.bestBankTitle1') }}<br />
      {{ t('header.bestBankTitle2') }}
    </Head2>
    <ExchangeResult />
  </div>
</template>
