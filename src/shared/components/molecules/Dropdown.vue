<script setup>
import { ref, computed } from 'vue';
import Subtitle2 from '../atoms/typography/Subtitle2.vue';

const model = defineModel(); // 양방향 바인딩을 위한 변수
const props = defineProps({
  title: String,
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const isOpen = ref(false);

const select = (option) => {
  model.value = option;
  isOpen.value = false;
};

// 현재 선택된 옵션의 label 값을 보여주기 위한 계산된 값
const selectedLabel = computed(() => {
  return (
    props.options.find((opt) => opt.value === model.value)?.label ||
    props.options[0].label
  );
});
</script>
<template>
  <div class="w-full flex flex-col gap-[10px]">
    <Subtitle2 v-if="props.title">{{ props.title }}</Subtitle2>
    <div class="relative">
      <div
        :class="isOpen ? 'border-dol-main' : 'border-dol-dark-gray'"
        class="h-[50px] px-5 border-2 border-dol-dark-gray text-[15px] font-semibold rounded-sm flex items-center justify-between cursor-pointer"
        @click="isOpen = !isOpen"
      >
        {{ selectedLabel }}
        <i
          :class="isOpen ? 'text-dol-main' : 'text-dol-dark-gray'"
          class="bi bi-caret-down-fill"
        />
      </div>
      <ul
        v-if="isOpen"
        class="absolute top-[48px] z-10 mt-1 w-full border border-dol-dark-gray rounded bg-white shadow"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          @click="select(option.value)"
          class="h-[45px] px-4 py-2 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
