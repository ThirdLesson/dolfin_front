<script setup>
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
          <Head1>참여 신청 완료</Head1>
          <div class="flex flex-col gap-1">
            <Head2 class="text-dol-dark-gray text-center"
              >혜택이 시작되면 알림으로 안내해드릴게요!</Head2
            >
            <P2 class="text-dol-main"
              >송금 당일 우대환율 30%가 적용된 가격으로 환전되어 송금이
              이뤄집니다.</P2
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-dol-light-sub rounded-md p-5 gap-[15px]">
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">송금 국가</Subtitle2>
          <P1>{{ countryNameMap[currency] }}</P1>
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">송금 금액</Subtitle2>
          <P1>{{ amount?.toLocaleString() }}원</P1>
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">예상 수수료</Subtitle2>
          <P1> {{ commission.toLocaleString() }}원</P1>
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">총 예상 금액</Subtitle2>
          <P1 class="text-dol-main">{{ totalAmount.toLocaleString() }}원</P1>
        </div>
        <div class="flex items-center justify-between">
          <Subtitle2 class="text-dol-dark-gray">송금 예정일</Subtitle2>
          <P1>매월 {{ remittanceDate }}일</P1>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 items-center">
      <Caption1 class="underline text-dol-dark-gray"
        >공동 송금 날짜에 전자지갑 잔액이 부족하면 해외 송금에 실패할 수
        있습니다.</Caption1
      >
      <LgMainButton @click="router.push(URL.PAGE.MAIN)">확인</LgMainButton>
    </div>
  </div>
</template>
