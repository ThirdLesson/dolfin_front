<script setup>
import Subtitle1 from './typography/Subtitle1.vue';
const props = defineProps({
  numbers: { type: Array, required: true },
});
defineEmits(['select', 'reshuffle', 'delete']);
</script>

<template>
  <div
    class="grid grid-cols-3 grid-rows-4 gap-2 w-full h-full justify-items-center"
  >
    <button
      v-for="n in numbers.slice(0, 9)"
      :key="n"
      @click="$emit('select', n)"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>{{ n }}</Subtitle1>
    </button>

    <button
      @click="$emit('reshuffle')"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>재배열</Subtitle1>
    </button>

    <button
      v-if="numbers[9] !== undefined"
      @click="$emit('select', numbers[9])"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>{{ numbers[9] }}</Subtitle1>
    </button>

    <button
      @click="$emit('delete')"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>←</Subtitle1>
    </button>
  </div>
</template>
