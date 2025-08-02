<script setup>
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { Flags } from '@/asset/images';
import { useUserStore } from '@/entities/user/user.store';

const store = useUserStore();

const userName = store.userInfo.name;

const options = [
  {
    value: 'USD',
    label: 'US Dollar (USD)',
    src: Flags.usa,
  },
  {
    value: 'JPY',
    label: 'Japanese Yen (JPY)',
    src: Flags.japan,
  },
  {
    value: 'EUR',
    label: 'Euro (EUR)',
    src: Flags.eu,
  },
  {
    value: 'GBP',
    label: 'British Pound (GBP)',
    src: Flags.uk,
  },
  {
    value: 'CAD',
    label: 'Canadian Dollar (CAD)',
    src: Flags.canada,
  },
  {
    value: 'HKD',
    label: 'Hong Kong Dollar (HKD)',
    src: Flags.hongkong,
  },
  {
    value: 'CNY',
    label: 'Chinese Yuan (CNY)',
    src: Flags.china,
  },
  {
    value: 'THB',
    label: 'Thai Baht (THB)',
    src: Flags.thailand,
  },
  {
    value: 'IDR',
    label: 'Indonesian Rupiah (IDR)',
    src: Flags.indonesia,
  },
  {
    value: 'VND',
    label: 'Vietnamese Dong (VND)',
    src: Flags.vietnam,
  },
  {
    value: 'RUB',
    label: 'Russian Ruble (RUB)',
    src: Flags.russia,
  },
  {
    value: 'MYR',
    label: 'Malaysian Ringgit (MYR)',
    src: Flags.malaysia,
  },
];

const model = defineModel();
</script>

<template>
  <PlainCard>
    <Head3>{{ userName }}님의 기준 통화</Head3>
    <Dropdown :options="options" v-model="model" />
  </PlainCard>
</template>
