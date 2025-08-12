<script setup>
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { Icons, Logos } from '@/asset/images';

const { t } = useI18n();
const emit = defineEmits(['click']);

const text = [
  {
    title: t('groupRemit.benefit.items.recruit.title'),
    subtitle: t('groupRemit.benefit.items.recruit.subtitle'),
    image: Icons.recruit,
  },
  {
    title: t('groupRemit.benefit.items.auto.title'),
    subtitle: t('groupRemit.benefit.items.auto.subtitle'),
    image: Icons.autoRemit,
  },
  {
    title: t('groupRemit.benefit.items.cond.title'),
    subtitle: t('groupRemit.benefit.items.cond.subtitle'),
    image: Icons.condition,
  },
];
</script>

<template>
  <div class="bg-dol-light-sub flex flex-col gap-5">
    <div class="flex flex-col gap-5">
      <div>
        <Head2>{{ t('groupRemit.benefit.title') }}</Head2>
        <Head3 class="text-dol-main">{{
          t('groupRemit.benefit.subtitle')
        }}</Head3>
      </div>
      <div>
        <P2 class="text-dol-gray">{{ t('groupRemit.benefit.desc1') }}</P2>
        <P2 class="text-dol-gray">{{ t('groupRemit.benefit.desc2') }}</P2>
      </div>
    </div>

    <SingleCard
      v-for="(item, idx) in text"
      :key="idx"
      :title="item.title"
      :subtitle="item.subtitle"
      :image="item.image"
      class="animate-fadein will-change-transform will-change-opacity"
    />

    <div
      class="flex flex-col gap-3 rounded-xl p-6 text-center text-white bg-gradient-to-r from-[#3F7FF5] to-[#8F35EA] animate-fadein will-change-transform will-change-opacity"
      :style="{
        animationDelay: `${text.length * 0.3}s`,
      }"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center">
          <img :src="Logos.nbgLogo" alt="nbgLogo" class="w-[40px] h-[40px]" />
        </div>
        <Head2>{{ t('groupRemit.benefit.blockTitle') }}</Head2>
      </div>
      <div>
        <P1>✓ {{ t('groupRemit.benefit.points.rate') }}</P1>
        <P1>✓ {{ t('groupRemit.benefit.points.cable') }}</P1>
        <P1>✓ {{ t('groupRemit.benefit.points.intermediary') }}</P1>
        <P1>✓ {{ t('groupRemit.benefit.points.fee') }}</P1>
      </div>
    </div>

    <div>
      <LgMainButton
        @click="emit('click')"
        class="animate-fadein will-change-transform will-change-opacity"
        :style="{
          animationDelay: `${(text.length + 1) * 0.3}s`,
        }"
      >
        {{ t('common.join') }}
      </LgMainButton>
    </div>
  </div>
</template>
