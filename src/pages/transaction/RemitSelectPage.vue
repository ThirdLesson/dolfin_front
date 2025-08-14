<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import AccountList from '@/features/transaction/remit/ui/AccountList.vue';
import TelList from '@/features/transaction/remit/ui/TelList.vue';
import URL from '@/shared/constants/URL';
import { remitOptions } from '@/shared/constants/options';

const router = useRouter();
const { t } = useI18n();

const selected = ref(remitOptions[0].value);
</script>

<template>
  <div class="flex flex-col h-full justify-between gap-5 select-none">
    <div class="flex flex-col gap-5">
      <Subtitle1>{{ t('remit.where') }}</Subtitle1>
      <SquareTab :options="remitOptions" v-model="selected" />
      <AccountList v-if="selected === 'account'" />
      <TelList v-if="selected === 'tel'" />
    </div>
    <LgMainButton
      @click="
        () =>
          router.push({ path: URL.PAGE.REMIT_INPUT, query: { type: selected } })
      "
      >다음</LgMainButton
    >
  </div>
</template>
