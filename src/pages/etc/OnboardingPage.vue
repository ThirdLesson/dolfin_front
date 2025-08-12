<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import { Onboardings } from '@/asset/images';

const router = useRouter();
const { t, tm } = useI18n();

const currentIndex = ref(0);

const getLines = (key) => {
  const v = tm(key);
  return Array.isArray(v) ? v : v ? [String(v)] : [];
};

const slides = computed(() => [
  {
    img: Onboardings.onboarding1,
    titleLines: getLines('slides.slide1.text'),
    subText: t('slides.slide1.subText'),
  },
  {
    img: Onboardings.onboarding2,
    titleLines: getLines('slides.slide2.text'),
    subText: t('slides.slide2.subText'),
  },
  {
    img: Onboardings.onboarding3,
    titleLines: getLines('slides.slide3.text'),
    subText: t('slides.slide3.subText'),
  },
]);

let swiperApi = null;

const handleSwiper = (s) => {
  swiperApi = s || null;
};
const handleSlideChange = (s) => {
  currentIndex.value = s?.activeIndex ?? 0;
};

const onNext = () => {
  if (currentIndex.value === slides.value.length - 1) {
    router.replace(URL.PAGE.LOGIN);
  } else {
    swiperApi?.slideNext?.();
  }
};
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <Swiper
      :modules="[Pagination]"
      :pagination="{ clickable: true }"
      @swiper="handleSwiper"
      @slideChange="handleSlideChange"
      class="w-full h-full"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div
          class="flex flex-col items-center justify-center h-full text-center"
        >
          <img :src="slide.img" class="w-[70%] max-w-xs mb-8" />
          <div class="text-base leading-relaxed flex flex-col">
            <Head2
              v-for="(line, i) in slide.titleLines"
              :key="i"
              class="font-corelight"
              >{{ line }}</Head2
            >
            <P1 class="mt-2 font-corelight whitespace-pre-line">{{
              slide.subText
            }}</P1>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="flex items-center justify-between mt-5 p-5">
      <button @click="router.replace(URL.PAGE.LOGIN)">
        <P1 class="text-dol-light-gray">{{ t('skip') }}</P1>
      </button>

      <button
        v-if="currentIndex === slides.length - 1"
        class="w-20 h-8 rounded-lg bg-dol-main"
        @click="onNext"
      >
        <P2 class="text-white">{{ t('start') }}</P2>
      </button>
      <button
        v-else
        class="w-16 h-8 rounded-lg bg-dol-main flex items-center justify-center"
        @click="onNext"
      >
        <i class="bi bi-arrow-right text-white text-xl" />
      </button>
    </div>
  </div>
</template>
