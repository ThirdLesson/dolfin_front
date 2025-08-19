<script setup>
import { onMounted, nextTick, ref } from 'vue';
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
const dropdownKey = ref(0);

onMounted(async () => {
  try {
    await document.fonts?.ready;
  } catch {}
  await nextTick();
  dropdownKey.value += 1;
});
</script>

<template>
  <PlainCard>
    <Head3>{{ userName }}{{ t('selectCurrency.title') }}</Head3>
    <Dropdown
      :key="dropdownKey"
      :options="currencyImgOptions"
      v-model="model"
    />
  </PlainCard>
</template>
