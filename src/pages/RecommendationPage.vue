<script setup>
import { ref, computed } from 'vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap';
import {
  allProducts,
  branchLocations,
} from '@/entities/recommendation/recommendation.mock';

// 상태
const activeTab = ref('예금');
const showFilterModal = ref(false);
const showInfoModal = ref(false);
const selectedProduct = ref(null);
const filterTab = ref('');
const conditionTab = ref([]);
const mapContainer = ref(null);

// Kakao Map 훅
const { initMap, drawMarkers, nearest, userPos, setCenter } = useKakaoMap();

// 탭 옵션
const tabs = [
  { value: '예금', label: '예금' },
  { value: '적금', label: '적금' },
  { value: '신용 대출', label: '신용 대출' },
  { value: '전세 대출', label: '전세 대출' },
];
const filtertabs = [
  { value: '6개월', label: '6개월' },
  { value: '12개월', label: '12개월' },
  { value: '24개월', label: '24개월' },
  { value: '체류기간', label: '체류기간' },
];
const conditiontabs = [
  { value: '카드사용', label: '카드사용' },
  { value: '첫거래', label: '첫거래' },
  { value: '재예치', label: '재예치' },
  { value: '비대면가입', label: '비대면가입' },
  { value: '공과금연동', label: '공과금연동' },
  { value: '주택청약', label: '주택청약' },
  { value: '입출금통장', label: '입출금통장' },
  { value: '급여연동', label: '급여연동' },
];

// 상품 필터링
const filteredProducts = computed(() => {
  let products = allProducts[activeTab.value] || [];

  const months = parseInt(filterTab.value.replace('개월', '')) || 0;
  if (months > 0) products = products.filter((p) => p.period === months);

  if (conditionTab.value.length > 0) {
    products = products.filter((p) =>
      conditionTab.value.every((cond) => p.preferential.includes(cond)),
    );
  }

  return products;
});

const openFilterModal = () => (showFilterModal.value = true);
const closeFilterModal = () => (showFilterModal.value = false);
const closeInfoModal = () => {
  selectedProduct.value = null;
  showInfoModal.value = false;
};

// 지점 표시
const drawNearbyBranches = (bankName, branches) => {
  if (!branches?.length) return;

  const nearby = branches
    .map((b) => ({
      ...b,
      distance: nearest(userPos.lat, userPos.lng, [b]).distance ?? 0,
    }))
    .filter((b) => b.distance <= 1.5);

  if (!nearby.length) return;

  const closest = nearby.reduce((a, b) => (a.distance < b.distance ? a : b));

  const placeWithFullName = {
    ...closest,
    name: `${bankName} ${closest.name}`,
  };

  setCenter(placeWithFullName.lat, placeWithFullName.lng);
  drawMarkers([placeWithFullName], '#354E73', { alwaysOpenInfo: true });
};

// Info 모달 열기
const openInfoModal = (product) => {
  selectedProduct.value = product;
  showInfoModal.value = true;
  setTimeout(async () => {
    await initMap(mapContainer.value, userPos, {
      draggable: false,
      scrollwheel: false,
    });
    drawNearbyBranches(product.bank, branchLocations[product.bank] || []);
  }, 0);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="sticky top-[60px] w-full overflow-x-auto bg-white">
      <SquareTab v-model="activeTab" :options="tabs" class="flex w-max py-2" />
    </div>

    <!-- 필터 버튼 -->
    <div
      class="sticky top-[110px] flex justify-end items-center gap-1 px-4 py-2 bg-dol-sub cursor-pointer"
      @click="openFilterModal"
    >
      <Caption1>상품 필터</Caption1>
      <i class="bi bi-caret-down-fill"></i>
    </div>

    <!-- 상품 카드 목록 -->
    <div class="flex flex-col px-4 py-4 space-y-3 overflow-y-auto">
      <DoubleCard
        v-for="product in filteredProducts"
        :key="product.id"
        :image="product.logo"
        :title="product.title"
        :subtitle="product.bank"
        @click="openInfoModal(product)"
      >
        <div class="flex flex-col text-right">
          <P2 class="text-dol-dark-gray">기본 금리 {{ product.basicrate }}%</P2>
          <P2 class="text-dol-main">최대 금리 {{ product.maximumrate }}%</P2>
        </div>
      </DoubleCard>
    </div>

    <!-- 필터 모달 -->
    <Modal
      v-if="showFilterModal"
      :title="
        activeTab === '신용 대출' || activeTab === '전세 대출'
          ? '대출 조건 설정'
          : '조회 조건 설정'
      "
      button-text="확인"
      @close="closeFilterModal"
    >
      <div v-if="activeTab === '예금' || activeTab === '적금'">
        <Head3>저축 기간</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            v-model="filterTab"
            :options="filtertabs"
            class="flex w-max py-2"
          />
        </div>

        <Head3 class="pt-[10px]">우대 조건 (중복 선택)</Head3>
        <SquareTab
          v-model="conditionTab"
          :options="conditiontabs"
          :multiple="true"
          class="flex flex-wrap gap-2 py-2"
        />
      </div>

      <div v-else>
        <Head3 class="pt-[15px]">대출 금리</Head3>
        <div class="w-full overflow-x-auto bg-white">
          <SquareTab
            v-model="filterTab"
            :options="[
              { value: '최저 기준', label: '최저 기준' },
              { value: '최고 기준', label: '최고 기준' },
              { value: '평균 기준', label: '평균 기준' },
            ]"
            class="flex w-max py-2"
          />
        </div>

        <Head3 class="pt-[10px]">대출 한도</Head3>
        <div class="flex flex-col gap-2 pt-[5px]">
          <div class="flex">
            <BoxInput placeholder="최소 금액" :color="true" />
            <p class="text-[20px] font-midium pt-[6px] px-[5px]">~</p>
            <BoxInput placeholder="최대 금액" :color="true" />
          </div>
        </div>
      </div>
    </Modal>

    <!-- 상세 정보 모달 -->
    <Modal
      v-if="showInfoModal"
      title="상품 상세 정보"
      button-text="확인"
      @close="closeInfoModal"
    >
      <div class="max-h-[80vh] overflow-y-auto">
        <PlainCard v-if="selectedProduct">
          <Head3>상품명</Head3>
          <Caption1>{{ selectedProduct.title }}</Caption1>

          <Head3>기간</Head3>
          <Caption1>{{ selectedProduct.period }}개월</Caption1>

          <Head3>금리</Head3>
          <Caption1>
            기본 {{ selectedProduct.basicrate }}%, 최대
            {{ selectedProduct.maximumrate }}%
          </Caption1>

          <Head3>우대 조건</Head3>
          <Caption1>{{ selectedProduct.preferential }}</Caption1>
        </PlainCard>

        <PlainCard v-if="selectedProduct" class="mt-4">
          <Head3>은행명</Head3>
          <Caption1>{{ selectedProduct.bank }}</Caption1>

          <Head3>홈페이지</Head3>
          <Caption1 v-if="selectedProduct.website">
            <a
              :href="selectedProduct.website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dol-dark underline hover:opacity-80"
            >
              {{ selectedProduct.website }}
            </a>
          </Caption1>

          <Head3>콜센터</Head3>
          <Caption1>{{ selectedProduct.callcenter }}</Caption1>
        </PlainCard>

        <Head3 class="pt-[15px]">가장 가까운 지점 (1.5km 이내)</Head3>
        <div ref="mapContainer" class="w-full h-[300px] mt-2"></div>
      </div>
    </Modal>
  </div>
</template>
