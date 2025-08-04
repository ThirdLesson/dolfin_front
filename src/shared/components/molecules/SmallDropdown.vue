<script setup>
import { ref, computed } from 'vue';

const model = defineModel(); // 양방향 바인딩을 위한 변수
const props = defineProps({
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

// 현재 선택된 옵션을 보여주기 위한 계산된 값
const selectedLabel = computed(() => {
  return (
    props.options.find((opt) => opt.value === model.value)?.label ||
    props.options[0].label
  );
});
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
          {{ option.label }}
        </div>
      </li>
    </ul>
  </div>
</template>
