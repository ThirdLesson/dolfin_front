<script setup>
import { ref, computed } from 'vue';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';

const emit = defineEmits(['next', 'update']);

const phoneNumber = ref('');
const code = ref('');
const isCodeValid = ref(false);

const handleComplete = () => {
  emit('update', {
    phoneNumber: phoneNumber.value,
  });
  emit('next');
};

// todo: 인증 코드 확인 로직 추가
const checkCode = () => {
  isCodeValid.value = true;
};

const isValid = computed(
  () => phoneNumber.value.length == 11 && isCodeValid.value,
);
</script>
<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2>본인 확인을 위해<br />휴대폰 번호를 알려주세요</Head2>
    <div class="flex flex-col gap-[40px]">
      <TitleInput title="휴대폰 번호" v-model="phoneNumber" />
      <div class="flex items-end gap-2">
        <TitleInput title="인증 번호" v-modl="code" />
        <SmMainButton class="shrink-0" @click="checkCode">확인</SmMainButton>
      </div>
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">완료</LgMainButton>
</template>
