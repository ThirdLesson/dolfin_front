<script setup>
import { useRouter } from 'vue-router';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons, Logos } from '@/asset/images';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';

const router = useRouter();
</script>

<template>
  <div class="bg-dol-sub flex flex-col gap-6">
    <div class="flex flex-col text-left">
      <div class="pt-[10px]">
        <Head2>함께하면 더 저렴한 해외 송금</Head2>
        <Head3 class="text-dol-main">30명이 모이면 특별 혜택 시작!</Head3>
      </div>
      <div class="pt-[10px]">
        <P2 class="text-dol-gray"
          >혼자 보내면 비싸지만, 함께 보내면 저렴해요</P2
        >
        <P2 class="text-dol-gray"
          >매월 상시 모집으로 언제든 참여 가능합니다.</P2
        >
      </div>
    </div>

    <SingleCard
      class="bg-white"
      :title="'상시 모집'"
      :subtitle="'매월 1일~31일까지 언제든 참여 가능'"
      :image="Icons.recruit"
    />

    <SingleCard
      class="bg-white"
      :title="'자동 이체'"
      :subtitle="'매월 설정한 날짜에 자동으로 송금 실행\n최소 10만원 ~ 최대 300만원'"
      :image="Icons.autoRemit"
    />

    <SingleCard
      class="bg-white"
      :title="'참여 조건'"
      :subtitle="'KB국민은행의 스타뱅킹 가입 및 외국환 거래 등록이 되어 있다면 누구나 참여 가능'"
      :image="Icons.condition"
    />

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
