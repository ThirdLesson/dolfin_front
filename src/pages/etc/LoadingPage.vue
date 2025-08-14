<script setup>
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import loading from '@/asset/logo/loading.gif';

const { t } = useI18n();
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col justify-center items-center overflow-hidden select-none"
  >
    <img
      :src="loading"
      alt="loading"
      class="max-w-[30%] max-h-[30%] object-contain mb-4"
    />
    <Head2 class="text-dol-dark-gray">{{ t('common.loading') }}</Head2>
  </div>
</template>
