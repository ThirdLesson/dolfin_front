<script setup>
import { useI18n } from 'vue-i18n';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';

const { t } = useI18n();

defineProps({
  amount: Number,
  balance: Number,
  recipient: String,
});
</script>

<template>
  <div class="flex flex-col">
    <Subtitle2 class="text-dol-dark-gray">{{
      t('remit.sendTo', { name: recipient })
    }}</Subtitle2>
    <Subtitle1>{{ t('remit.howMuch') }}</Subtitle1>
    <div class="flex flex-col items-center justify-center h-[30vh]">
      <Head1>{{ amount.toLocaleString() }} P</Head1>
      <Subtitle2 class="text-dol-dark-gray">
        {{ t('remit.currentBalance') }}: {{ balance?.toLocaleString() }} P
      </Subtitle2>
    </div>
  </div>
</template>
