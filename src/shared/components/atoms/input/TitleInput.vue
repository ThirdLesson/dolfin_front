<script setup>
import { computed } from 'vue';
import Head3 from '../typography/Head3.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
});

const value = defineModel();
const placeholderText = computed(() => props.placeholder || t('common.input'));
</script>

<template>
  <div class="w-full">
    <Head3 class="mb-2 text-dol-main">{{ title }}</Head3>
    <div class="border-b-2 border-dol-main">
      <input
        class="text-[15px] font-bold w-full bg-transparent border-none outline-none pb-2 placeholder-black"
        v-model="value"
        :placeholder="placeholderText"
        :type="type"
      />
    </div>
  </div>
</template>
