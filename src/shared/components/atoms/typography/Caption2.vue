<script setup>
import BaseTypography from './BaseTypography.vue';

const props = defineProps({
  className: {
    type: String,
  },
});
</script>

<template>
  <BaseTypography type="Caption2" :class="className">
    <slot />
  </BaseTypography>
</template>
