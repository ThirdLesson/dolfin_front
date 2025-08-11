<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons } from '@/asset/images';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';
import { countryNameMap } from '@/shared/utils/KorEngMap';

const { t } = useI18n({ useScope: 'global' });

const router = useRouter();
const store = useGroupRemitStore();

const currency = store.groupRemitInfo.currency;
const remittanceDate = store.groupRemitInfo.remittanceDate;
const amount = store.groupRemitInfo.amount;
const commission = store.groupRemitInfo.commission;
const totalAmount = store.getTotalAmount;
</script>

<template>
  <div class="flex flex-col h-full w-full justify-between">
    <div class="flex flex-col gap-10">
      <div class="h-[30vh] flex flex-col justify-end items-center gap-5">
        <img :src="Icons.check" alt="check" />
        <div class="flex flex-col items-center">
          <Head1>{{ t('groupRemit.complete.applied') }}</Head1>
          <div class="flex flex-col gap-1">
            <Head2 class="text-dol-dark-gray text-center">
              {{ t('groupRemit.complete.notifyTitle') }}
            </Head2>
            <P2 class="text-dol-main">
              {{ t('groupRemit.complete.fxNote') }}
            </P2>
          </div>
        </div>
      </div>

      <div class="flex flex-col bg-dol-light-sub rounded-md p-5 gap-[15px]">
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">{{
            t('groupRemit.complete.summary.country')
          }}</Subtitle2>
          <P1>{{ countryNameMap[currency] }}</P1>
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">{{
            t('groupRemit.complete.summary.amount')
          }}</Subtitle2>
          <P1
            >{{ amount?.toLocaleString()
            }}{{ t('groupRemit.remit.currencyWon') }}</P1
          >
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">{{
            t('groupRemit.complete.summary.commission')
          }}</Subtitle2>
          <P1
            >{{ commission.toLocaleString()
            }}{{ t('groupRemit.remit.currencyWon') }}</P1
          >
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">{{
            t('groupRemit.complete.summary.total')
          }}</Subtitle2>
          <P1 class="text-dol-main"
            >{{ totalAmount.toLocaleString()
            }}{{ t('groupRemit.remit.currencyWon') }}</P1
          >
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">{{
            t('groupRemit.complete.summary.date')
          }}</Subtitle2>
          <P1>{{
            t('groupRemit.complete.summary.monthly', { day: remittanceDate })
          }}</P1>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col gap-2 items-center">
      <Caption1 class="underline text-dol-dark-gray">
        {{ t('groupRemit.complete.warning') }}
      </Caption1>
      <LgMainButton @click="router.push(URL.PAGE.MAIN)">{{
        t('groupRemit.complete.ok')
      }}</LgMainButton>
    </div>
  </div>
</template>
