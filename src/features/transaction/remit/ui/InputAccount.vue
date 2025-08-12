<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { checkAccountName } from '../services/remit.service';
import { useTransStore } from '@/entities/transaction/transaction.store';
import { transferBankOptions } from '@/shared/constants/options';

const router = useRouter();
const store = useTransStore();
const { t } = useI18n();

const accountNumber = ref(null);
const bankType = ref(transferBankOptions[0].value);
const showError = ref(false);
const errorMsg = ref('');

const bankLabelMap = Object.fromEntries(
  transferBankOptions.map((o) => [o.value, o.label]),
);

const selectedBankNameKo = computed(() =>
  t(bankLabelMap[bankType.value] ?? ''),
);

const handleNext = async () => {
  // console.log('bankType', selectedBankNameKo.value);
  const result = await checkAccountName({
    accountNumber: accountNumber.value,
    bankType: selectedBankNameKo.value,
  });

  if (result?.status) {
    store.setTransInfo({
      accountNumber: Number(accountNumber.value),
      bankType: bankType.value,
      name: result.data.name,
    });

    router.push({
      path: URL.PAGE.REMIT_AMOUNT,
      query: { type: 'account' },
    });
  } else {
    showError.value = true;
    errorMsg.value = result.message;
  }
};

watch([accountNumber], () => {
  if (showError.value) {
    showError.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-[15px]">
      <div class="flex flex-col gap-[15px]">
        <Subtitle2>{{ t('remit.accountNumber') }}</Subtitle2>
        <BoxInput
          :placeholder="t('remit.accountNumberPlaceholder')"
          v-model="accountNumber"
        />
      </div>
      <Dropdown
        :title="t('remit.bankSelect')"
        :options="transferBankOptions"
        v-model="bankType"
      />
    </div>
    <div class="flex flex-col items-center">
      <Caption1
        class="text-dol-error transition-opacity duration-200"
        :class="!showError && 'opacity-0'"
      >
        {{ errorMsg }}
      </Caption1>
      <LgMainButton @click="handleNext">{{
        t('common.complete')
      }}</LgMainButton>
    </div>
  </div>
</template>
