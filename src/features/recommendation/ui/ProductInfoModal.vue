<script setup>
import { watch, ref, nextTick, computed } from 'vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap';
import { branchLocations } from '@/entities/recommendation/recommendation.mock';
import { getDepositInfo } from '../services/recommendation.service';

const props = defineProps({
  show: Boolean,
  product: Object,
});
const emit = defineEmits(['close']);

const mapContainer = ref(null);
const detailInfo = ref(null);
const { initMap, drawMarkers, nearest, userPos, setCenter } = useKakaoMap();

const conditionLabelMap = {
  ONLINE: '비대면가입',
  BANK_APP: '은행앱사용',
  USING_CARD: '카드사용',
  USING_SALARY_ACCOUNT: '급여연동',
  USING_UTILITY_BILL: '공과금연동',
  FIRST_BANKING: '첫거래',
  DEPOSIT_ACCOUNT: '입출금통장',
  DEPOSIT_AGAIN: '재예치',
};

const displayConditions = computed(() => {
  let conds =
    detailInfo.value?.spclConditions ?? props.product.preferential ?? [];
  if (typeof conds === 'string') {
    conds = conds.split(',').map((v) => v.trim());
  }
  if (!Array.isArray(conds) || !conds.length) return ['-'];
  return conds.map((cond) => conditionLabelMap[cond] || cond);
});

const fetchDepositDetail = async (id) => {
  try {
    const res = await getDepositInfo(id);
    if (res?.status === 200 && res.data) {
      detailInfo.value = res.data;
    } else {
      detailInfo.value = props.product;
    }
  } catch {
    detailInfo.value = props.product;
  }
};

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
  const placeWithFullName = { ...closest, name: `${bankName} ${closest.name}` };
  setCenter(placeWithFullName.lat, placeWithFullName.lng);
  drawMarkers([placeWithFullName], '#354E73', { alwaysOpenInfo: true });
};

watch(
  () => props.show,
  async (val) => {
    if (val && props.product) {
      detailInfo.value = null;
      await fetchDepositDetail(props.product.id);
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
    } else {
      detailInfo.value = null;
    }
  },
);
</script>

<template>
  <Modal
    v-if="props.show"
    title="상품 상세 정보"
    buttonText="확인"
    @close="emit('close')"
  >
    <div class="max-h-[80vh] overflow-y-auto">
      <PlainCard v-if="detailInfo">
        <Head3>상품명</Head3>
        <P1>{{ detailInfo.depositName || props.product.title }}</P1>

        <Head3>기간</Head3>
        <P1>{{ detailInfo.periodMonth || props.product.period }}개월</P1>

        <Head3>금리</Head3>
        <P1>
          기본 {{ detailInfo.basicRate || props.product.basicrate }}%, 최대
          {{ detailInfo.maxRate || props.product.maximumrate }}%
        </P1>

        <Head3>우대 조건</Head3>
        <P1>{{ displayConditions.join(', ') }}</P1>
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
        <P1>{{ props.product.callcenter || '-' }}</P1>
      </PlainCard>

      <Head3 class="pt-[15px]">가장 가까운 지점 (1.5km 이내)</Head3>
      <div ref="mapContainer" class="w-full h-[300px] mt-2"></div>
    </div>
  </Modal>
</template>
