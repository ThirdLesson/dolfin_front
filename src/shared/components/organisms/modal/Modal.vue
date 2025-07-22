<script setup>
import LgMainButton from '../../atoms/button/LgMainButton.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';

const props = defineProps({
  title: String,
  buttonText: { type: String, default: '확인' },
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => emit('close');
const handleConfirm = () => {
  emit('confirm');
  emit('close');
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-t-2xl w-full mx-0 relative flex flex-col"
      @click.stop
    >
      <Head2 class="absolute top-[25px] left-[25px] text-black">
        {{ title }}
      </Head2>

      <button
        class="absolute top-[25px] right-[25px] text-black text-lg"
        @click="closeModal"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="p-6 pt-[80px] flex-1 overflow-y-auto">
        <slot />
      </div>

      <div
        class="sticky bottom-0 bg-white p-6 border-none shadow-none before:hidden after:hidden"
      >
        <LgMainButton class="w-full" @click="handleConfirm">
          {{ buttonText }}
        </LgMainButton>
      </div>
    </div>
  </div>
</template>
