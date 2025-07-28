<script setup>
import { watch, ref, nextTick } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap';
import { branchLocations } from '@/entities/recommendation/recommendation.mock';

const props = defineProps({
  show: Boolean,
  product: Object,
});
const emit = defineEmits(['close']);

const mapContainer = ref(null);
const { initMap, drawMarkers, nearest, userPos, setCenter } = useKakaoMap();

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

watch(
  () => props.show,
  async (val) => {
    if (val && props.product) {
      await nextTick();
      const map = await initMap(mapContainer.value, userPos, {
        draggable: false,
        scrollwheel: false,
      });
      drawNearbyBranches(
        props.product.bank,
        branchLocations[props.product.bank] || [],
      );
      setTimeout(() => map?.relayout?.(), 100);
    }
  },
);
</script>

<template>
  <Modal
    v-if="props.show"
    title="상품 상세 정보"
    button-text="확인"
    @close="emit('close')"
  >
    <div class="max-h-[80vh]">
      <PlainCard v-if="props.product">
        <Head3>상품명</Head3>
        <P1>{{ props.product.title }}</P1>

        <Head3>기간</Head3>
        <P1>{{ props.product.period }}개월</P1>

        <Head3>금리</Head3>
        <P1>
          기본 {{ props.product.basicrate }}%, 최대
          {{ props.product.maximumrate }}%
        </P1>

        <Head3>우대 조건</Head3>
        <P1>{{ props.product.preferential }}</P1>
      </PlainCard>

      <PlainCard v-if="props.product" class="mt-4">
        <Head3>은행명</Head3>
        <P1>{{ props.product.bank }}</P1>

        <Head3>홈페이지</Head3>
        <P1 v-if="props.product.website">
          <a
            :href="props.product.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dol-dark underline hover:opacity-80"
          >
            {{ props.product.website }}
          </a>
        </P1>

        <Head3>콜센터</Head3>
        <P1>{{ props.product.callcenter }}</P1>
      </PlainCard>

      <Head3 class="pt-[15px]">가장 가까운 지점 (1.5km 이내)</Head3>
      <div ref="mapContainer" class="w-full h-[300px] mt-2"></div>
    </div>
  </Modal>
</template>
