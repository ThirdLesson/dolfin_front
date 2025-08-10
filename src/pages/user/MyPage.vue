<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

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
import { getMemberCount } from '@/features/groupRemit/service/groupRemit.service';
import {
  currencyImgOptions,
  languageOptions,
} from '@/shared/constants/options';

const router = useRouter();
const groupRemitStore = useGroupRemitStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const myAccounts = ref([]);
const memberCount = ref(0);
const remittanceDate = ref(
  groupRemitStore.groupRemitInfo.remittanceDate || null,
);

const language = ref(userInfo.value.language);
const currency = ref(userInfo.value.currency);

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

watch(language, (val, old) => {
  if (val !== old) userStore.setUserInfo({ language: val });
});

watch(currency, (val, old) => {
  if (val !== old) userStore.setUserInfo({ currency: val });
});

onMounted(() => {
  fetchMyAccounts();
  getMemberCountByDay();
  const info = groupRemitStore.groupRemitInfo;
  if (!info.remittanceDate || !info.amount) {
    info.isSignedUp = false;
  }
});
</script>

<template>
  <div class="h-full w-full flex flex-col gap-[15px] overflow-y-auto p-[2px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img :src="Logos.circleLogo" class="w-[50px] h-[50px]" />
        <Head2>{{ userInfo.name || '사용자' }}님</Head2>
      </div>
      <button
        class="text-dol-dark-gray cursor-pointer underline"
        @click="handleLogout"
      >
        <P1>로그아웃</P1>
      </button>
    </div>

    <PlainCard>
      <Head3>기본 정보</Head3>
      <div class="flex flex-col gap-[5px]">
        <div class="flex justify-between">
          <P1>휴대폰 번호</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.phoneNumber || '-' }}</P1>
        </div>
        <div class="flex justify-between">
          <P1>국적</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.nationality || '-' }}</P1>
        </div>
        <div class="flex justify-between">
          <P1>생년월일</P1>
          <P1 class="text-dol-dark-gray">{{ userInfo.birth || '-' }}</P1>
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex flex-col gap-[15px]">
        <Head3>언어 및 통화 설정</Head3>
        <div class="flex flex-col gap-[5px]">
          <P1>언어 선택</P1>
          <Dropdown v-model="language" :options="languageOptions" />
        </div>
        <div class="flex flex-col gap-[5px]">
          <P1>기본 통화</P1>
          <Dropdown v-model="currency" :options="currencyImgOptions" />
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between">
        <Head3>잔여 체류 기간</Head3>
        <div class="flex flex-col text-right">
          <Head3>{{ userStore.remainDays }}일 남음</Head3>
          <P1 class="text-dol-dark-gray whitespace-nowrap">
            {{ userInfo.remainTime || '-' }} 까지
          </P1>
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between items-center">
        <Head3>등록 계좌 현황</Head3>
        <P2
          class="text-dol-dark-gray cursor-pointer underline"
          @click="router.push(URL.PAGE.ACCOUNT)"
          >계좌 추가 등록</P2
        >
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
        <Head3>내 공동 송금 참여 내역</Head3>
        <P2 class="text-dol-dark-gray underline cursor-pointer">취소하기</P2>
      </div>
      <CollectCard
        :remittanceDate="groupRemitStore.groupRemitInfo.remittanceDate"
        :memberCount="memberCount"
        :showShadow="false"
        :showArrow="false"
      />
    </PlainCard>
  </div>
</template>
