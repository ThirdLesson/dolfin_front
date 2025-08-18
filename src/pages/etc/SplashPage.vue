<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import { Logos } from '@/asset/images';

const router = useRouter();

const splashVideo = Logos.splash;

const isFirstVisit = localStorage.getItem('hasVisited');
const isLoggedIn = !!localStorage.getItem('accessToken');

onMounted(() => {
  setTimeout(() => {
    if (!isFirstVisit) {
      localStorage.setItem('hasVisited', 'true');
      router.replace(URL.PAGE.ONBOARDING);
      return;
    }

    if (isLoggedIn) {
      router.replace(URL.PAGE.MAIN);
    } else {
      router.replace(URL.PAGE.LOGIN);
    }
  }, 2000);
});
</script>

<template>
  <div
    class="pb-10 h-full w-full flex flex-col items-center justify-end relative select-none"
  >
    <video
      :src="splashVideo"
      autoplay
      muted
      playsinline
      preload="auto"
      width="720"
      height="720"
      class="w-[70%] object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
    />
    <p class="font-jua text-dol-dark-gray text-[40px] z-10">DolFin</p>
  </div>
</template>
