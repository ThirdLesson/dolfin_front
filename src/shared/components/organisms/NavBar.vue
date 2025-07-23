<script setup>
import { useRouter, useRoute } from 'vue-router';
import URL from '@/shared/constants/URL';
import P2 from '../atoms/typography/P2.vue';
import useMediaQuery from '@/shared/hooks/useMediaQuery';

import mainIcon from '@/asset/icon/main.png';
import exchangeIcon from '@/asset/icon/exchange.png';
import mapIcon from '@/asset/icon/map.png';
import remitIcon from '@/asset/icon/remit.png';
import ActiveMainIcon from '@/asset/icon/mainActive.png';
import ActiveExchangeIcon from '@/asset/icon/exchangeActive.png';
import ActiveMapIcon from '@/asset/icon/mapActive.png';
import ActiveRemitIcon from '@/asset/icon/remitActive.png';

const router = useRouter();
const route = useRoute();

const isPC = useMediaQuery();

const options = [
  {
    value: 'main',
    label: '메인',
    src: mainIcon,
    activeSrc: ActiveMainIcon,
    href: URL.PAGE.MAIN,
  },
  {
    value: 'exchange',
    label: '환율조회',
    src: exchangeIcon,
    activeSrc: ActiveExchangeIcon,
    href: URL.PAGE.EXCHANGE_RATE_CHECK,
  },
  {
    value: 'map',
    label: '스마트맵',
    src: mapIcon,
    activeSrc: ActiveMapIcon,
    href: URL.PAGE.MAP,
  },
  {
    value: 'groupRemittance',
    label: '공동송금',
    src: remitIcon,
    activeSrc: ActiveRemitIcon,
    href: URL.PAGE.GROUP_REMITTANCE,
  },
];

const selectOption = (option) => {
  const selected = options.find((opt) => opt.value === option);
  if (!selected) return;

  router.push(selected.href);
};
</script>

<template>
  <nav
    class="w-full h-[80px] bg-white fixed bottom-0 left-0 shadow-custom-shadow flex justify-between items-center px-7"
    :class="isPC && 'max-w-[500px] left-1/2 -translate-x-1/2'"
  >
    <button
      v-for="option in options"
      :key="option.value"
      @click="selectOption(option.value)"
      class="flex flex-col gap-[5px] items-center"
    >
      <img
        :src="route.path === option.href ? option.activeSrc : option.src"
        :alt="option.value"
      />
      <P2
        class="whitespace-nowrap pointer-events-none"
        :class="
          route.path === option.href ? 'text-dol-dark' : 'text-dol-light-gray'
        "
        >{{ option.label }}</P2
      >
    </button>
  </nav>
</template>
