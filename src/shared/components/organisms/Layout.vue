<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from './NavBar.vue';
import Header from '../molecules/Header.vue';

const route = useRoute();

const headerText = computed(() => route.meta.header);
const showNavBar = computed(() => route.meta.navBar !== false);
</script>

<template>
  <div class="h-screen flex flex-col">
    <header
      v-if="headerText"
      class="w-full fixed top-0 left-0 z-40 overflow-y-auto shadow-custom-shadow"
    >
      <Header>{{ headerText }}</Header>
    </header>

    <main
      class="flex-1 flex flex-col p-5"
      :class="headerText && 'pt-[80px] pb-[100px]'"
    >
      <slot />
    </main>

    <footer v-if="showNavBar" class="w-full fixed bottom-0 left-0 z-40">
      <NavBar />
    </footer>
  </div>
</template>
