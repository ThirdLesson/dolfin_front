<script setup>
import { watch, ref, nextTick, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@/shared/components/organisms/Modal.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import { useUserStore } from '@/entities/user/user.store';
import { useKakaoMap } from '@/shared/hooks/useKakaoMap';
import { branchLocations } from '@/entities/recommendation/recommendation.mock';
import {
  getDepositInfo,
  getSavingInfo,
  getPersonalLoanInfo,
  getJeonseLoanInfo,
} from '../services/recommendation.service';
import { conditionNameMap } from '@/shared/utils/KorEngMap';
import { formatNumber } from '@/shared/utils/format';

const { t } = useI18n();

const props = defineProps({
  show: Boolean,
  productOption: String,
  product: Object,
});
const emit = defineEmits(['close']);

const mapContainer = ref(null);
const detailInfo = ref(null);

const userStore = useUserStore();
const { initMap, drawMarkers, nearest, userPos, setCenter } = useKakaoMap();

const isLoanType = computed(
  () =>
    props.productOption === 'PERSONAL_LOAN' ||
    props.productOption === 'JEONSE_LOAN',
);

const spclConditions = computed(() => {
  let conds = detailInfo.value?.product?.spclConditions || [];
  if (typeof conds === 'string') {
    conds = conds.split(',').map((v) => v.trim());
  }
  if (!Array.isArray(conds) || !conds.length) return ['-'];
  return conds.map((cond) => conditionNameMap[cond] || cond);
});

const fetchDetail = async (id) => {
  let res;
  switch (props.productOption) {
    case 'DEPOSIT':
      res = await getDepositInfo(id);
      break;
    case 'SAVING':
      res = await getSavingInfo(id);
      break;
    case 'PERSONAL_LOAN':
      res = await getPersonalLoanInfo(id);
      break;
    case 'JEONSE_LOAN':
      res = await getJeonseLoanInfo(id);
      break;
    default:
      res = null;
  }
  if (res?.status === 200) {
    detailInfo.value = res.data;
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
      await fetchDetail(props.product.id);
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
    v-if="props.show && detailInfo"
    :title="t('recommendation.detail.title')"
    :buttonText="t('recommendation.detail.ok')"
    @close="emit('close')"
  >
    <div class="flex flex-col gap-[15px]">
      <PlainCard v-if="isLoanType">
        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.productName') }}</Head3>
          <P1>{{
            detailInfo.productName || detailInfo.productInfo.productName
          }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.repayPeriod') }}</Head3>
          <P1>{{
            t('recommendation.detail.repayPeriodRange', {
              min: detailInfo.minPeriod || detailInfo.productInfo.minPeriod,
              max: detailInfo.maxPeriod || detailInfo.productInfo.maxPeriod,
            })
          }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.loanAmount') }}</Head3>
          <P1>{{
            t('recommendation.detail.maxLoanAmount', {
              amount:
                formatNumber(detailInfo.maxLoanAmount) ||
                formatNumber(detailInfo.productInfo.maxLoanAmount),
            })
          }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.rateInfo') }}</Head3>
          <P1>
            {{
              t('recommendation.detail.rateTriplet', {
                min: detailInfo.minRate || detailInfo.productInfo.minRate,
                avg: detailInfo.avgRate || detailInfo.productInfo.avgRate,
                max: detailInfo.maxRate || detailInfo.productInfo.maxRate,
              })
            }}
          </P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.joinConditions') }}</Head3>
          <P1>{{
            detailInfo.loanConditions || detailInfo.productInfo.loanConditions
          }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.minVisaPeriod') }}</Head3>
          <div class="flex flex-col">
            <P1>{{
              t('recommendation.detail.minVisaMonths', {
                months:
                  detailInfo.minPeriod || detailInfo.productInfo.minPeriod,
              })
            }}</P1>
            <Subtitle2
              v-if="
                detailInfo.joinAvailable || detailInfo.productInfo.joinAvailable
              "
              class="text-dol-main"
            >
              {{
                t('recommendation.detail.eligible', {
                  name: userStore.userInfo.name || '',
                })
              }}
            </Subtitle2>
            <P1 v-else class="text-dol-error">
              {{
                t('recommendation.detail.ineligible', {
                  name: userStore.userInfo.name || '',
                })
              }}
            </P1>
          </div>
        </div>
      </PlainCard>

      <PlainCard v-else>
        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.productName') }}</Head3>
          <P1>{{ detailInfo.product.name }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.period') }}</Head3>
          <P1>{{
            t('recommendation.detail.months', {
              months: detailInfo.product.saveMonth,
            })
          }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.rate') }}</Head3>
          <P1>
            {{
              t('recommendation.detail.baseAndMax', {
                base: detailInfo.product.interestRate,
                max: detailInfo.product.maxInterestRate,
              })
            }}
          </P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.preferential') }}</Head3>
          <P1>{{ spclConditions.join(', ') }}</P1>
        </div>
      </PlainCard>

      <PlainCard v-if="props.product">
        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.bankName') }}</Head3>
          <P1>{{ detailInfo.companyName || detailInfo.company.name }}</P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.homepage') }}</Head3>
          <P1 v-if="detailInfo.homepageUrl || detailInfo.company.homepageUrl">
            <a
              :href="detailInfo.homepageUrl || detailInfo.company.homepageUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-dol-dark underline hover:opacity-80"
            >
              {{ detailInfo.homepageUrl || detailInfo.company.homepageUrl }}
            </a>
          </P1>
        </div>

        <div class="flex flex-col gap-[5px]">
          <Head3>{{ t('recommendation.detail.callCenter') }}</Head3>
          <P1>{{ detailInfo.callNumber || detailInfo.company.callNumber }}</P1>
        </div>
      </PlainCard>

      <Head3>{{ t('recommendation.detail.nearest', { km: 1.5 }) }}</Head3>
      <div ref="mapContainer" class="w-full h-[300px]" />
    </div>
  </Modal>
</template>
