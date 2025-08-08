<script setup>
import { ref } from 'vue';
import RecommendationHeader from '@/features/recommendation/ui/RecommendationHeader.vue';
import ProductList from '@/features/recommendation/ui/ProductList.vue';
import ProductInfoModal from '@/features/recommendation/ui/ProductInfoModal.vue';

const productOption = ref('예금');
const periodOption = ref('STAY_EXPIRATION');
const conditionOption = ref([]);
const showFilterModal = ref(false);
const showInfoModal = ref(false);
const selectedProduct = ref(null);

const openInfoModal = (product) => {
  selectedProduct.value = product;
  showInfoModal.value = true;
};
</script>

<template>
  <div class="flex flex-col min-h-screen gap-[15px]">
    <RecommendationHeader
      v-model:productOption="productOption"
      v-model:periodOption="periodOption"
      v-model:conditionOption="conditionOption"
      v-model:showFilterModal="showFilterModal"
    />

    <ProductList
      :productOption="productOption"
      :periodOption="periodOption"
      :conditionOption="conditionOption"
      @select="openInfoModal"
    />

    <ProductInfoModal
      :show="showInfoModal"
      :product="selectedProduct"
      @close="showInfoModal = false"
    />
  </div>
</template>
