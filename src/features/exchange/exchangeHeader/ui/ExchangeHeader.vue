<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { getLiveExchange } from '../services/ExchangeHeader.service';
import { Flags } from '@/asset/images';
import { formatNumber } from '@/shared/utils/format';

const isPC = useMediaQuery();

const { t } = useI18n();

const currencyIcon = {
  USD: Flags.usa,
  JPY: Flags.japan,
  EUR: Flags.eu,
  GBP: Flags.uk,
  CAD: Flags.canada,
  HKD: Flags.hongkong,
  CNY: Flags.china,
  THB: Flags.thailand,
  IDR: Flags.indonesia,
  VND: Flags.vietnam,
  RUB: Flags.russia,
  MYR: Flags.malaysia,
};

const exchangeRates = ref([]);

const fetchLiveExchange = async () => {
  const result = await getLiveExchange();

  if (result?.data) {
    exchangeRates.value = result.data.map((item) => {
      return {
        currency: item.currency,
        rate: formatNumber(item.exchangeRate),
        src: currencyIcon[item.currency],
      };
    });
  } else {
    exchangeRates.value = [];
  }
};

const currentIndex = ref(0);
let slideInterval = null;
let refreshInterval = null;

onMounted(async () => {
  await fetchLiveExchange();

  if (exchangeRates.value.length > 0) {
    slideInterval = setInterval(() => {
      currentIndex.value =
        (currentIndex.value + 1) % exchangeRates.value.length;
    }, 3000);
  }

  refreshInterval = setInterval(() => {
    fetchLiveExchange();
  }, 60000);
});

onBeforeUnmount(() => {
  clearInterval(slideInterval);
  clearInterval(refreshInterval);
});
</script>

<template>
  <header
    class="w-full h-[60px] bg-white fixed top-0 left-0 shadow-custom-shadow flex justify-start space-x-[10px] items-center px-[20px] cursor-default select-none"
    :class="isPC && 'max-w-[500px] left-1/2 -translate-x-1/2'"
  >
    <P1>{{ t('header.rate') }}</P1>
    <div
      v-if="exchangeRates.length"
      :key="currentIndex"
      class="flex items-center gap-[10px] animate-slide-up-pause"
    >
      <img
        :src="exchangeRates[currentIndex].src"
        :alt="exchangeRates[currentIndex].currency"
        class="w-[20px] h-[20px] rounded-full shadow-custom-shadow object-cover"
      />
      <P1>{{ exchangeRates[currentIndex].rate }}</P1>
    </div>
  </header>
</template>

<style scoped>
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
  animation: slide-up-pause 3s ease-in-out infinite;
}
</style>
