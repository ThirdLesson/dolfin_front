<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import { countryOptions } from '@/shared/constants/options';

const { t } = useI18n({ useScope: 'global' });

const props = defineProps({ joinSuccess: { type: Boolean } });
const emit = defineEmits(['next', 'update']);

const name = ref('');
const passportNumber = ref('');
const nationality = ref('');
const month = ref('');
const day = ref('');
const year = ref('');

const birth = computed(() => {
  if (
    year.value.length === 4 &&
    month.value.length >= 1 &&
    day.value.length >= 1
  ) {
    const y = year.value;
    const m = month.value.padStart(2, '0');
    const d = day.value.padStart(2, '0');
    return parseInt(`${y}${m}${d}`);
  }
  return null;
});

const isValid = computed(
  () =>
    name.value &&
    birth.value &&
    passportNumber.value &&
    nationality.value &&
    birth.value,
);

const handleComplete = () => {
  emit('update', {
    name: name.value,
    birth: birth.value,
    passportNumber: passportNumber.value,
    nationality: nationality.value,
  });
  emit('submit');
};
</script>

<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center overflow-y-scroll">
    <Head2>{{ t('signup.step3.title') }}</Head2>
    <div class="flex flex-col gap-[40px]">
      <TitleInput :title="t('signup.step3.name')" v-model="name" />
      <div tabindex="-1">
        <Head3 class="mb-2 text-dol-main">{{ t('signup.step3.birth') }}</Head3>
        <div class="flex gap-2 border-b-2 border-dol-main pb-2">
          <input
            class="text-[15px] font-bold w-1/3 text-center bg-transparent outline-none"
            :placeholder="t('signup.step3.yyyy')"
            maxlength="4"
            v-model="year"
          />
          <span class="text-dol-main">/</span>
          <input
            class="text-[15px] font-bold w-1/3 text-center bg-transparent outline-none"
            :placeholder="t('signup.step3.mm')"
            maxlength="2"
            v-model="month"
          />
          <span class="text-dol-main">/</span>
          <input
            class="text-[15px] font-bold w-1/3 text-center bg-transparent outline-none"
            :placeholder="t('signup.step3.dd')"
            maxlength="2"
            v-model="day"
          />
        </div>
      </div>
      <TitleInput
        :title="t('signup.step3.passport')"
        v-model="passportNumber"
      />
      <Dropdown
        :title="t('signup.step3.nationality')"
        :options="countryOptions"
        v-model="nationality"
        color="true"
      />
    </div>
  </div>
  <div class="w-full flex flex-col items-center gap-2">
    <div class="h-4">
      <Caption1 v-show="!joinSuccess" class="underline text-dol-error">
        {{ t('signup.step3.notFound') }}
      </Caption1>
    </div>
    <LgMainButton :disabled="!isValid" @click="handleComplete">{{
      t('common.complete')
    }}</LgMainButton>
  </div>
</template>
