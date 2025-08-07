<script setup>
import { RouterView, useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Layout from '@/shared/components/organisms/Layout.vue';

const router = useRouter();

const isFirstVisit = localStorage.getItem('hasVisited');

if (!isFirstVisit) {
  localStorage.setItem('hasVisited', 'true');
  router.replace(URL.PAGE.ONBOARDING);
} else {
  router.replace(URL.PAGE.MAIN);
}
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>
