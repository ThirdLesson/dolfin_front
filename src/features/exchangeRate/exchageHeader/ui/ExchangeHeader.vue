<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import CanadaFlag from '@/asset/flag/canada.png';
import ChinaFlag from '@/asset/flag/china.png';
import EuFlag from '@/asset/flag/eu.png';
import HongkongFlag from '@/asset/flag/hongkong.png';
import IndonesiaFlag from '@/asset/flag/indonesia.png';
import JapanFlag from '@/asset/flag/japan.png';
import KoreaFlag from '@/asset/flag/korea.png';
import MalaysiaFlag from '@/asset/flag/malaysia.png';
import RussiaFlag from '@/asset/flag/russia.png';
import ThailandFlag from '@/asset/flag/thailand.png';
import UkFlag from '@/asset/flag/uk.png';
import UsaFlag from '@/asset/flag/usa.png';
import VietnamFlag from '@/asset/flag/vietnam.png';

const router = useRouter();
const route = useRoute();

const options = [
  {
    value: 'canada',
    rate: '123',
    src: CanadaFlag,
  },
  {
    value: 'china',
    rate: '2445',
    src: ChinaFlag,
  },
  {
    value: 'eu',
    rate: '134535',
    src: EuFlag,
  },
  {
    value: 'hongkong',
    rate: '14345',
    src: HongkongFlag,
  },
  {
    value: 'indonesia',
    rate: '14352355',
    src: IndonesiaFlag,
  },
  {
    value: 'japan',
    rate: '923',
    src: JapanFlag,
  },
  {
    value: 'korea',
    rate: '1000',
    src: KoreaFlag,
  },
  {
    value: 'malaysia',
    rate: '2376478',
    src: MalaysiaFlag,
  },
  {
    value: 'russia',
    rate: '2313',
    src: RussiaFlag,
  },
  {
    value: 'tailand',
    rate: '76645',
    src: ThailandFlag,
  },
  {
    value: 'uk',
    rate: '65',
    src: UkFlag,
  },
  {
    value: 'usa',
    rate: '12',
    src: UsaFlag,
  },
  {
    value: 'vietnam',
    rate: '5433647',
    src: VietnamFlag,
  },
];

const currentIndex = ref(0);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % options.length;
  }, 2000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <header
    class="w-full h-[60px] bg-white fixed top-0 left-0 shadow-custom-shadow flex justify-start space-x-[10px] items-center px-[20px]"
  >
    <P1>환율</P1>

    <div
      v-if="options.length"
      :key="currentIndex"
      class="flex items-center gap-[10px] animate-slide-up-pause"
    >
      <img
        :src="options[currentIndex].src"
        :alt="options[currentIndex].value"
        class="w-[20px] h-[20px] rounded-full shadow-custom-shadow object-cover"
      />
      <P1>{{ options[currentIndex].rate }}</P1>
    </div>
  </header>
</template>

<style>
@keyframes slide-up-pause {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  20%,
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.animate-slide-up-pause {
  animation: slide-up-pause 2s ease-in-out infinite;
}
</style>
