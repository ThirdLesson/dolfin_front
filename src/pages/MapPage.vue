<script setup>
import { reactive } from 'vue';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import MapView from '@/features/map/ui/MapView.vue';
import PlaceInfoModal from '@/features/map/ui/PlaceInfoModal.vue';

const state = reactive({
  activeTab: '다문화 가족 지원 센터',
  isOpen: false,
  selectedPlace: {},
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-center pt-6">
      <RoundTab
        v-model="state.activeTab"
        opt1="다문화 가족 지원 센터"
        opt2="은행 외국인 특화 점포"
      />
    </div>

    <MapView
      :active-tab="state.activeTab"
      @placeClick="
        (place) => {
          state.selectedPlace = place;
          state.isOpen = true;
        }
      "
    />

    <PlaceInfoModal
      :isOpen="state.isOpen"
      :place="state.selectedPlace"
      :tabType="state.activeTab"
      @close="state.isOpen = false"
    />
  </div>
</template>
