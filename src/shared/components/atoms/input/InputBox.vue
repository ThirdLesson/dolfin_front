<script setup>
import BaseInput from './BaseInput.vue';

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <BaseInput
    variant="box"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
