<script setup>
import { useI18n } from 'vue-i18n';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption2.vue';

const { t } = useI18n();

const props = defineProps({
  amount: Number,
  minError: Boolean,
});
</script>

<template>
  <div class="flex flex-col">
    <Subtitle1>{{ t('charge.title') }}</Subtitle1>
    <div class="flex flex-col items-center justify-center h-[30vh]">
      <Subtitle2 class="text-dol-dark-gray">{{ t('charge.amount') }}</Subtitle2>
      <Head1>{{ amount.toLocaleString() }} {{ t('common.won') }}</Head1>
      <Caption1
        :class="!minError && 'opacity-0'"
        class="text-dol-error transition-opacity duration-200"
      >
        {{ t('charge.error.minAmount') }}
      </Caption1>
    </div>
  </div>
</template>
