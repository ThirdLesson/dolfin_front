<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Step1 from '@/features/user/account/ui/Step1.vue';
import Step2 from '@/features/user/account/ui/Step2.vue';

const router = useRouter();
const route = useRoute();

const step = ref(1);

const currentStep = computed(() => {
  switch (step.value) {
    case 1:
      return Step1;
    case 2:
      return Step2;
  }
});

onMounted(() => {
  route.meta.onBack = () => {
    if (step.value > 1) step.value--;
  };
});
</script>

<template>
  <div class="h-full flex flex-col justify-between overflow-y-auto">
    <component
      :is="currentStep"
      @next="() => step++"
      @complete="router.push('/main')"
    />
  </div>
</template>
