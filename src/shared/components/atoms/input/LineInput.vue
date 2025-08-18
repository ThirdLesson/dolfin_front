<script setup>
import { computed } from 'vue';
import Subtitle3 from '../typography/Subtitle3.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  title: String,
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel();
const placeholderText = computed(() => props.placeholder || t('common.input'));
</script>

<template>
  <div class="flex flex-col">
    <Subtitle3 v-if="title">{{ title }}</Subtitle3>
    <div class="w-full">
      <div
        class="border-b border-dol-light-gray focus-within:border-dol-main transition-colors"
      >
        <input
          class="text-[12px] font-medium w-full bg-transparent border-none outline-none placeholder-dol-light-gray"
          v-model="value"
          :placeholder="placeholderText"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>
