<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';

const { t } = useI18n();

const props = defineProps({
  policyList: Array,
  changguAmount: String,
});

const showDetail = ref(false);

const maxBenefitAmount = computed(() => {
  if (!props.policyList || props.policyList.length === 0) return '';
  return props.policyList[0].amount;
});
</script>

<template>
  <div
    class="w-full flex justify-between items-center rounded-b-sm border-2 border-dol-light-bg px-5 py-[15px] cursor-pointer"
    @click="showDetail = !showDetail"
  >
    <div class="flex items-center gap-2">
      <Subtitle2
        >{{ t('benefit.totalPrefix') }} {{ maxBenefitAmount }}</Subtitle2
      >
    </div>
    <div class="flex items-center gap-1">
      <Caption1 class="text-dol-main">{{ t('benefit.more') }}</Caption1>
      <i
        class="bi bi-caret-down-fill text-dol-main transition-transform duration-300"
        :class="{ 'rotate-180': showDetail }"
      />
    </div>
  </div>

  <Transition name="slide-fade">
    <div
      v-show="showDetail"
      class="w-full flex flex-col bg-dol-light-sub p-4 rounded-b-sm mt-[-3px]"
    >
      <ul class="flex flex-col gap-1">
        <li
          v-if="props.changguAmount"
          class="flex justify-between items-center"
        >
          <Subtitle3 class="text-dol-dark-gray"
            >ⓘ {{ t('benefit.counterNotice') }}</Subtitle3
          >
          <Subtitle3 class="text-dol-dark-gray">{{
            props.changguAmount
          }}</Subtitle3>
        </li>
        <li
          v-for="(item, index) in props.policyList"
          :key="index"
          class="flex justify-between"
        >
          <P1 class="max-w-[70%] break-keep">• {{ item.name }}</P1>
          <P1 class="shrink-0">{{ item.amount }}</P1>
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
