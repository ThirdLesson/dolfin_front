<script setup>
import Head3 from '../../atoms/typography/Head3.vue';
import Subtitle3 from '../../atoms/typography/Subtitle3.vue';

const props = defineProps({
  title: String,
  subtitle: String,
  image: String,
  showShadow: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="w-full flex-col bg-white">
    <div
      class="flex rounded-sm p-5 gap-[10px] items-center justify-between"
      :class="
        showShadow ? 'shadow-custom-shadow' : 'border border-dol-light-gray'
      "
    >
      <div class="flex gap-[10px] items-center">
        <div
          v-if="image"
          class="w-[35px] h-[35px] bg-dol-point rounded-full flex items-center justify-center shrink-0"
        >
          <img :src="image" :alt="image" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col" :class="!image && 'gap-[10px]'">
          <Head3>{{ title }}</Head3>
          <Subtitle3 v-if="subtitle" class="text-dol-dark-gray">{{
            subtitle
          }}</Subtitle3>
          <slot name="detail" />
        </div>
      </div>
      <slot name="right" />
    </div>
  </div>
</template>
