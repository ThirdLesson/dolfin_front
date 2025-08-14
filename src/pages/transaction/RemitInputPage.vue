<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import InputTel from '@/features/transaction/remit/ui/InputTel.vue';
import InputAccount from '@/features/transaction/remit/ui/InputAccount.vue';

const route = useRoute();
const { t } = useI18n();

const type = computed(() => route.query.type);
</script>

<template>
  <div class="flex flex-col gap-5 h-full overflow-y-auto select-none">
    <Subtitle1>{{ t('remit.where') }}</Subtitle1>
    <InputAccount v-if="type === 'account'" />
    <InputTel v-else-if="type === 'tel'" />
  </div>
</template>
