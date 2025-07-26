<script setup>
import { computed } from 'vue';
import P1 from '../atoms/typography/P1.vue';

const model = defineModel();
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false, // 기본은 단일 선택
  },
});

const toggle = (optionValue) => {
  if (props.multiple) {
    // 다중 선택 모드 (배열 기반)
    if (!Array.isArray(model.value)) {
      model.value = [];
    }
    const idx = model.value.indexOf(optionValue);
    if (idx > -1) {
      model.value.splice(idx, 1);
    } else {
      model.value.push(optionValue);
    }
  } else {
    // 단일 선택 모드
    model.value = optionValue;
  }
};

const isSelected = (optionValue) => {
  if (props.multiple) {
    return Array.isArray(model.value) && model.value.includes(optionValue);
  }
  return model.value === optionValue;
};
</script>
<template>
  <div class="w-full flex flex-wrap gap-2">
    <button
      v-for="option in props.options"
      :key="option.value"
      @click="toggle(option.value)"
      class="h-[35px] px-9 flex justify-center items-center border-2 rounded-sm"
      :class="
        isSelected(option.value)
          ? 'bg-dol-sub border-dol-main'
          : 'border-dol-sub '
      "
    >
      <P1 class="text-dol-dark whitespace-nowrap">{{ option.label }}</P1>
    </button>
  </div>
</template>
