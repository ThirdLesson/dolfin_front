<script setup>
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';

const props = defineProps({
  products: Array,
});
const emit = defineEmits(['select']);
</script>

<template>
  <div class="flex flex-col px-4 py-4 space-y-3 overflow-y-auto">
    <DoubleCard
      v-for="product in props.products"
      :key="product.id"
      :image="product.logo"
      :title="product.title"
      :subtitle="product.bank"
      @click="emit('select', product)"
    >
      <div class="flex flex-col text-right">
        <P2 class="text-dol-dark-gray">기본 금리 {{ product.basicrate }}%</P2>
        <P2 class="text-dol-main">최대 금리 {{ product.maximumrate }}%</P2>
      </div>
    </DoubleCard>
  </div>
</template>
