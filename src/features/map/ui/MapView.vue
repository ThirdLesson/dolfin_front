<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap.js';
import { mockCenters, mockBanks } from '@/entities/map/map.mock';

const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(['placeClick']);

const mapContainer = ref(null);
const { initMap, setCenter, drawMarkers, nearest, userPos, mapInstance } =
  useKakaoMap();

const centerList = ref([]);
const bankList = ref([]);
const showPlaces = ref([]);

const toPlace = (data, type) =>
  data.map((d, i) => ({
    id: d.id || i + 1,
    name: d.name || d.centerName || d.branchName,
    lat: +d.latitude || +d.lat || +d.y,
    lng: +d.longitude || +d.lng || +d.x,
    address: d.address,
    phone: d.phone,
    website: d.website,
    description: d.description || `${type} 안내 ${i + 1}`,
  }));

const refreshMap = () => {
  if (mapInstance.value && window.kakao?.maps) {
    window.kakao.maps.event.trigger(mapInstance.value, 'resize');
  }
};

const updateMap = () => {
  if (!showPlaces.value || showPlaces.value.length === 0) return;

  const near = nearest(userPos.lat, userPos.lng, showPlaces.value);
  if (near) {
    setCenter(near.lat, near.lng);
  }

  const color =
    props.activeTab === '다문화 가족 지원 센터' ? '#E80B26' : '#354E73';

  drawMarkers(showPlaces.value, color, {
    withHover: true,
    onClick: (place) => emit('placeClick', place),
  });

  setTimeout(refreshMap, 300);
};

onMounted(async () => {
  centerList.value = toPlace(mockCenters, '센터');
  bankList.value = toPlace(mockBanks, '은행');

  showPlaces.value =
    props.activeTab === '다문화 가족 지원 센터'
      ? centerList.value
      : bankList.value;

  await nextTick();
  if (!mapContainer.value) return;

  await initMap(mapContainer.value, userPos, {
    draggable: true,
    scrollwheel: true,
  });

  setTimeout(updateMap, 500);
});

watch(
  () => props.activeTab,
  () => {
    showPlaces.value =
      props.activeTab === '다문화 가족 지원 센터'
        ? centerList.value
        : bankList.value;
    updateMap();
  },
);
</script>

<template>
  <div ref="mapContainer" class="w-full h-[70vh] mt-4"></div>
</template>
