<script setup>
import BaseButton from './BaseButton.vue';
import P1 from '../typography/P1.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <BaseButton
    size="medium"
    color="main"
    @click="emit('click', $event)"
    :disabled="disabled"
  >
    <P1>
      <slot />
    </P1>
  </BaseButton>
</template>
