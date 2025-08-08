<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import { Onboardings } from '@/asset/images';

const router = useRouter();

const currentIndex = ref(0);
const swiperInstance = ref(null);

const slides = [
  {
    img: Onboardings.onboarding1,
    text: ['외국인도 가입 가능한 금융 상품 찾기,', '환율 조회, 해외 송금...'],
    subText: '너무 복잡하진 않으셨나요?',
  },
  {
    img: Onboardings.onboarding2,
    text: ['환율 최대 혜택 안내부터', '공동 해외 송금까지 한번에'],
    subText: 'DolFin이 도와드릴게요.',
  },
  {
    img: Onboardings.onboarding3,
    text: ['DolFin으로 시작하는 스마트한 전자 지갑'],
    subText:
      '수수료 절약, 간편한 사용, 걱정 없는 보안까지 \n금융 스트레스에서 벗어나 보세요.',
  },
];

const onNext = () => {
  if (currentIndex.value === slides.length - 1) {
    router.replace(URL.PAGE.SIGNUP);
  } else {
    swiperInstance.value?.slideNext();
  }
};
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <Swiper
      :modules="[Pagination]"
      :pagination="{ clickable: true }"
      @swiper="(swiper) => (swiperInstance = swiper)"
      @slideChange="(swiper) => (currentIndex = swiper.activeIndex)"
      class="w-full h-full"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div
          class="flex flex-col items-center justify-center h-full text-center"
        >
          <img :src="slide.img" class="w-[70%] max-w-xs mb-8" />
          <div class="text-base leading-relaxed flex flex-col">
            <Head2
              v-for="line in slide.text"
              :key="line"
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
      <button @click="router.replace(URL.PAGE.SIGNUP)">
        <P1 class="text-dol-light-gray">SKIP</P1>
      </button>

      <button
        v-if="currentIndex === slides.length - 1"
        class="w-20 h-8 rounded-lg bg-dol-main"
        @click="onNext"
      >
        <P2 class="text-white">시작하기</P2>
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
