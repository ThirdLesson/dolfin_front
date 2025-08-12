<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const model = defineModel(); // 양방향 바인딩을 위한 변수
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  // i18n 키를 받을 수 있는 prop 추가
  labelKey: {
    type: String,
    default: '',
  },
  // 기본 선택 옵션의 i18n 키
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

// 안전한 번역 함수
const safeTranslate = (key, fallback = '') => {
  if (!key) return fallback;
  return te(key) ? t(key) : fallback;
};

// 옵션의 라벨을 가져오는 함수
const getTranslationKey = (option) => {
  // option.label이 이미 완전한 i18n 키인 경우 (예: 'options.exchange.getCash')
  if (option.label && option.label.includes('.')) {
    return option.label;
  }

  // labelKey가 있고 option에 labelKey나 value가 있는 경우
  if (props.labelKey) {
    const key = option.labelKey || option.value;
    return `${props.labelKey}.${key}`;
  }

  return null;
};

// 현재 선택된 옵션을 보여주기 위한 계산된 값
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

  // 선택된 옵션이 없을 때 기본값
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

  // 기본 라벨이 설정되어 있으면 번역, 아니면 기본 메시지
  return props.defaultLabelKey
    ? safeTranslate(props.defaultLabelKey, 'Select an option')
    : 'Select an option';
});

// 옵션 라벨을 번역하는 함수
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
      class="w-[150px] h-[45px] shadow-custom-shadow px-5 border-2 text-[15px] font-semibold rounded-md flex items-center justify-between cursor-pointer bg-white"
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
        class="w-[150px] h-[45px] px-4 py-2 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
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
