<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Dropdown from '@/shared/components/molecules/Dropdown.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import CollectCard from '@/features/groupRemit/ui/CollectCard.vue';

import logo from '@/asset/logo/circlelogo.png';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';
import { formatAccountNumber } from '@/shared/utils/format';
import { getMyAccounts } from '@/features/transaction/remit/services/remit.service';
import { signOut } from '@/features/user/login/services/login.service';
import { useUserStore } from '@/entities/user/user.store';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';
import { getMemberCount } from '@/features/groupRemit/service/groupRemit.service';

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const groupRemitStore = useGroupRemitStore();

const myAccounts = ref([]);
const memberCount = ref(0);
const remittanceDate = ref(
  groupRemitStore.groupRemitInfo.remittanceDate || null,
);

const language = ref('ko');
const currency = ref('krw');
const languageOptions = [
  { label: '한국어', value: 'ko' },
  { label: '영어', value: 'en' },
];
const currencyOptions = [
  { label: 'KRW (원)', value: 'krw' },
  { label: 'USD (달러)', value: 'usd' },
];

const handleLogout = async () => {
  try {
    await signOut();
  } finally {
    userStore.clearUserInfo();
    localStorage.removeItem('token');
    router.push('/');
  }
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
  <div class="flex flex-col px-4 py-4 space-y-4 overflow-y-auto">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-2">
        <img :src="logo" class="w-[50px] h-[50px]" />
        <Head2>{{ userInfo.name || '사용자' }}님</Head2>
      </div>
      <button
        class="text-dol-dark-gray cursor-pointer underline"
        @click="handleLogout"
      >
        <P2>로그아웃</P2>
      </button>
    </div>

    <PlainCard>
      <Head3>기본 정보</Head3>
      <div class="grid grid-cols-2 gap-y-2 w-full">
        <P1>휴대폰 번호</P1>
        <P1 class="text-right text-dol-dark-gray">{{
          userInfo.phoneNumber || '-'
        }}</P1>
        <P1>국적</P1>
        <P1 class="text-right text-dol-dark-gray">{{
          userInfo.nationality || '-'
        }}</P1>
        <P1>생년월일</P1>
        <P1 class="text-right text-dol-dark-gray">{{
          userInfo.birth || '-'
        }}</P1>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex flex-col gap-3">
        <Head3>언어 및 통화 설정</Head3>
        <div>
          <P2 class="pb-1">언어 선택</P2>
          <Dropdown v-model="language" :options="languageOptions" />
        </div>
        <div>
          <P2 class="pb-1">기본 통화</P2>
          <Dropdown v-model="currency" :options="currencyOptions" />
        </div>
      </div>
    </PlainCard>

    <PlainCard>
      <div class="flex justify-between">
        <Head3>잔여 체류 기간</Head3>
        <div class="flex flex-col text-right">
          <Head3 class="text-dol-primary"
            >{{ userStore.remainDays }}일 남음</Head3
          >
          <P1 class="text-dol-dark-gray whitespace-nowrap">
            {{ userInfo.remainTime || '-' }} 까지
          </P1>
        </div>
      </div>
    </PlainCard>

    <PlainCard v-if="myAccounts.length > 0">
      <Head3>등록 계좌 현황</Head3>
      <div class="flex flex-col gap-3 mt-2">
        <DoubleCard
          v-for="(item, idx) in myAccounts"
          :key="idx"
          :title="item.bankType"
          class="whitespace-nowrap"
          :image="Banks[bankNameMap[item.bankType]]"
          :show-shadow="false"
        >
          <P1 class="whitespace-nowrap">
            {{ formatAccountNumber(item.accountNumber) }}
          </P1>
        </DoubleCard>
      </div>
    </PlainCard>

    <PlainCard v-if="groupRemitStore.groupRemitInfo.isSignedUp">
      <div class="flex justify-between">
        <Head3>내 공동 송금 참여 내역</Head3>
        <Caption2 class="underline cursor-pointer">취소하기</Caption2>
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
