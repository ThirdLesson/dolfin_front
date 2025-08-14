<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';
import { getGroupCommission } from '../service/groupRemit.service';
import { countryNameMap } from '@/shared/utils/KorEngMap';

const { t } = useI18n();

const emit = defineEmits(['updateRemit', 'next']);

const store = useGroupRemitStore();

const currency = computed(() => store.groupRemitInfo.currency);
const remittanceDate = computed(() => store.groupRemitInfo.remittanceDate);

const purpose = ref('');
const amount = ref('');

const numberError = ref(false);
const minError = ref(false);
const maxError = ref(false);
const showError = ref(false);

const commissionInfo = reactive({
  originalCommission: null,
  benefitCommission: null,
  benefitAmount: null,
});

const disabled = computed(() => {
  return !amount.value || !purpose.value || numberError.value;
});

const handleNext = () => {
  if (numberError.value) {
    showError.value = false;
    return;
  }

  const amt = Number(amount.value || 0);
  minError.value = amt < 100000;
  maxError.value = amt > 5000000;

  if (minError.value || maxError.value) {
    showError.value = true;
    return;
  }

  emit('updateRemit', {
    amount: amt,
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

watch(amount, (newVal) => {
  numberError.value = !/^\d*$/.test(newVal);

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
    <div class="flex flex-col gap-5 select-none">
      <PlainCard>
        <div class="flex flex-col gap-5">
          <Head3>{{ t('groupRemit.remit.title') }}</Head3>

          <LineInput
            v-model="countryNameMap[currency]"
            :title="t('groupRemit.remit.country')"
            :disabled="true"
          />

          <LineInput v-model="purpose" :title="t('groupRemit.remit.purpose')" />

          <LineInput
            v-model="amount"
            :title="t('groupRemit.remit.amount')"
            inputmode="numeric"
            pattern="\\d*"
          />
          <Caption1 v-if="numberError" class="text-dol-error text-sm -mt-3">
            {{ t('groupRemit.remit.errNum') }}
          </Caption1>
        </div>
      </PlainCard>

      <div class="flex flex-col items-center bg-dol-light-sub rounded-md p-5">
        <Head3>{{ t('groupRemit.remit.benefitTitle') }}</Head3>
        <div class="w-full flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <P1 class="text-dol-dark-gray">{{
              t('groupRemit.remit.originFee')
            }}</P1>
            <P1 class="line-through">
              {{ commissionInfo.originalCommission?.toLocaleString()
              }}{{ t('common.won') }}
            </P1>
          </div>
          <div class="flex justify-between">
            <P1 class="text-dol-dark-gray">{{
              t('groupRemit.remit.groupFee')
            }}</P1>
            <P1>
              {{ commissionInfo.benefitCommission?.toLocaleString()
              }}{{ t('common.won') }}
            </P1>
          </div>
          <div class="w-full h-[2px] bg-dol-light-gray" />
          <div class="flex justify-between">
            <Head3>{{ t('groupRemit.remit.save') }}</Head3>
            <Head3 class="text-dol-main">
              {{ commissionInfo.benefitAmount?.toLocaleString()
              }}{{ t('common.won') }}
            </Head3>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-5">
      <Caption1
        class="text-dol-error transition-opacity duration-200"
        :class="!showError && 'opacity-0'"
      >
        {{
          minError
            ? t('groupRemit.remit.errMin')
            : maxError
              ? t('groupRemit.remit.errMax')
              : ''
        }}
      </Caption1>

      <LgMainButton @click="handleNext" :disabled="disabled">{{
        t('common.next')
      }}</LgMainButton>
    </div>
  </div>
</template>
