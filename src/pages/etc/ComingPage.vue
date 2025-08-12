<script setup>
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head1.vue';
import P2 from '@/shared/components/atoms/typography/P1.vue';
import coming from '@/asset/logo/comingLogo.png';

const { t } = useI18n();
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col justify-center items-center overflow-hidden"
  >
    <img :src="coming" alt="coming" />
    <Head2>{{ t('common.comingSoon') }}</Head2>
    <P2>{{ t('common.comingSoonDesc') }}</P2>
  </div>
</template>
