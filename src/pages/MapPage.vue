<script setup>
import { ref, watch, onMounted } from 'vue';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import { mockCenters, mockBanks } from '@/entities/map/map.mock';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const activeTab = ref('다문화 가족 지원 센터');
const mapCenter = ref({ lat: 37.566826, lng: 126.9786567 });
const userPos = ref({ ...mapCenter.value });
const centerList = ref([]);
const bankList = ref([]);
const showPlaces = ref([]);
const isModalOpen = ref(false);
const selectedPlace = ref(null);

let mapInstance = null,
  allMarkers = [],
  openInfoWindow = null;

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

// 거리 계산 공식
const haversine = (lat1, lng1, lat2, lng2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  return (
    R *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) ** 2,
      ),
    )
  );
};

// 가장 가까운 곳 찾는 것
const nearest = (lat, lng, list) =>
  list.reduce(
    (near, p) => {
      const d = haversine(lat, lng, p.lat, p.lng);
      return d < near.dist ? { place: p, dist: d } : near;
    },
    {
      place: list[0],
      dist: haversine(lat, lng, list[0]?.lat || 0, list[0]?.lng || 0),
    },
  ).place;

const clearMarkers = () => {
  allMarkers.forEach((m) => m.setMap(null));
  allMarkers = [];
  openInfoWindow?.close();
  openInfoWindow = null;
};

const createMarker = (place, color) => {
  const svg = `
    <svg width="35" height="41" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="${color}"/>
      <circle cx="8" cy="6" r="3" fill="white"/>
    </svg>`;
  const markerImage = new kakao.maps.MarkerImage(
    'data:image/svg+xml;utf8,' + encodeURIComponent(svg),
    new kakao.maps.Size(35, 41),
  );
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(place.lat, place.lng),
    map: mapInstance,
    image: markerImage,
  });

  const infoWindow = new kakao.maps.InfoWindow({
    content: `<div class="px-3 py-2 max-w-[300px] whitespace-nowrap">
                <Head3>${place.name}</Head3>
                <p class="text-dol-dark-gray">${place.address || ''}</p>
              </div>`,
    zIndex: 3,
  });

  kakao.maps.event.addListener(marker, 'mouseover', () => {
    openInfoWindow?.close();
    infoWindow.open(mapInstance, marker);
    openInfoWindow = infoWindow;
  });
  kakao.maps.event.addListener(marker, 'mouseout', () => {
    if (openInfoWindow === infoWindow) {
      infoWindow.close();
      openInfoWindow = null;
    }
  });
  kakao.maps.event.addListener(marker, 'click', () => {
    selectedPlace.value = { ...place, tabType: activeTab.value };
    isModalOpen.value = true;
  });

  return marker;
};

const drawMarkers = () => {
  if (!mapInstance) return;
  clearMarkers();
  const color =
    activeTab.value === '다문화 가족 지원 센터' ? '#E80B26' : '#354E73';
  showPlaces.value.forEach((p) => allMarkers.push(createMarker(p, color)));
};

const setCenter = async () => {
  try {
    await new Promise((res, rej) =>
      navigator.geolocation?.getCurrentPosition(
        (pos) => {
          userPos.value = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          res();
        },
        () => res(),
        { enableHighAccuracy: true, timeout: 5000 },
      ),
    );
  } catch {}
  const list =
    activeTab.value === '다문화 가족 지원 센터'
      ? centerList.value
      : bankList.value;
  const near = nearest(userPos.value.lat, userPos.value.lng, list);
  mapCenter.value = near ? { lat: near.lat, lng: near.lng } : userPos.value;
  mapInstance?.setCenter(
    new kakao.maps.LatLng(mapCenter.value.lat, mapCenter.value.lng),
  );
};

onMounted(async () => {
  centerList.value = toPlace(mockCenters, '센터');
  bankList.value = toPlace(mockBanks, '은행');
  showPlaces.value = centerList.value;

  await new Promise((resolve) => {
    if (window.kakao?.maps) return resolve();
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_MAP_KEY}&autoload=false`;
    script.onload = () => kakao.maps.load(resolve);
    document.head.appendChild(script);
  });

  mapInstance = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(mapCenter.value.lat, mapCenter.value.lng),
    level: 5,
  });

  await setCenter();
  drawMarkers();
});

watch(activeTab, async () => {
  showPlaces.value =
    activeTab.value === '다문화 가족 지원 센터'
      ? centerList.value
      : bankList.value;
  await setCenter();
  drawMarkers();
});

const closeModal = () => (isModalOpen.value = false);
</script>

<template>
  <div class="flex justify-center pt-6">
    <RoundTab
      v-model="activeTab"
      opt1="다문화 가족 지원 센터"
      opt2="은행 외국인 특화 점포"
    />
  </div>

  <div id="map" class="w-full mt-4 h-[70vh]"></div>

  <Modal
    v-if="isModalOpen"
    title="상세 정보"
    button-text="확인"
    @close="closeModal"
    @confirm="closeModal"
  >
    <div class="space-y-4 mb-6 text-gray-800">
      <div>
        <Head3>{{
          activeTab === '다문화 가족 지원 센터' ? '센터명' : '은행 지점명'
        }}</Head3>
        <P1>{{ selectedPlace?.name }}</P1>
      </div>
      <div>
        <Head3>주소</Head3><P1>{{ selectedPlace?.address }}</P1>
      </div>
      <div>
        <Head3>전화번호</Head3><P1>{{ selectedPlace?.phone }}</P1>
      </div>
      <div v-if="selectedPlace?.website">
        <Head3>웹사이트</Head3>
        <P1
          ><a
            :href="selectedPlace.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dol-dark underline"
            >{{ selectedPlace.website }}</a
          ></P1
        >
      </div>
      <div>
        <Head3>{{
          activeTab === '다문화 가족 지원 센터' ? '센터 안내' : '은행 안내'
        }}</Head3>
        <P1>{{ selectedPlace?.description }}</P1>
      </div>
    </div>
  </Modal>
</template>
