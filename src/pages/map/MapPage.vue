<script setup>
import { reactive, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import MapView from '@/features/map/ui/MapView.vue';
import PlaceInfoModal from '@/features/map/ui/PlaceInfoModal.vue';
import LoadingPage from '../etc/LoadingPage.vue';

const { t, locale } = useI18n({ useScope: 'global' });

const state = reactive({
  activeTab: '',
  activeKey: 'multicultural',
  isOpen: false,
  selectedPlace: {},
  isLoading: true,
});

onMounted(() => {
  state.activeTab = t('tabs.multicultural');
});

watch(
  () => state.activeTab,
  (val) => {
    state.activeKey = val === t('tabs.bank') ? 'bank' : 'multicultural';
  },
);

watch(locale, () => {
  state.activeTab = t(`tabs.${state.activeKey}`);
});

watch(
  () => state.activeKey,
  () => {
    state.isLoading = true;
  },
);
</script>

<template>
  <div class="flex flex-col h-full relative">
    <div class="flex justify-center pt-6">
      <RoundTab
        v-model="state.activeTab"
        :opt1="t('tabs.multicultural')"
        :opt2="t('tabs.bank')"
      />
    </div>

    <MapView
      :active-key="state.activeKey"
      @placeClick="
        (place) => {
          state.selectedPlace = place;
          state.isOpen = true;
        }
      "
      @ready="state.isLoading = false"
    />

    <PlaceInfoModal
      :isOpen="state.isOpen"
      :place="state.selectedPlace"
      :tab-key="state.activeKey"
      @close="state.isOpen = false"
    />

    <LoadingPage
      v-if="state.isLoading"
      class="fixed inset-0 z-[999] bg-white"
    />
  </div>
</template>
