<script setup>
import { ref } from 'vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';

const showDetail = ref(false);
</script>
<template>
  <div
    class="w-full flex justify-between items-center rounded-b-sm border-2 border-dol-light-bg px-5 py-[15px] cursor-pointer"
    @click="showDetail = !showDetail"
  >
    <div class="flex items-center gap-2">
      <Subtitle2>총 21,000.91 VND</Subtitle2>
      <Subtitle3 class="text-dol-main">최대 혜택가</Subtitle3>
    </div>
    <div class="flex items-center gap-1">
      <Caption1>자세히</Caption1>
      <i
        class="bi bi-caret-down-fill text-dol-light-gray transition-transform duration-300"
        :class="{ 'rotate-180': showDetail }"
      />
    </div>
  </div>
  <Transition name="slide-fade">
    <div
      v-show="showDetail"
      class="w-full flex flex-col bg-dol-light-bg p-4 rounded-b-sm mt-[-3px]"
    >
      <ul class="flex flex-col gap-1">
        <li class="flex justify-between">
          <P1 class="max-w-[80%]">• KB스타뱅킹 앱 이용 시</P1>
          <P1 class="shrink-0">21,000.91 VND</P1>
        </li>
        <li class="flex justify-between">
          <P1 class="max-w-[60%]" style="word-break: keep-all"
            >• 최근 1년 이내 인터넷 환전 이용 실적 있는 경우</P1
          >
          <P1 class="shrink-0">21,000.21 VND</P1>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 500px;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
