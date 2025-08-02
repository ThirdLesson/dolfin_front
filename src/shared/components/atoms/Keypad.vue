<script setup>
import Subtitle1 from './typography/Subtitle1.vue';

const props = defineProps({
  numbers: { type: Array, required: true },
  showDoubleZero: { type: Boolean, default: false },
  heightFull: { type: Boolean, default: true },
});

const emit = defineEmits(['select', 'reshuffle', 'delete']);
</script>

<template>
  <div
    class="grid grid-cols-3 grid-rows-4 gap-2 w-full min-h-[20vh] justify-items-center"
    :class="heightFull && 'h-full'"
  >
    <button
      v-for="num in numbers.slice(0, 9)"
      :key="num"
      @click="emit('select', num)"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>{{ num }}</Subtitle1>
    </button>

    <button
      v-if="!showDoubleZero"
      @click="emit('reshuffle')"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>재배열</Subtitle1>
    </button>

    <button
      v-else
      @click="emit('select', '00')"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>00</Subtitle1>
    </button>

    <button
      v-if="numbers[9] !== undefined"
      @click="emit('select', numbers[9])"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>{{ numbers[9] }}</Subtitle1>
    </button>

    <button
      @click="emit('delete')"
      class="flex items-center justify-center aspect-square flex-grow bg-transparent cursor-pointer focus:outline-none active:outline-none"
    >
      <Subtitle1>←</Subtitle1>
    </button>
  </div>
</template>
