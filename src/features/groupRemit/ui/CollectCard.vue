<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';

const { t } = useI18n();

const props = defineProps({
  remittanceDate: Number,
  memberCount: Number,
  showShadow: {
    type: Boolean,
    default: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['click']);

const remaining = computed(() => 30 - props.memberCount);
const percent = computed(() => `${(props.memberCount / 30) * 100}%`);
const isComplete = computed(() => remaining.value === 0);
</script>

<template>
  <div
    class="w-full flex rounded-sm gap-[10px] items-center justify-between cursor-pointer"
    :class="[
      isComplete ? 'bg-dol-light-gray' : 'bg-white',
      showShadow ? 'shadow-custom-shadow p-5' : 'bg-white',
    ]"
    @click="emit('click')"
  >
    <div class="w-full flex gap-5 items-center">
      <div
        class="w-[40px] h-[40px] rounded-md flex items-center justify-center shrink-0"
        :class="isComplete ? 'bg-dol-dark-gray' : 'bg-dol-dark'"
      >
        <i
          class="bi bi-calendar4 text-xl"
          :class="isComplete ? 'text-black' : 'text-white'"
        />
      </div>
      <div class="w-full flex flex-col gap-1">
        <div class="w-full flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-5">
              <Head3>DAY {{ remittanceDate }}</Head3>
              <div class="flex items-center gap-1">
                <i class="bi bi-people-fill" />
                <Subtitle3>{{ memberCount }} / 30</Subtitle3>
              </div>
            </div>
            <Caption1 class="text-dol-dark-gray">
              {{
                isComplete
                  ? t('groupRemit.collect.done')
                  : t('groupRemit.collect.needMore', { count: remaining })
              }}</Caption1
            >
          </div>
          <i v-if="showArrow" class="bi bi-chevron-right text-xl" />
        </div>
        <div class="relative h-[8px] rounded-full border border-dol-light-gray">
          <div
            class="absolute h-full rounded-full"
            :class="isComplete ? 'bg-dol-dark-gray' : 'bg-dol-dark'"
            :style="{ width: percent }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
