<script setup>
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import MdMainButton from '@/shared/components/atoms/button/MdMainButton.vue';
import MdSubButton from '@/shared/components/atoms/button/MdSubButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import SmSubButton from '@/shared/components/atoms/button/SmSubButton.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import NavBar from '@/shared/components/organisms/NavBar.vue';

import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <Head1>Head1입니다</Head1>
  <Head2>Head2입니다</Head2>
  <Head3>Head3입니다</Head3>
  <Subtitle1>Subtitle1입니다</Subtitle1>
  <Subtitle2>Subtitle2입니다</Subtitle2>
  <Subtitle3>Subtitle3입니다</Subtitle3>
  <P1>P1입니다</P1>
  <P2>P2입니다</P2>
  <Caption1>Caption1 입니다.</Caption1>
  <Caption2>Caption2 입니다.</Caption2>
  <SingleCard
    title="제목"
    image="https://images.icon-icons.com/29/PNG/256/animal_dolphin_2740.png"
  >
    <Subtitle3 class="text-dol-dark-gray">hihihih</Subtitle3>
  </SingleCard>
  <DoubleCard
    image="https://images.icon-icons.com/29/PNG/256/animal_dolphin_2740.png"
    title="제목"
    subtitle="부제목"
  >
    <div>
      <Caption1>this is caption</Caption1>
      <Subtitle2>hihihiih</Subtitle2>
    </div>
  </DoubleCard>
  <LgMainButton>완료됨</LgMainButton>
  <MdMainButton>완료</MdMainButton>
  <MdSubButton>완료</MdSubButton>
  <SmMainButton disabled>확인</SmMainButton>
  <SmSubButton disabled>확인</SmSubButton>
  <LineInput
    label="제목"
    placeholder="텍스트를 입력하세요"
    v-model="value"
  ></LineInput>
  <NavBar></NavBar>
</template>
