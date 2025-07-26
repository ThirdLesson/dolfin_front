<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import { mockCenters, mockBanks } from '@/entities/map/map.mock';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap.js';

const activeTab = ref('다문화 가족 지원 센터');
const centerList = ref([]);
const bankList = ref([]);
const showPlaces = ref([]);
const isModalOpen = ref(false);
const selectedPlace = ref(null);
const mapContainer = ref(null);

const { initMap, setCenter, drawMarkers, nearest, userPos, mapInstance } =
  useKakaoMap();

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
    kakao.maps.event.trigger(mapInstance.value, 'resize');
  }
};

// 지도 중심 + 마커 표시 갱신
const updateMap = async () => {
  const list =
    activeTab.value === '다문화 가족 지원 센터'
      ? centerList.value
      : bankList.value;

  const near = nearest(userPos.lat, userPos.lng, list);
  setCenter(near.lat, near.lng);

  const color =
    activeTab.value === '다문화 가족 지원 센터' ? '#E80B26' : '#354E73';
  drawMarkers(showPlaces.value, color, {
    withHover: true,
    onClick: (place) => {
      selectedPlace.value = { ...place, tabType: activeTab.value };
      isModalOpen.value = true;
    },
  });

  setTimeout(refreshMap, 300);
};

onMounted(async () => {
  centerList.value = toPlace(mockCenters, '센터');
  bankList.value = toPlace(mockBanks, '은행');
  showPlaces.value = centerList.value;

  await nextTick();
  await initMap(mapContainer.value, userPos, {
    draggable: true,
    scrollwheel: true,
  });

  setTimeout(() => {
    refreshMap();
    updateMap();
  }, 500);
});

watch(activeTab, async () => {
  showPlaces.value =
    activeTab.value === '다문화 가족 지원 센터'
      ? centerList.value
      : bankList.value;
  await updateMap();
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

  <div ref="mapContainer" class="w-full mt-4 h-[70vh]"></div>
  <!-- 상세 정보 모달 -->
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
        <Head3>주소</Head3>
        <P1>{{ selectedPlace?.address }}</P1>
      </div>
      <div>
        <Head3>전화번호</Head3>
        <P1>{{ selectedPlace?.phone }}</P1>
      </div>
      <div v-if="selectedPlace?.website">
        <Head3>웹사이트</Head3>
        <P1>
          <a
            :href="selectedPlace.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dol-dark underline hover:opacity-80"
          >
            {{ selectedPlace.website }}
          </a>
        </P1>
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
