<script setup>
import { computed } from 'vue';
import Subtitle2 from '../typography/Subtitle2.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  color: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: 'lg',
  },
  title: String,
});

const value = defineModel();
const placeholderText = computed(() => props.placeholder || t('common.input'));
</script>

<template>
  <div class="w-full flex flex-col gap-[10px]">
    <Subtitle2 v-if="title">{{ title }}</Subtitle2>
    <div
      class="border-2 border-dol-dark-gray rounded focus-within:border-dol-main transition-colors"
      :class="[
        color ? 'border-dol-sub' : 'border-dol-dark-gray',
        'focus-within:border-dol-main',
        height === 'lg' ? 'h-[50px]' : 'h-[40px]',
      ]"
    >
      <input
        class="text-[15px] font-semibold w-full bg-transparent border-none outline-none h-full py-[15px] px-[20px] placeholder-dol-light-gray"
        v-model="value"
        :placeholder="placeholderText"
        :type="type"
      />
    </div>
  </div>
</template>
