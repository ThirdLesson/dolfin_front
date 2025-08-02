<script setup>
import P1 from '@/shared/components/atoms/typography/P1.vue';

const emit = defineEmits(['quickAdd']);

const quickTabs = [
  { label: '+1천', value: 1000 },
  { label: '+5천', value: 5000 },
  { label: '+1만', value: 10000 },
  { label: '+10만', value: 100000 },
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
