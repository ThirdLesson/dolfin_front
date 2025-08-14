<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import InputTel from '@/features/transaction/remit/ui/InputTel.vue';
import InputAccount from '@/features/transaction/remit/ui/InputAccount.vue';

const route = useRoute();
const type = computed(() => route.query.type);
</script>

<template>
  <div class="flex flex-col gap-5 h-full overflow-y-auto select-none">
    <Subtitle1>어디로 보낼까요?</Subtitle1>
    <InputAccount v-if="type === 'account'" />
    <InputTel v-else-if="type === 'tel'" />
  </div>
</template>
