<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

const { t } = useI18n();

const store = useGroupRemitStore();

const emit = defineEmits(['updateRecipient', 'complete']);
const prope = defineProps({
  showError: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
});

const receiverAccount = ref(null);
const receiverAddress = ref('');
const receiverBank = ref('');
const receiverName = ref('');
const routerCode = ref('');
const swiftCode = ref('');
const intermediaryBankCommission = ref('OUR');
const agree = ref(false);

const handleComplete = () => {
  emit('updateRecipient', {
    receiverAccount: Number(receiverAccount.value),
    receiverAddress: receiverAddress.value,
    receiverBank: receiverBank.value,
    receiverName: receiverName.value,
    routerCode: routerCode.value,
    swiftCode: swiftCode.value,
    intermediaryBankCommission: intermediaryBankCommission.value,
  });
  emit('complete');
};

const showRouterCode = computed(() => store.groupRemitInfo.currency === 'USD');
const disabled = computed(() => {
  return (
    !agree.value ||
    !receiverAccount.value ||
    !receiverAddress.value ||
    !receiverBank.value ||
    !receiverName.value ||
    !swiftCode.value ||
    (showRouterCode.value && !routerCode.value)
  );
});
</script>

<template>
  <div class="h-full flex flex-col gap-5">
    <PlainCard>
      <div class="flex flex-col gap-5">
        <Head3>{{ t('groupRemit.recipient.title') }}</Head3>
        <LineInput
          v-model="swiftCode"
          :title="t('groupRemit.recipient.swift')"
        />
        <LineInput
          v-model="receiverBank"
          :title="t('groupRemit.recipient.bank')"
        />
        <LineInput
          v-model="receiverAccount"
          :title="t('groupRemit.recipient.account')"
        />
        <LineInput
          v-model="receiverName"
          :title="t('groupRemit.recipient.name')"
        />
        <LineInput
          v-model="receiverAddress"
          :title="t('groupRemit.recipient.address')"
        />
        <LineInput
          v-if="showRouterCode"
          v-model="routerCode"
          :title="t('groupRemit.recipient.routerCode')"
        />
        <div class="flex justify-center">
          <Caption1 class="underline text-dol-dark-gray">{{
            t('groupRemit.recipient.warn')
          }}</Caption1>
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <Head3>{{ t('groupRemit.recipient.commission.title') }}</Head3>
      <div class="flex flex-col gap-[10px]">
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="OUR"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>{{ t('groupRemit.recipient.commission.OUR') }}</Subtitle3>
        </label>
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="SHA"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>{{ t('groupRemit.recipient.commission.SHA') }}</Subtitle3>
        </label>
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="BEN"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>{{ t('groupRemit.recipient.commission.BEN') }}</Subtitle3>
        </label>
      </div>
    </PlainCard>

    <PlainCard>
      <Head3>{{ t('groupRemit.recipient.auto.title') }}</Head3>
      <div class="flex flex-col gap-[8px]">
        <div class="flex items-center gap-[8px]">
          <input
            type="checkbox"
            v-model="agree"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>{{ t('groupRemit.recipient.auto.agree') }}</Subtitle3>
        </div>
        <div class="flex flex-col pl-5">
          <Caption1 class="text-dol-dark-gray"
            >• {{ t('groupRemit.recipient.auto.notice1') }}</Caption1
          >
          <Caption1 class="text-dol-dark-gray"
            >• {{ t('groupRemit.recipient.auto.notice2') }}</Caption1
          >
          <Caption1 class="text-dol-dark-gray"
            >• {{ t('groupRemit.recipient.auto.notice3') }}</Caption1
          >
        </div>
      </div>
    </PlainCard>

    <div class="flex flex-col items-center gap-1">
      <Caption1
        class="text-dol-error transition-opacity duration-200"
        :class="!showError && 'opacity-0'"
      >
        {{ errorMessage }}
      </Caption1>
      <LgMainButton @click="handleComplete" :disabled="disabled">{{
        t('common.complete')
      }}</LgMainButton>
    </div>
  </div>
</template>
