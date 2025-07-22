<script setup>
import { useRouter, useRoute } from 'vue-router';
import URL from '@/shared/constants/URL';
import P2 from '../atoms/typography/P2.vue';
import mainIcon from '@/asset/icons/main.png';
import exchangeIcon from '@/asset/icons/exchange.png';
import mapIcon from '@/asset/icons/map.png';
import remitIcon from '@/asset/icons/remit.png';
import ActiveMainIcon from '@/asset/icons/mainActive.png';
import ActiveExchangeIcon from '@/asset/icons/exchangeActive.png';
import ActiveMapIcon from '@/asset/icons/mapActive.png';
import ActiveRemitIcon from '@/asset/icons/remitActive.png';

const router = useRouter();
const route = useRoute();

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
    class="fixed bottom-0 left-0 w-full h-[80px] shadow-custom-shadow flex justify-between items-center px-7"
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
        class="whitespace-nowrap"
        :class="
          route.path === option.href ? 'text-dol-dark' : 'text-dol-light-gray'
        "
        >{{ option.label }}</P2
      >
    </button>
  </nav>
</template>
