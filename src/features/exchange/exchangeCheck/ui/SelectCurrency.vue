<script setup>
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { useUserStore } from '@/entities/user/user.store';
import { currencyImgOptions } from '@/shared/constants/options';

const store = useUserStore();
const userName = store.userInfo.name;

const model = defineModel();
</script>

<template>
  <PlainCard>
    <Head3>{{ userName }}님의 기준 통화</Head3>
    <Dropdown :options="currencyImgOptions" v-model="model" />
  </PlainCard>
</template>
