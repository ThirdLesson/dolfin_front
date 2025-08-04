<script setup>
import { ref, computed } from 'vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

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
        <Head3>수취인 정보</Head3>
        <LineInput v-model="swiftCode" title="Swift 코드" />
        <LineInput v-model="receiverBank" title="수취인 계좌 은행명" />
        <LineInput v-model="receiverAccount" title="수취인 계좌" />
        <LineInput v-model="receiverName" title="수취인 이름" />
        <LineInput v-model="receiverAddress" title="수취인 주소" />
        <LineInput
          v-if="showRouterCode"
          v-model="routerCode"
          title="라우터 코드"
        />
        <div class="flex justify-center">
          <Caption1 class="underline text-dol-dark-gray"
            >오타나 잘못된 정보가 있을 시 송금이 불가할 수 있습니다.</Caption1
          >
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <Head3>중계 은행 수수료 부담 방식 선택</Head3>
      <div class="flex flex-col gap-[10px]">
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="OUR"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>모든 수수료를 내가 부담 (수취인이 전액 받음)</Subtitle3>
        </label>
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="SHA"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>송금 수수료는 내가, 나머지는 수취인이 부담</Subtitle3>
        </label>
        <label class="flex items-center gap-[8px] cursor-pointer">
          <input
            type="radio"
            name="commission"
            v-model="intermediaryBankCommission"
            value="BEN"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3
            >모든 수수료를 수취인이 부담 (내가 보내는 금액에서
            공제됨)</Subtitle3
          >
        </label>
      </div>
    </PlainCard>

    <PlainCard>
      <Head3>자동이체 동의</Head3>
      <div class="flex flex-col gap-[8px]">
        <div class="flex items-center gap-[8px]">
          <input
            type="checkbox"
            v-model="agree"
            class="w-4 h-4 text-dol-dark"
          />
          <Subtitle3>매월 같은 날짜에 자동 이체되는 것에 동의합니다.</Subtitle3>
        </div>
        <div class="flex flex-col pl-5">
          <Caption1 class="text-dol-dark-gray"
            >• 공동 송금 관리는 마이페이지에서 가능합니다.</Caption1
          >
          <Caption1 class="text-dol-dark-gray"
            >• 자동이체 실패시 1회 재시도합니다.</Caption1
          >
          <Caption1 class="text-dol-dark-gray"
            >• 자동이체 2번 실패시 자동 취소됩니다.</Caption1
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
      <LgMainButton @click="handleComplete" :disabled="disabled"
        >완료</LgMainButton
      >
    </div>
  </div>
</template>
