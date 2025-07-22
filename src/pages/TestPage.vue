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
import LineInput from '@/shared/components/atoms/input/LineInput.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import RoundTab from '@/shared/components/molecules/RoundTab.vue';
import SquareTab from '@/shared/components/molecules/SquareTab.vue';

import { ref } from 'vue';

const value = ref('');
const isModalOpen = ref(false);
const isPwModalOpen = ref(false);

const passwordResult = ref('');
const showError = ref(false);
const errorMessage = ref('');
const userPassword = '1234';

const handleConfirm = () => {
  console.log('Modal 확인 버튼 클릭됨');
  isModalOpen.value = false;
};

const handleComplete = (inputPassword) => {
  if (inputPassword === userPassword) {
    passwordResult.value = `비밀번호 일치: ${inputPassword}`;
    showError.value = false;
    isPwModalOpen.value = false;
  } else {
    passwordResult.value = `비밀번호 불일치: ${inputPassword}`;
    showError.value = true;
    errorMessage.value = '비밀번호가 올바르지 않습니다.';
  }
};

const handleModalClose = () => {
  showError.value = false;
  errorMessage.value = '';
};

const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];

const tab = ref('apple');
const opt = ref('사과');
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Typography 테스트 -->
    <div class="space-y-2">
      <Head1>Typography 테스트</Head1>
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
    </div>

    <!-- Card 테스트 -->
    <div class="space-y-4">
      <Head1>Card 테스트</Head1>
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
    </div>

    <!-- Button 테스트 -->
    <div class="space-y-4">
      <Head1>Button 테스트</Head1>
      <div class="grid grid-cols-2 gap-4">
        <LgMainButton>완료됨</LgMainButton>
        <MdMainButton>완료</MdMainButton>
        <MdSubButton>완료</MdSubButton>
        <SmMainButton disabled>확인</SmMainButton>
        <SmSubButton disabled>확인</SmSubButton>
      </div>
    </div>

    <!-- Input 테스트 -->
    <div class="space-y-4">
      <Head1>Input 테스트</Head1>
      <LineInput
        label="제목"
        placeholder="텍스트를 입력하세요"
        v-model="value"
      />
      <P2>입력된 값: {{ value }}</P2>
    </div>

    <!-- Modal 테스트 -->
    <div class="space-y-4">
      <Head1>Modal 테스트</Head1>

      <div class="grid grid-cols-1 gap-4">
        <MdMainButton @click="isModalOpen = true">
          간단 모달 열기
        </MdMainButton>

        <MdSubButton @click="isPwModalOpen = true">
          비밀번호 모달 열기
        </MdSubButton>
      </div>

      <div
        v-if="passwordResult"
        class="p-4 bg-blue-100 text-blue-800 rounded-lg"
      >
        <Subtitle3>{{ passwordResult }}</Subtitle3>
      </div>
    </div>
  </div>

  <Modal
    v-if="isModalOpen"
    title="테스트 모달"
    buttonText="확인"
    @confirm="handleConfirm"
    @close="isModalOpen = false"
  >
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus
      in quo voluptates, incidunt consequatur magni ipsa quibusdam. Quo ut,
      similique officia incidunt rerum libero delectus a quas molestiae maxime
      iure. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Necessitatibus in quo voluptates, incidunt consequatur magni ipsa
      quibusdam. Quo ut, similique officia incidunt rerum libero delectus a quas
      molestiae maxime iure. Lorem ipsum dolor, sit amet consectetur adipisicing
      elit. Necessitatibus in quo voluptates, incidunt consequatur magni ipsa
      quibusdam. Quo ut, similique officia incidunt rerum libero delectus a quas
      molestiae maxime iure.
    </p>
  </Modal>

  <PwModal
    v-if="isPwModalOpen"
    :showError="showError"
    :errorMessage="errorMessage"
    @complete="handleComplete"
    @close="
      () => {
        isPwModalOpen = false;
        handleModalClose();
      }
    "
  />

  <!-- Tab 테스트 -->
  <SquareTab v-model="tab" :options="options"></SquareTab>
  <RoundTab v-model="opt" opt1="사과" opt2="오렌지" />
</template>
