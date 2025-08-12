<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const model = defineModel();
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  labelKey: {
    type: String,
    default: '',
  },
  defaultLabelKey: {
    type: String,
    default: '',
  },
});

const { t, te } = useI18n();
const isOpen = ref(false);

const select = (option) => {
  model.value = option;
  isOpen.value = false;
};

const safeTranslate = (key, fallback = '') => {
  if (!key) return fallback;
  return te(key) ? t(key) : fallback;
};

const getTranslationKey = (option) => {
  if (option.label && option.label.includes('.')) {
    return option.label;
  }

  if (props.labelKey) {
    const key = option.labelKey || option.value;
    return `${props.labelKey}.${key}`;
  }

  return null;
};

const selectedLabel = computed(() => {
  const selectedOption = props.options.find((opt) => opt.value === model.value);

  if (selectedOption) {
    const translationKey = getTranslationKey(selectedOption);
    if (translationKey) {
      return safeTranslate(
        translationKey,
        selectedOption.label || selectedOption.value,
      );
    }
    return selectedOption.label || selectedOption.value;
  }

  if (props.options.length > 0) {
    const defaultOption = props.options[0];
    const translationKey = getTranslationKey(defaultOption);
    if (translationKey) {
      return safeTranslate(
        translationKey,
        defaultOption.label || defaultOption.value,
      );
    }
    return defaultOption.label || defaultOption.value;
  }

  return props.defaultLabelKey
    ? safeTranslate(props.defaultLabelKey, 'Select an option')
    : 'Select an option';
});

const getOptionLabel = (option) => {
  const translationKey = getTranslationKey(option);
  if (translationKey) {
    return safeTranslate(translationKey, option.label || option.value);
  }
  return option.label || option.value;
};
</script>

<template>
  <div class="relative">
    <div
      class="w-[160px] h-[45px] shadow-custom-shadow px-5 border-2 text-[15px] font-semibold rounded-md flex items-center justify-between cursor-pointer bg-white"
      :class="[isOpen ? 'border-dol-dark-gray' : 'border-dol-light-gray']"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2 whitespace-nowrap text-dol-dark-gray">
        {{ selectedLabel }}
      </div>
      <i
        :class="isOpen ? 'text-dol-dark-gray' : 'text-dol-light-gray'"
        class="bi bi-caret-down-fill"
      />
    </div>
    <ul
      v-if="isOpen"
      class="absolute top-[45px] z-10 mt-1 border border-dol-dark-gray rounded bg-white shadow"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        @click="select(option.value)"
        class="w-[160px] h-[45px] px-4 py-2 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
      >
        <div
          class="flex items-center gap-[15px] whitespace-nowrap text-dol-dark-gray"
        >
          {{ getOptionLabel(option) }}
        </div>
      </li>
    </ul>
  </div>
</template>
