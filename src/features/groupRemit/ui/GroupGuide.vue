<script setup>
import { useRouter } from 'vue-router';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons, Logos } from '@/asset/images';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const router = useRouter();
</script>

<template>
  <div class="bg-dol-sub px-4 py-6 space-y-6">
    <div class="flex flex-col text-left gap-[10px]">
      <div>
        <Head2>함께하면 더 저렴한 해외 송금</Head2>
        <Head3 class="text-dol-main font-semibold"
          >30명이 모이면 특별 혜택 시작!</Head3
        >
      </div>
      <div>
        <P2 class="text-dol-gray"
          >혼자 보내면 비싸지만, 함께 보내면 저렴해요</P2
        >
        <P2 class="text-dol-gray"
          >매월 상시 모집으로 언제든 참여 가능합니다.</P2
        >
      </div>
    </div>

    <PlainCard class="bg-white p-4">
      <div class="flex items-center items-start gap-4">
        <img
          :src="Icons.recruit"
          alt="recruit"
          class="w-[30px] h-[30px] mt-1"
        />
        <div class="flex flex-col">
          <Head3 class="mb-1">상시 모집</Head3>
          <P2 class="text-dol-gray"> 매월 1일~31일까지 언제든 참여 가능 </P2>
        </div>
      </div>
    </PlainCard>

    <PlainCard class="bg-white p-4">
      <div class="flex items-center items-start gap-4">
        <img
          :src="Icons.autoRemit"
          alt="autoRemit"
          class="w-[30px] h-[30px] mt-1"
        />
        <div class="flex flex-col">
          <Head3 class="mb-1">자동 이체</Head3>
          <P2 class="text-dol-gray">
            매월 설정한 날짜에 자동으로 송금 실행<br />
            최소 10만원 ~ 최대 300만원
          </P2>
        </div>
      </div>
    </PlainCard>

    <PlainCard class="bg-white p-4">
      <div class="flex items-center items-start gap-4">
        <img
          :src="Icons.condition"
          alt="condition"
          class="w-[30px] h-[30px] mt-1"
        />
        <div class="flex flex-col">
          <Head3 class="mb-1">참여 조건</Head3>
          <P2 class="text-dol-gray">
            KB국민은행의 스타뱅킹 가입 및 외국환거래등록이 되어 있다면 누구나
            참여 가능
          </P2>
        </div>
      </div>
    </PlainCard>

    <div
      class="rounded-xl p-6 text-center text-white bg-gradient-to-r from-[#3F7FF5] to-[#8F35EA]"
    >
      <div class="flex justify-center">
        <img :src="Logos.nbgLogo" alt="nbgLogo" class="w-[40px] h-[40px]" />
      </div>

      <div class="mt-[10px] mb-[20px]">
        <Head2>공동 송금 혜택</Head2>
      </div>

      <div>
        <P1>✓ 평균적으로 80% 수수료 할인</P1>
        <P1>✓ 금액에 따라 5% 추가 수수료 할인</P1>
      </div>
    </div>

    <div class="pt-2">
      <LgMainButton @click="() => router.push('/remit-collect')"
        >참여하기</LgMainButton
      >
    </div>
  </div>
</template>
