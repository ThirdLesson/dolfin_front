<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import CollectCard from '@/features/groupRemit/ui/CollectCard.vue';
import RemitInput from '@/features/groupRemit/ui/RemitInput.vue';
import RecipientInput from '@/features/groupRemit/ui/RecipientInput.vue';
import {
  joinGroupRemit,
  getMemberCount,
} from '@/features/groupRemit/service/groupRemit.service';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

const { t } = useI18n({ useScope: 'global' });

const router = useRouter();
const store = useGroupRemitStore();

const remittanceDate = computed(() => store.groupRemitInfo.remittanceDate);
const memberCount = ref(null);

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

const getMemberCountByDay = async () => {
  const result = await getMemberCount({
    currency: store.groupRemitInfo.currency,
  });
  const matched = result.data.find((item) => item.day === remittanceDate.value);
  memberCount.value = matched?.memberCount ?? 0;
};

const handleComplete = async () => {
  const result = await joinGroupRemit(joinData);
  if (result.status === 204) {
    store.setGroupRemitInfo({ amount: joinData.amount, isSignedUp: true });
    router.push(URL.PAGE.GROUP_COMPLETE);
  } else {
    showError.value = true;
    errorMessage.value = result.message;
  }
};

onMounted(() => {
  getMemberCountByDay();
});
</script>

<template>
  <div class="flex flex-col gap-5 h-full">
    <PlainCard>
      <Head3>{{ t('groupRemit.info.title') }}</Head3>
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
