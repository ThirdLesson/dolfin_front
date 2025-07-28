<script setup>
import { ref } from 'vue';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import MapView from '@/features/map/ui/MapView.vue';
import PlaceInfoModal from '@/features/map/ui/PlaceInfoModal.vue';

const activeTab = ref('다문화 가족 지원 센터');
const isOpen = ref(false);
const selectedPlace = ref(null);
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-center pt-6">
      <RoundTab
        v-model="activeTab"
        opt1="다문화 가족 지원 센터"
        opt2="은행 외국인 특화 점포"
      />
    </div>

    <MapView
      :active-tab="activeTab"
      @placeClick="
        (place) => {
          selectedPlace = place;
          isOpen = true;
        }
      "
    />

    <PlaceInfoModal
      :is-open="isOpen"
      :place="selectedPlace"
      :tab-type="activeTab"
      @close="isOpen = false"
    />
  </div>
</template>
