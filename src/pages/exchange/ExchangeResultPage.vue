<script setup>
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import ExchangeResult from '@/features/exchange/exchangeCheck/ui/ExchangeResult.vue';
</script>
<template>
  <div>
    <Head2>
      현재 최고 환전 혜택을<br />
      제공하는 은행은
    </Head2>
    <ExchangeResult />
  </div>
</template>
