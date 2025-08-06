<script setup>
import { ref } from 'vue';
import RecommendationHeader from '@/features/recommendation/ui/RecommendationHeader.vue';
import ProductList from '@/features/recommendation/ui/ProductList.vue';
import ProductInfoModal from '@/features/recommendation/ui/ProductInfoModal.vue';

const activeTab = ref('예금');
const filterTab = ref('체류기간');
const conditionTab = ref([]);
const showFilterModal = ref(false);
const showInfoModal = ref(false);
const selectedProduct = ref(null);

const openInfoModal = (product) => {
  selectedProduct.value = product;
  showInfoModal.value = true;
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <RecommendationHeader
      v-model:activeTab="activeTab"
      v-model:filterTab="filterTab"
      v-model:conditionTab="conditionTab"
      v-model:showFilterModal="showFilterModal"
    />

    <ProductList
      :activeTab="activeTab"
      :filterTab="filterTab"
      :conditionTab="conditionTab"
      @select="openInfoModal"
    />

    <ProductInfoModal
      :show="showInfoModal"
      :product="selectedProduct"
      @close="showInfoModal = false"
    />
  </div>
</template>
