<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import NavBar from './NavBar.vue';
import Header from '../molecules/Header.vue';
import ExchangeHeader from '@/features/exchange/exchageHeader/ui/ExchangeHeader.vue';
import useMediaQuery from '@/shared/hooks/useMediaQuery';

const route = useRoute();
const router = useRouter();
const isPC = useMediaQuery();
const { t } = useI18n();

// headerKey 우선 사용 + 문자열 header는 폴백
const headerTitle = computed(() => {
  const key = route.meta?.headerKey;
  if (key) return t(key);
  return typeof route.meta?.header === 'string' ? route.meta.header : '';
});

const showExchangeHeader = computed(() => route.meta.exchangeHeader === true);
const showNavBar = computed(() => route.meta.navBar !== false);
const hasCustomBack = computed(() => route.meta.customBack === true);
const hasbgColor = computed(() => route.meta.bgColor === true);

const handleCustomBack = () => {
  const onBack = route.meta.onBack;
  if (typeof onBack === 'function') onBack();
  else router.back();
};
</script>

<template>
  <div
    class="h-screen flex flex-col mx-auto overflow-y-auto w-full"
    :class="[
      isPC && 'max-w-[500px] shadow-custom-shadow',
      hasbgColor && 'bg-dol-light-sub',
    ]"
  >
    <header class="w-full fixed top-0 left-0 z-40 shadow-custom-shadow">
      <Header
        v-if="headerTitle"
        :hasCustomBack="hasCustomBack"
        @customBack="handleCustomBack"
      >
        {{ headerTitle }}
      </Header>
      <ExchangeHeader v-if="showExchangeHeader" />
    </header>

    <main
      class="flex-1 flex flex-col p-5"
      :class="headerTitle && 'pt-[80px] pb-[100px]'"
    >
      <slot />
    </main>

    <footer v-if="showNavBar" class="w-full fixed bottom-0 left-0 z-40">
      <NavBar />
    </footer>
  </div>
</template>
