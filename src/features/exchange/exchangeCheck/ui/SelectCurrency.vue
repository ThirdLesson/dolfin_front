<script setup>
import { useI18n } from 'vue-i18n';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { useUserStore } from '@/entities/user/user.store';
import { currencyImgOptions } from '@/shared/constants/options';

const { t } = useI18n();

const store = useUserStore();
const userName = store.userInfo.name;

const model = defineModel();
</script>

<template>
  <PlainCard>
    <Head3>{{ userName }}{{ t('selectCurrency.title') }}</Head3>
    <Dropdown :options="currencyImgOptions" v-model="model" />
  </PlainCard>
</template>
