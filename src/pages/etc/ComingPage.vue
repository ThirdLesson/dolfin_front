<script setup>
import Head2 from '@/shared/components/atoms/typography/Head1.vue';
import P2 from '@/shared/components/atoms/typography/P1.vue';
import coming from '@/asset/logo/comingLogo.png';
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col justify-center items-center overflow-hidden"
  >
    <img :src="coming" alt="coming" />
    <Head2>준비중입니다.</Head2>
    <P2>추후 더 좋은 서비스로 찾아뵙겠습니다.</P2>
  </div>
</template>
