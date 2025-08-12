<script setup>
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import ExchangeResult from '@/features/exchange/exchangeCheck/ui/ExchangeResult.vue';

const { t } = useI18n();
</script>
<template>
  <div class="flex flex-col gap-[10px]">
    <Head2>
      {{ t('header.bestBankTitle1') }}<br />
      {{ t('header.bestBankTitle2') }}
    </Head2>
    <ExchangeResult />
  </div>
</template>
