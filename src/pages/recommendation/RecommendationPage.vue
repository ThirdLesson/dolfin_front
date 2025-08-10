<script setup>
import { ref } from 'vue';
import RecommendationHeader from '@/features/recommendation/ui/RecommendationHeader.vue';
import ProductInfoModal from '@/features/recommendation/ui/ProductInfoModal.vue';
import DepositList from '@/features/recommendation/ui/DepositList.vue';
import SavingList from '@/features/recommendation/ui/SavingList.vue';
import PersonalLoanList from '@/features/recommendation/ui/PersonalLoanList.vue';
import JeonseLoanList from '@/features/recommendation/ui/JeonseLoanList.vue';

const productOption = ref('DEPOSIT');
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
      @click="showFilterModal = true"
    />

    <DepositList
      v-if="productOption === 'DEPOSIT'"
      :showModal="showFilterModal"
      @select="openInfoModal"
      @close="showFilterModal = false"
    />
    <SavingList
      v-else-if="productOption === 'SAVING'"
      :showModal="showFilterModal"
      @select="openInfoModal"
      @close="showFilterModal = false"
    />
    <PersonalLoanList
      v-else-if="productOption === 'PERSONAL_LOAN'"
      :showModal="showFilterModal"
      @select="openInfoModal"
      @close="showFilterModal = false"
    />
    <JeonseLoanList
      v-else-if="productOption === 'JEONSE_LOAN'"
      :showModal="showFilterModal"
      @select="openInfoModal"
      @close="showFilterModal = false"
    />

    <ProductInfoModal
      :show="showInfoModal"
      :productOption="productOption"
      :product="selectedProduct"
      @close="showInfoModal = false"
    />
  </div>
</template>
