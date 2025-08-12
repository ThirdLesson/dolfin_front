<script setup>
import { useI18n } from 'vue-i18n';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import { productOptions } from '@/shared/constants/options';

const { t } = useI18n();

const emit = defineEmits(['click']);
const productOption = defineModel('productOption');
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <div class="sticky top-[60px] w-full overflow-x-auto bg-white">
      <SquareTab
        v-model="productOption"
        :options="productOptions"
        class="w-max"
      />
    </div>

    <div
      class="sticky top-[110px] flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="emit('click')"
    >
      <P2>{{ t('recommendation.common.productFilter') }}</P2>
      <i class="bi bi-caret-down-fill" />
    </div>
  </div>
</template>
