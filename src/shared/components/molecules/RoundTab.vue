<script setup>
import { computed } from 'vue';
import P1 from '../atoms/typography/P1.vue';

const model = defineModel();
const props = defineProps({
  opt1: {
    type: String,
    required: true,
  },
  opt2: {
    type: String,
    required: true,
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
  <div class="h-[40px] w-fit rounded-md bg-dol-sub flex p-[5px] select-none">
    <div
      class="flex-1 flex px-4 items-center justify-center rounded-md cursor-pointer transition-all"
      :class="selectedOption === props.opt1 ? 'bg-white' : 'text-dol-dark-gray'"
      @click="select(props.opt1)"
    >
      <P1 class="whitespace-nowrap">{{ props.opt1 }}</P1>
    </div>

    <div
      class="flex-1 flex px-4 items-center justify-center rounded-md cursor-pointer transition-all"
      :class="selectedOption === props.opt2 ? 'bg-white' : 'text-dol-dark-gray'"
      @click="select(props.opt2)"
    >
      <P1 class="whitespace-nowrap">{{ props.opt2 }}</P1>
    </div>
  </div>
</template>
