<script setup>
import { onMounted, onUnmounted } from 'vue';

import LgMainButton from '../atoms/button/LgMainButton.vue';
import Head2 from '../atoms/typography/Head2.vue';
import useMediaQuery from '@/shared/hooks/useMediaQuery';

const props = defineProps({
  title: String,
  buttonText: { type: String, default: '확인' },
  showButton: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['close', 'confirm']);

const closeModal = () => emit('close');
const handleConfirm = () => {
  emit('confirm');
  emit('close');
};

const isPC = useMediaQuery();

// 모달이 열릴 때 body 스크롤 막기
onMounted(() => {
  document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
    :class="isPC && 'max-w-[500px] left-1/2 -translate-x-1/2'"
    @click="closeModal"
  >
    <div
      class="max-h-[75vh] bg-white rounded-t-lg w-full mx-0 relative flex flex-col p-[25px]"
      @click.stop
    >
      <div class="flex justify-between items-center mb-[25px]">
        <Head2>
          {{ title }}
        </Head2>
        <button @click="closeModal" class="cursor-pointer">
          <i class="bi bi-x-lg" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-[2px]">
        <slot />
      </div>
      <div v-if="showButton" class="sticky bottom-0 bg-white mt-[15px]">
        <LgMainButton @click="handleConfirm">
          {{ buttonText }}
        </LgMainButton>
      </div>
    </div>
  </div>
</template>
