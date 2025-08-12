<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import { formatDate } from '@/shared/utils/format';

const { t } = useI18n({ useScope: 'global' });

const props = defineProps({ signUpResult: Object });
const router = useRouter();

const infos = [
  {
    labelKey: 'signup.result.passport',
    value: props.signUpResult?.passportNumber,
  },
  {
    labelKey: 'signup.result.nationality',
    value: props.signUpResult?.nationality,
  },
  {
    labelKey: 'signup.result.birth',
    value: formatDate(props.signUpResult?.birth),
  },
  {
    labelKey: 'signup.result.remainTime',
    value: formatDate(props.signUpResult?.remainTime),
  },
];
</script>

<template>
  <div class="flex flex-col flex-1 gap-[5vh] justify-center">
    <div class="flex flex-col gap-[8vh]">
      <Head2>{{
        t('signup.result.welcomeTitle', {
          name: props.signUpResult?.name || '',
          suffix: t('common.suffix'),
        })
      }}</Head2>
      <Subtitle2 class="text-dol-dark">
        <span class="text-dol-dark-gray">|</span>
        {{ t('signup.result.remainTitle') }}
      </Subtitle2>
    </div>

    <section>
      <div class="w-full h-[2px] bg-dol-light-gray" />
      <div
        v-for="info in infos"
        :key="info.labelKey"
        class="w-full px-4 py-3 flex border-b border-1 border-dol-light-gray"
      >
        <div class="w-[90%] flex items-center justify-between">
          <Subtitle2>{{ t(info.labelKey) }}</Subtitle2>
          <P1>{{ info.value }}</P1>
        </div>
      </div>
      <div class="w-full h-[1px] bg-dol-light-gray" />
    </section>
  </div>
  <LgMainButton @click="router.push(URL.PAGE.LOGIN)">{{
    t('common.complete')
  }}</LgMainButton>
</template>
