<script setup>
import { computed } from 'vue';
import P1 from '../atoms/typography/P1.vue';
import { useI18n } from 'vue-i18n';

const model = defineModel();
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n(); 

const localizedOptions = computed(() =>
  props.options.map((o) => ({
    ...o,
    _label: typeof o.label === 'string' ? t(o.label) : o.label,
  })),
);

const toggle = (optionValue) => {
  if (props.multiple) {
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
    <!-- 변경: props.options → localizedOptions, option.label → option._label -->
    <button
      v-for="option in localizedOptions"
      :key="option.value"
      @click="toggle(option.value)"
      class="h-[35px] px-9 flex justify-center items-center border-2 rounded-sm"
      :class="
        isSelected(option.value)
          ? 'bg-dol-sub border-dol-main'
          : 'border-dol-sub '
      "
    >
      <P1 class="text-dol-dark whitespace-nowrap">{{ option._label }}</P1>
    </button>
  </div>
</template>
