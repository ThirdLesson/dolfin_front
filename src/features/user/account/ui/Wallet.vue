<script setup>
import { ref, onMounted } from 'vue';
import URL from '@/shared/constants/URL';
import { useRouter } from 'vue-router';
import CircleLogo from '@/asset/logo/circleLogo.png';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import MdSubButton from '@/shared/components/atoms/button/MdSubButton.vue';
import MdMainButton from '@/shared/components/atoms/button/MdMainButton.vue';
import { getBalance } from '@/features/user/account/services/account.service';

const router = useRouter();
const isAccountRegistered = ref(false);
const accountBalance = ref(0);

const fetchBalance = async () => {
  const result = await getBalance();
  accountBalance.value = result.data.balance ?? 0;
};

onMounted(() => {
  fetchBalance();
});
</script>

<template>
  <PlainCard
    v-if="!isAccountRegistered"
    class="flex flex-col items-center justify-center cursor-pointer gap-3 h-[200px]"
    @click="() => router.push(URL.PAGE.ACCOUNT)"
  >
    <i class="bi bi-plus-circle-dotted text-5xl text-dol-light-gray"></i>
    <P1 class="text-dol-light-gray">계좌 등록하기</P1>
  </PlainCard>

  <PlainCard v-else class="flex flex-col bg-gray-50 p-6 gap-3">
    <div class="flex flex-row items-center gap-2 self-start">
      <img :src="CircleLogo" alt="Bank Logo" class="w-[52px] h-[52px]" />
      <div class="flex flex-col">
        <Subtitle3>DolFin 전자지갑</Subtitle3>
        <P2 class="text-gray-400">현재 잔액 포인트</P2>
      </div>
    </div>

    <Head1
      class="mb-3 cursor-pointer text-center w-full"
      @click="() => router.push(URL.PAGE.HISTORY)"
    >
      {{ accountBalance.toLocaleString() }} P
    </Head1>

    <div class="flex gap-4 w-full justify-center">
      <MdSubButton @click="() => router.push(URL.PAGE.CHARGE)"
        >충전하기</MdSubButton
      >
      <MdMainButton @click="() => router.push(URL.PAGE.REMIT)"
        >송금하기</MdMainButton
      >
    </div>
  </PlainCard>
</template>
