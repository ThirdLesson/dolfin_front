<script setup>
import Keypad from '@/shared/components/atoms/Keypad.vue';

const emit = defineEmits(['select', 'delete']);
</script>

<template>
  <div class="flex-1 overflow-auto flex flex-col justify-center">
    <Keypad
      :numbers="[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
      :showDoubleZero="true"
      :heightFull="false"
      class="gap-[40px]"
      @select="(num) => emit('select', num)"
      @delete="emit('delete')"
    />
  </div>
</template>
