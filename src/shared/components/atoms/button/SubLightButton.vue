<script setup>
import BaseButton from './BaseButton.vue';
import P1 from '../typography/P1.vue';

const emit = defineEmits(['click']);
</script>

<template>
  <BaseButton size="medium" variant="secondary" @click="emit('click', $event)">
    <P1>
      <slot />
    </P1>
  </BaseButton>
</template>
