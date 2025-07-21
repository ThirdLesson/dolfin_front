<script setup>
import BaseButton from './BaseButton.vue';
import Subtitle1 from '../typography/Subtitle1.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <BaseButton @click="emit('click', $event)" :disabled="disabled">
    <Subtitle1>
      <slot />
    </Subtitle1>
  </BaseButton>
</template>
