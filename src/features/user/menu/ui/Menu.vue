<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icons } from '@/asset/images.js';
import URL from '@/shared/constants/URL';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div class="w-full flex flex-col shadow-custom-shadow rounded-sm">
    <div class="flex">
      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer py-4"
        @click="() => router.push(URL.PAGE.GROUP)"
      >
        <div class="h-[60px] justify-center items-center overflow-hidden">
          <img
            :src="Icons.groupRemit"
            alt="group-remit"
            class="w-full h-full object-fit"
          />
        </div>
        <P1>{{ t('mainpage.menu.groupRemit') }}</P1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer border-l border-dol-light-gray h-[70%] self-center"
        @click="() => router.push(URL.PAGE.RECOMMENDATION)"
      >
        <div class="h-[60px] justify-center items-center overflow-hidden">
          <img
            :src="Icons.recommendation"
            alt="recommend"
            class="w-full h-full object-fit"
          />
        </div>
        <P1 class="text-center">{{ t('mainpage.menu.recommendation') }}</P1>
      </div>

      <div
        class="flex flex-col items-center justify-center w-1/3 cursor-pointer border-l border-dol-light-gray h-[70%] self-center"
        @click="() => router.push(URL.PAGE.DUTCH)"
      >
        <div
          class="h-[60px] w-[70px] justify-center items-center overflow-hidden"
        >
          <img
            :src="Icons.dutchpay"
            alt="dutchpay"
            class="w-full h-full object-fit"
          />
        </div>
        <P1>{{ t('mainpage.menu.dutchpay') }}</P1>
      </div>
    </div>
  </div>
</template>
