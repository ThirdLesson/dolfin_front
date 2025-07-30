<script setup>
import { useRouter } from 'vue-router';
import Head2 from '../atoms/typography/Head2.vue';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import chevron from '@/asset/chevron-left.png';

const props = defineProps({
  hasCustomBack: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['customBack']);

const router = useRouter();
const isPC = useMediaQuery();

const goBack = () => {
  if (props.hasCustomBack) emit('customBack');
  else router.back();
};
</script>

<template>
  <div
    class="w-full h-[60px] bg-white fixed top-0 left-0 flex items-center gap-5 px-5 shadow-custom-shadow"
    :class="isPC && 'max-w-[500px] left-1/2 -translate-x-1/2'"
  >
    <div class="cursor-pointer flex justify-center items-center">
      <img :src="chevron" @click="goBack" />
    </div>
    <Head2>
      <slot />
    </Head2>
  </div>
</template>
