<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap.js';
import { getCenters, getBanks } from '@/features/map/services/map.service';

const props = defineProps({
  activeKey: String,
});

const emit = defineEmits(['placeClick', 'ready']);

const mapContainer = ref(null);
const { initMap, setCenter, drawMarkers, nearest, userPos, mapInstance } =
  useKakaoMap();

const centerList = ref([]);
const bankList = ref([]);
const showPlaces = ref([]);

const toPlace = (data) =>
  data.map((d, i) => ({
    id: d.id || i + 1,
    name: d.locationName || d.name,
    lat: d.point?.latitude || 0,
    lng: d.point?.longitude || 0,
    address: d.address,
    tel: d.tel,
    website: d.homepageUrl || '',
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

  const color = props.activeKey === 'multicultural' ? '#E80B26' : '#354E73';

  drawMarkers(showPlaces.value, color, {
    withHover: true,
    onClick: (place) => emit('placeClick', place),
  });

  setTimeout(() => {
    refreshMap();
    emit('ready');
  }, 300);
};

async function loadPlaces() {
  if (props.activeKey === 'bank') {
    const banks = await getBanks();
    bankList.value = toPlace(banks);
    showPlaces.value = bankList.value;
  } else {
    const centers = await getCenters();
    centerList.value = toPlace(centers);
    showPlaces.value = centerList.value;
  }
  updateMap();
}

onMounted(async () => {
  await nextTick();
  if (!mapContainer.value) return;

  await initMap(mapContainer.value, userPos, {
    draggable: true,
    scrollwheel: true,
  });

  await loadPlaces();
});

watch(
  () => props.activeKey,
  () => {
    loadPlaces();
  },
);
</script>

<template>
  <div ref="mapContainer" class="w-full h-[70vh] mt-4" />
</template>
