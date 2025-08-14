<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import CollectCard from '@/features/groupRemit/ui/CollectCard.vue';

import { Logos } from '@/asset/images';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';
import { formatAccountNumber } from '@/shared/utils/format';
import { getMyAccounts } from '@/features/transaction/remit/services/remit.service';
import { signOut } from '@/features/user/login/services/login.service';
import { useUserStore } from '@/entities/user/user.store';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';
import {
  getMemberCount,
  getGroupRemitInfo,
  cancelGroupRemit,
} from '@/features/groupRemit/service/groupRemit.service';
import {
  currencyImgOptions,
  languageOptions,
} from '@/shared/constants/options';

const { t, locale } = useI18n({ useScope: 'global' });

const router = useRouter();
const groupRemitStore = useGroupRemitStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const myAccounts = ref([]);
const groupRemitInfo = ref(null);
const memberCount = ref(0);
const remittanceDate = ref(
  groupRemitStore.groupRemitInfo.remittanceDate || null,
);
const language = ref(userInfo.value.language);
const currency = ref(userInfo.value.currency);

const groupRemitExists = computed(() => !!groupRemitInfo.value?.groupExists);

const handleLogout = async () => {
  await signOut();
  router.push(URL.PAGE.LOGIN);
};

const fetchMyAccounts = async () => {
  const result = await getMyAccounts();
  if (result?.data) {
    myAccounts.value = result.data;
  }
};

const getMemberCountByDay = async () => {
  if (!groupRemitStore.groupRemitInfo.currency || !remittanceDate.value) return;
  const result = await getMemberCount({
    currency: groupRemitStore.groupRemitInfo.currency,
  });
  const matched = result.data.find((item) => item.day === remittanceDate.value);
  memberCount.value = matched?.memberCount ?? 0;
};

const fetchGroupRemitInfo = async () => {
  const result = await getGroupRemitInfo();

  if (result?.data) {
    groupRemitInfo.value = result.data;
  }
};

const handleCancel = async () => {
  const result = await cancelGroupRemit();

  if (result.status === 204) {
    window.location.reload();
  }
};

watch(language, (val, old) => {
  if (val !== old) {
    userStore.setUserInfo({ language: val });
    locale.value = val;
  }
});

watch(currency, (val, old) => {
  if (val !== old) userStore.setUserInfo({ currency: val });
});

watch(
  () => userInfo.value.walletId,
  (id) => {
    if (id) fetchMyAccounts();
  },
  { immediate: true },
);

onMounted(() => {
  fetchGroupRemitInfo();
  getMemberCountByDay();
  locale.value = language.value || 'ko';
  const info = groupRemitStore.groupRemitInfo;
  if (!info.remittanceDate || !info.amount) {
    info.isSignedUp = false;
  }
});
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-[15px] overflow-y-auto p-[2px] select-none"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img :src="Logos.circleLogo" class="w-[50px] h-[50px]" />
        <Head2
          >{{ userInfo.name || t('mypage.user')
          }}{{ t('common.suffix') }}</Head2
        >
      </div>
      <button
        class="text-dol-dark-gray cursor-pointer underline"
        @click="handleLogout"
      >
        <P1>{{ t('mypage.logout') }}</P1>
      </button>
    </div>

    <PlainCard>
      <Head3>{{ t('mypage.basicInfo') }}</Head3>
      <div class="flex flex-col gap-[5px]">
        <div class="flex justify-between">
          <P1>{{ t('mypage.phoneNumber') }}</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.phoneNumber || '-' }}</P1>
        </div>
        <div class="flex justify-between">
          <P1>{{ t('mypage.nationality') }}</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.nationality || '-' }}</P1>
        </div>
        <div class="flex justify-between">
          <P1>{{ t('mypage.birth') }}</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.birth || '-' }}</P1>
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex flex-col gap-[15px]">
        <Head3>{{ t('mypage.languageSetting') }}</Head3>
        <div class="flex flex-col gap-[5px]">
          <P1>{{ t('mypage.selectLanguage') }}</P1>
          <Dropdown v-model="language" :options="languageOptions" />
        </div>
        <div class="flex flex-col gap-[5px]">
          <P1>{{ t('mypage.defaultCurrency') }}</P1>
          <Dropdown v-model="currency" :options="currencyImgOptions" />
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between">
        <Head3>{{ t('mypage.remainingStay') }}</Head3>
        <div class="flex flex-col text-right">
          <Head3>{{
            t('mypage.daysLeft', { days: userStore.remainDays })
          }}</Head3>
          <P1 class="text-dol-dark-gray whitespace-nowrap">
            {{ t('mypage.until', { date: userInfo.remainTime || '-' }) }}
          </P1>
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between items-center">
        <Head3>{{ t('mypage.accountStatus') }}</Head3>
        <P2
          class="text-dol-dark-gray cursor-pointer underline"
          @click="router.push(URL.PAGE.ACCOUNT)"
        >
          {{ t('mypage.addAccount') }}
        </P2>
      </div>
      <div v-if="myAccounts.length > 0" class="flex flex-col gap-3 mt-2">
        <DoubleCard
          v-for="(item, idx) in myAccounts"
          :key="idx"
          :title="item.bankType"
          :image="Banks[bankNameMap[item.bankType]]"
          :show-shadow="false"
        >
          <P1 class="whitespace-nowrap">
            {{ formatAccountNumber(item.accountNumber) }}
          </P1>
        </DoubleCard>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between">
        <Head3>{{ t('mypage.groupRemitStatus') }}</Head3>
        <P2
          v-if="groupRemitExists"
          class="text-dol-dark-gray underline cursor-pointer"
          @click="handleCancel"
        >
          {{ t('mypage.cancel') }}
        </P2>
      </div>
      <CollectCard
        v-if="groupRemitExists"
        :remittanceDate="groupRemitInfo.remittanceDate"
        :memberCount="groupRemitInfo.memberCount"
        :currency="groupRemitInfo.groupCurrency"
        :showShadow="false"
        :showArrow="false"
      />
      <P1 v-else class="text-dol-dark-gray">{{ t('mypage.exists') }}</P1>
    </PlainCard>
  </div>
</template>
