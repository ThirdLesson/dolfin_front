<script setup>
import { useI18n } from 'vue-i18n';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';

const { t } = useI18n();
const model = defineModel();
</script>

<template>
  <PlainCard>
    <Head3>{{ t('inputAmount.title') }}</Head3>
    <BoxInput :placeholder="t('inputAmount.placeholder')" v-model="model" />
  </PlainCard>
</template>
