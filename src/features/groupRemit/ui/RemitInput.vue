<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';
import { getGroupCommission } from '../service/groupRemit.service';
import { countryNameMap } from '@/shared/utils/KorEngMap';

const emit = defineEmits(['updateRemit', 'next']);

const store = useGroupRemitStore();

const currency = computed(() => store.groupRemitInfo.currency);
const remittanceDate = computed(() => store.groupRemitInfo.remittanceDate);

const purpose = ref('');
const amount = ref('');
const minError = ref(false);
const maxError = ref(false);
const showError = ref(false);
const commissionInfo = reactive({
  originalCommission: null,
  benefitCommission: null,
  benefitAmount: null,
});

const disabled = computed(() => {
  return !amount.value || !purpose.value;
});

const handleNext = () => {
  minError.value = amount.value < 100000;
  maxError.value = amount.value > 3000000;

  if (minError.value || maxError.value) {
    showError.value = true;
    return;
  }

  emit('updateRemit', {
    amount: Number(amount.value),
    purpose: purpose.value,
    currency: currency.value,
    remittanceDate: Number(remittanceDate.value),
  });
  emit('next');
};

const fetchGroupCommission = async () => {
  const result = await getGroupCommission();

  if (result.status === 200) {
    Object.assign(commissionInfo, result.data);
  }
};

watch(amount, () => {
  if (showError.value) {
    showError.value = false;
    minError.value = false;
    maxError.value = false;
  }
});

onMounted(fetchGroupCommission);
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col gap-5">
      <PlainCard>
        <div class="flex flex-col gap-5">
          <Head3>송금 정보</Head3>
          <div class="flex flex-col">
            <Subtitle3>송금 국가</Subtitle3>
            <LineInput v-model="countryNameMap[currency]" :disabled="true" />
          </div>
          <div class="flex flex-col">
            <Subtitle3>거래 목적</Subtitle3>
            <LineInput v-model="purpose" />
          </div>
          <div class="flex flex-col">
            <Subtitle3>송금 금액</Subtitle3>
            <LineInput v-model="amount" />
          </div>
        </div>
      </PlainCard>

      <div class="flex flex-col items-center bg-dol-light-sub rounded-md p-5">
        <Head3>예상 혜택</Head3>
        <div class="w-full flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <P1 class="text-dol-dark-gray">기존 송금 수수료</P1>
            <P1 class="line-through"
              >{{ commissionInfo.originalCommission?.toLocaleString() }}원</P1
            >
          </div>
          <div class="flex justify-between">
            <P1 class="text-dol-dark-gray">공동 송금 수수료</P1>
            <P1>{{ commissionInfo.benefitCommission?.toLocaleString() }}원</P1>
          </div>
          <div class="w-full h-[2px] bg-dol-light-gray" />
          <div class="flex justify-between">
            <Head3>절약 금액</Head3>
            <Head3 class="text-dol-main"
              >{{ commissionInfo.benefitAmount?.toLocaleString() }}원</Head3
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-1">
      <Caption1
        class="text-dol-error transition-opacity duration-200"
        :class="!showError && 'opacity-0'"
      >
        {{
          minError
            ? '송금 금액은 최소 10만원 이상이어야 합니다.'
            : maxError
              ? '송금 금액은 최대 300만원 이하이어야 합니다.'
              : ''
        }}
      </Caption1>
      <LgMainButton @click="handleNext" :disabled="disabled">다음</LgMainButton>
    </div>
  </div>
</template>
