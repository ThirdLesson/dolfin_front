<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import AccountList from '@/features/transaction/remit/ui/AccountList.vue';
import TelList from '@/features/transaction/remit/ui/TelList.vue';
import URL from '@/shared/constants/URL';

const options = [
  {
    label: '계좌번호',
    value: 'account',
  },
  {
    label: '전화번호',
    value: 'tel',
  },
];

const selected = ref('account');
const router = useRouter();
</script>

<template>
  <div class="flex flex-col h-full justify-between gap-5">
    <div class="flex flex-col gap-5">
      <Subtitle1>어디로 보낼까요?</Subtitle1>
      <SquareTab :options="options" v-model="selected" />
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
