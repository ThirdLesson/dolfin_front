<script setup>
import P1 from '@/shared/components/atoms/typography/P1.vue';

const props = defineProps({
  bankType: String,
  accountNumber: String,
});
const emit = defineEmits(['click']);
</script>

<template>
  <div class="flex cursor-pointer justify-end" @click="emit('click')">
    <P1 class="text-dol-dark-gray">
      충전 계좌: {{ props.bankType }} {{ props.accountNumber }}
    </P1>
    <i class="bi bi-caret-down-fill ml-1" />
  </div>
</template>
