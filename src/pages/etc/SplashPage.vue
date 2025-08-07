<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import { Logos } from '@/asset/images';
import { useUserStore } from '@/entities/user/user.store';

const router = useRouter();
const userStore = useUserStore();

const splashGif = Logos.splash;

onMounted(() => {
  setTimeout(() => {
    if (userStore.isLoggedIn) {
      router.replace(URL.PAGE.MAIN);
    } else {
      router.replace(URL.PAGE.LOGIN);
    }
  }, 3000);
});
</script>

<template>
  <div
    class="pb-10 h-full w-full flex flex-col items-center justify-end relative"
  >
    <img
      :src="splashGif"
      class="w-[70%] object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <p class="font-jua text-dol-dark-gray text-[40px] z-10">DolFin</p>
  </div>
</template>
