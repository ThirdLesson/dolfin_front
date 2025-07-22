<script setup>
import { computed } from 'vue';
import P1 from '../atoms/typography/P1.vue';

const model = defineModel();
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const select = (option) => {
  model.value = option;
};

const selectedOption = computed(() => {
  return model.value;
});
</script>
<template>
  <div class="w-full flex flex-wrap gap-2">
    <button
      v-for="option in props.options"
      :key="option.value"
      @click="select(option.value)"
      class="h-[35px] px-9 flex justify-center items-center border-2 rounded-sm"
      :class="
        selectedOption === option.value
          ? 'bg-dol-sub border-dol-main'
          : 'border-dol-sub '
      "
    >
      <P1 class="text-dol-dark whitespace-nowrap">{{ option.label }}</P1>
    </button>
  </div>
</template>
