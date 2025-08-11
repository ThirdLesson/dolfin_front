<script setup>
import { reactive, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import MapView from '@/features/map/ui/MapView.vue';
import PlaceInfoModal from '@/features/map/ui/PlaceInfoModal.vue';

const { t, locale } = useI18n({ useScope: 'global' });

const state = reactive({
  activeTab: '',
  activeKey: 'multicultural',
  isOpen: false,
  selectedPlace: {},
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
</script>

<template>
  <div class="flex flex-col h-full">
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
    />

    <PlaceInfoModal
      :isOpen="state.isOpen"
      :place="state.selectedPlace"
      :tab-key="state.activeKey"
      @close="state.isOpen = false"
    />
  </div>
</template>
