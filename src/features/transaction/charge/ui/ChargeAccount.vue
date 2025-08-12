<script setup>
import { useI18n } from 'vue-i18n';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const { t } = useI18n();

const props = defineProps({
  bankType: String,
  accountNumber: String,
});
const emit = defineEmits(['click']);
</script>

<template>
  <div class="flex cursor-pointer justify-end" @click="emit('click')">
    <P1 class="text-dol-dark-gray">
      {{ t('charge.account') }}: {{ props.bankType }} {{ props.accountNumber }}
    </P1>
    <i class="bi bi-caret-down-fill ml-1" />
  </div>
</template>
