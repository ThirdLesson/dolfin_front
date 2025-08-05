<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import CollectCard from '@/features/groupRemit/ui/CollectCard.vue';
import RemitInput from '@/features/groupRemit/ui/RemitInput.vue';
import RecipientInput from '@/features/groupRemit/ui/RecipientInput.vue';
import { joinGroupRemit } from '@/features/groupRemit/service/groupRemit.service';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

const router = useRouter();
const store = useGroupRemitStore();
const remittanceDate = computed(() => store.groupRemitInfo.remittanceDate);
const memberCount = computed(() => store.groupRemitInfo.memberCount);

const selected = ref('remit');
const joinData = reactive({
  amount: null,
  currency: '',
  intermediaryBankCommission: '',
  purpose: '',
  receiverAccount: null,
  receiverAddress: '',
  receiverBank: '',
  receiverName: '',
  remittanceDate: null,
  routerCode: '',
  swiftCode: '',
});
const showError = ref(false);
const errorMessage = ref('');

const handleComplete = async () => {
  const result = await joinGroupRemit(joinData);

  if (result.status === 204) {
    store.setGroupRemitInfo({ amount: joinData.amount });
    router.push(URL.PAGE.GROUP_COMPLETE);
  } else {
    showError.value = true;
    errorMessage.value = result.message;
  }
};
</script>

<template>
  <div class="flex flex-col gap-5 h-full">
    <PlainCard>
      <Head3>공동 송금 정보</Head3>
      <CollectCard
        :remittanceDate="remittanceDate"
        :memberCount="memberCount"
        :showShadow="false"
        :showArrow="false"
      />
    </PlainCard>
    <RemitInput
      v-if="selected === 'remit'"
      @updateRemit="(data) => Object.assign(joinData, data)"
      @next="selected = 'recipient'"
    />
    <RecipientInput
      v-if="selected === 'recipient'"
      :showError="showError"
      :errorMessage="errorMessage"
      @updateRecipient="(data) => Object.assign(joinData, data)"
      @complete="handleComplete"
    />
  </div>
</template>
