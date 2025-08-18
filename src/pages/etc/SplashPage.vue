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
    class="pb-10 h-full w-full flex flex-col items-center justify-end gap-20 relative select-none overflow-hidden"
  >
    <div
      class="relative w-[70%] max-w-[720px] overflow-hidden bg-white"
      :style="{ aspectRatio: '1080 / 1920' }"
    >
      <video
        :src="splashVideo"
        autoplay
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover block origin-center transform-gpu scale-[1.01] bg-white"
      />
    </div>
    <p class="font-jua text-dol-dark-gray text-[40px] z-10">DolFin</p>
  </div>
</template>
