<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { addAccount } from '../services/account.service';
import { accountBankOptions } from '@/shared/constants/options';

const { t } = useI18n();

const emit = defineEmits(['next']);

const bankId = ref('');
const bankPassword = ref('');
const accountNumber = ref('');
const bankType = ref(accountBankOptions[0].value);
const showError = ref(false);
const errorMsg = ref('');

const bankLabelMap = Object.fromEntries(
  accountBankOptions.map((o) => [o.value, o.label]),
);

const selectedBankNameKo = computed(() =>
  t(bankLabelMap[bankType.value] ?? ''),
);

const handleNext = async () => {
  const result = await addAccount({
    accountNumber: accountNumber.value,
    bankId: bankId.value,
    bankPassword: bankPassword.value,
    bankType: selectedBankNameKo.value,
  });

  if (!result.data) {
    errorMsg.value = result.message;
    showError.value = true;
    return;
  }

  const authCode = result.data.authCode;
  emit('next', {
    accountNumber: accountNumber.value,
    bankType: selectedBankNameKo.value,
    authCode,
  });
};

watch([bankId, bankPassword], () => {
  if (showError.value) {
    showError.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-[25vh] flex flex-col items-center justify-center gap-[5px]"
    >
      <Subtitle1>{{ t('account.add.title') }}</Subtitle1>
      <Caption1>{{ t('account.add.caption') }}</Caption1>
    </div>

    <div class="flex flex-1 flex-col justify-between">
      <div class="w-full flex flex-col gap-[15px]">
        <Dropdown
          :title="'account.add.selectBank'"
          :options="accountBankOptions"
          v-model="bankType"
        />
        <BoxInput
          :title="t('account.add.accountNumber')"
          v-model="accountNumber"
        />
        <BoxInput :title="t('account.add.bankLoginId')" v-model="bankId" />
        <BoxInput
          :title="t('account.add.bankLoginPw')"
          v-model="bankPassword"
          type="password"
        />
      </div>

      <div class="flex flex-col items-center gap-1">
        <Caption1 v-if="showError" class="text-dol-error">{{
          errorMsg
        }}</Caption1>
        <LgMainButton @click="handleNext">{{ t('common.next') }}</LgMainButton>
      </div>
    </div>
  </div>
</template>
