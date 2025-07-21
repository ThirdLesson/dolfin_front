<script setup>
import BaseButton from './BaseButton.vue';
import Subtitle1 from '../typography/Subtitle1.vue';

const emit = defineEmits(['click']);
</script>

<template>
  <BaseButton size="large" variant="primary" @click="emit('click', $event)">
    <Subtitle1>
      <slot />
    </Subtitle1>
  </BaseButton>
</template>
