<script setup>
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';

import canada from '@/asset/flag/canada.png';
import china from '@/asset/flag/china.png';

const options = [
  {
    value: 'USD',
    label: 'US Dollar(USD)',
    src: canada,
  },
  {
    value: 'JPY',
    label: 'Japanese Yen(JPY)',
    src: china,
  },
  {
    value: 'EUR',
    label: 'Euro(EUR)',
    src: china,
  },
  {
    value: 'GBP',
    label: 'British Pound(GBP)',
    src: china,
  },
  {
    value: 'CAD',
    label: 'Canadian Dollar(CAD)',
    src: china,
  },
  {
    value: 'HKD',
    label: 'Hong Kong Dollar(HKD)',
    src: china,
  },
  {
    value: 'CNY',
    label: 'Chinese Yuan(CNY)',
    src: china,
  },
  {
    value: 'THB',
    label: 'Thai Baht(THB)',
    src: china,
  },
  {
    value: 'IDR',
    label: 'Indonesian Rupiah(IDR)',
    src: china,
  },
  {
    value: 'VND',
    label: 'Vietnamese Dong(VND)',
    src: china,
  },
  {
    value: 'RUB',
    label: 'Russian Ruble(RUB)',
    src: china,
  },
  {
    value: 'MYR',
    label: 'Malaysian Ringgit(MYR)',
    src: china,
  },
];
</script>

<template>
  <PlainCard>
    <Head3>루나키키님의 기준 통화</Head3>
    <Dropdown :options="options" />
  </PlainCard>
</template>
