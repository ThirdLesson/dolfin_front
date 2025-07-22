<script setup>
import { ref, computed } from 'vue';
import Subtitle2 from '../atoms/typography/Subtitle2.vue';

const selected = defineModel('selected');
const props = defineProps({
  title: String,
  options: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(false);

const selectOption = (option) => {
  selected.value = option.value;
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  return (
    props.options.find((opt) => opt.value === selected.value)?.label ||
    props.options[0]
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
          @click="selectOption(option)"
          class="h-[45px] px-4 py-2 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
