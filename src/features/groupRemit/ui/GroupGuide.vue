<script setup>
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons, Logos } from '@/asset/images';

const emit = defineEmits(['click']);

const text = [
  {
    title: '상시 모집',
    subtitle: '매월 1일~31일까지 언제든 참여 가능',
    image: Icons.recruit,
  },
  {
    title: '자동 이체',
    subtitle:
      '매월 설정한 날짜에 최소 10만원에서 최대 300만원까지 자동으로 송금 실행',
    image: Icons.autoRemit,
  },
  {
    title: '참여 조건',
    subtitle:
      'KB국민은행의 스타뱅킹 가입 및 외국환 거래 등록이 되어 있다면 누구나 참여 가능',
    image: Icons.condition,
  },
];
</script>

<template>
  <div class="bg-dol-sub flex flex-col gap-5">
    <div class="flex flex-col gap-5">
      <div>
        <Head2>함께하면 더 저렴한 해외 송금</Head2>
        <Head3 class="text-dol-main">30명이 모이면 특별 혜택 시작!</Head3>
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

    <SingleCard
      v-for="(item, idx) in text"
      :key="idx"
      :title="item.title"
      :subtitle="item.subtitle"
      :image="item.image"
    />

    <div
      class="flex flex-col gap-3 rounded-xl p-6 text-center text-white bg-gradient-to-r from-[#3F7FF5] to-[#8F35EA]"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center">
          <img :src="Logos.nbgLogo" alt="nbgLogo" class="w-[40px] h-[40px]" />
        </div>
        <Head2>공동 송금 혜택</Head2>
      </div>
      <div>
        <P1>✓ 우대 환율 30% 혜택 적용</P1>
        <P1>✓ 전신료 면제로 저렴한 해외 송금</P1>
        <P1>✓ 중계 은행 수수료 전액 면제</P1>
        <P1>✓ 송금 수수료 건당 5,000원 적용</P1>
      </div>
    </div>

    <div>
      <LgMainButton @click="emit('click')">참여하기</LgMainButton>
    </div>
  </div>
</template>
