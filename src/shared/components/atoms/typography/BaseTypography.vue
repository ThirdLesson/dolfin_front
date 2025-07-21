<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
});

const typoTypeMap = {
  Head1: 'text-[30px] font-bold',
  Head2: 'text-[20px] font-bold',
  Head3: 'text-[15px] font-bold',
  Subtitle1: 'text-[20px] font-semibold',
  Subtitle2: 'text-[15px] font-semibold',
  Subtitle3: 'text-[12px] font-semibold',
  P1: 'text-[12px] font-medium',
  P2: 'text-[10px] font-medium',
  Caption1: 'text-[12px] font-light',
  Caption2: 'text-[10px] font-light',
};
</script>

<template>
  <p :class="[typoTypeMap[type], className]">
    <slot />
  </p>
</template>

<style lang="scss" scoped></style>
