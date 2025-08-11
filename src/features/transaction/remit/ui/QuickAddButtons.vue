<script setup>
import { useI18n } from 'vue-i18n';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const { t } = useI18n();
const emit = defineEmits(['quickAdd']);

const quickTabs = [
  { label: t('remit.quickAdd.thousand'), value: 1000 },
  { label: t('remit.quickAdd.fiveThousand'), value: 5000 },
  { label: t('remit.quickAdd.tenThousand'), value: 10000 },
  { label: t('remit.quickAdd.hundredThousand'), value: 100000 },
];
</script>

<template>
  <div class="flex gap-2 justify-between w-full">
    <button
      v-for="tab in quickTabs"
      :key="tab.value"
      class="flex-1 h-10 rounded-sm border border-dol-main bg-white text-dol-main leading-none"
      @click="emit('quickAdd', tab.value)"
    >
      <P1> {{ tab.label }}</P1>
    </button>
  </div>
</template>
