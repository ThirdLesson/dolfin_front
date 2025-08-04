<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GroupGuide from '@/features/groupRemit/ui/GroupGuide.vue';
import GroupCollect from '@/features/groupRemit/ui/GroupCollect.vue';

const route = useRoute();
const router = useRouter();

const showGuide = ref(true);

onMounted(() => {
  route.meta.onBack = () => {
    if (!showGuide.value) {
      showGuide.value = true;
    } else {
      router.back();
    }
  };
});
</script>

<template>
  <GroupGuide v-if="showGuide" @click="showGuide = false" />
  <GroupCollect v-else />
</template>
