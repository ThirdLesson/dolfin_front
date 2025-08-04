<script setup>
import Subtitle3 from '../typography/Subtitle3.vue';

const props = defineProps({
  title: String,
  placeholder: {
    type: String,
    default: '텍스트를 입력하세요.',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const value = defineModel();
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
          :placeholder="placeholder"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>
