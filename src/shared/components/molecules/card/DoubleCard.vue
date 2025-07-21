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
});
</script>

<template>
  <BaseCard :title="title" :subtitle="subtitle" :image="image">
    <template #right>
      <slot />
    </template>
  </BaseCard>
</template>
