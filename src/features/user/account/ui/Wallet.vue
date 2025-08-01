<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user/user.store';
import { getWalletInfo } from '@/features/user/account/services/account.service';

import URL from '@/shared/constants/URL';
import CircleLogo from '@/asset/logo/circleLogo.png';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import MdSubButton from '@/shared/components/atoms/button/MdSubButton.vue';
import MdMainButton from '@/shared/components/atoms/button/MdMainButton.vue';

const router = useRouter();
const accountBalance = ref(null);
const walletId = ref(null);

const userStore = useUserStore();
const { setWalletId } = userStore;

const fetchWalletInfo = async () => {
  const result = await getWalletInfo();

  if (result.data) {
    accountBalance.value = result.data.balance;
    walletId.value = result.data.walletId;
    setWalletId(result.data.walletId);
  }
};

const isRegistered = computed(() => walletId.value === null);

onMounted(() => {
  fetchWalletInfo();
});
</script>

<template>
  <PlainCard
    v-if="isRegistered"
    class="flex flex-col items-center justify-center cursor-pointer gap-3 h-[20vh]"
    @click="() => router.push(URL.PAGE.ACCOUNT)"
  >
    <i class="bi bi-plus-circle-dotted text-5xl text-dol-light-gray" />
    <P1 class="text-dol-light-gray">계좌 등록하기</P1>
  </PlainCard>

  <PlainCard v-else class="flex flex-col">
    <div class="flex flex-row items-center gap-2 self-start">
      <img :src="CircleLogo" alt="Bank Logo" class="w-[52px] h-[52px]" />
      <div class="flex flex-col">
        <Subtitle3>DolFin 전자지갑</Subtitle3>
        <P2 class="text-dol-dark-gray">현재 잔액 포인트</P2>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <Head1
        class="cursor-pointer text-center w-full"
        @click="() => router.push(URL.PAGE.HISTORY)"
      >
        {{ accountBalance?.toLocaleString() }} P
      </Head1>

      <div class="flex gap-4 w-full justify-center">
        <MdSubButton @click="() => router.push(URL.PAGE.CHARGE)"
          >충전하기</MdSubButton
        >
        <MdMainButton @click="() => router.push(URL.PAGE.REMIT_SELECT)"
          >송금하기</MdMainButton
        >
      </div>
    </div>
  </PlainCard>
</template>
