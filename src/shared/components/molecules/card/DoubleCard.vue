<script setup>
import BaseCard from './BaseCard.vue';

const props = defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  image: {
    type: String,
  },
  showShadow: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <BaseCard
    :title="title"
    :subtitle="subtitle"
    :image="image"
    :showShadow="showShadow"
  >
    <template #right>
      <slot />
    </template>
  </BaseCard>
</template>
