<script setup>
import BaseTypography from './BaseTypography.vue';

const props = defineProps({
  className: {
    type: String,
  },
});
</script>

<template>
  <BaseTypography type="Head3" :class="className">
    <slot />
  </BaseTypography>
</template>
