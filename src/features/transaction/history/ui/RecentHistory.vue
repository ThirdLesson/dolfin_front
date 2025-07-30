<script setup>
import { ref } from 'vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';

const recentTransactions = ref([
  { time: '10:55:14', title: '외국인', type: '송금', amount: -1800 },
  { time: '10:53:37', title: '더치페이', type: '더치페이', amount: -3200 },
  { time: '10:53:36', title: '포인트 충전', type: '충전', amount: 10000 },
]);
</script>

<template>
  <PlainCard class="px-4 py-4">
    <Head3>최근 거래 내역</Head3>
    <ul class="divide-y divide-gray-200 mt-2">
      <li
        v-for="(tx, index) in recentTransactions"
        :key="index"
        class="flex justify-between py-3"
      >
        <div>
          <Caption2 class="text-gray-400">{{ tx.time }}</Caption2>
          <Head3>{{ tx.title }}</Head3>
        </div>
        <div class="flex flex-col items-end">
          <Caption1 class="text-gray-400">{{ tx.type }}</Caption1>
          <Head3 :class="tx.amount > 0 ? 'text-blue-500' : 'text-red-500'">
            {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount.toLocaleString() }} P
          </Head3>
        </div>
      </li>
    </ul>
  </PlainCard>
</template>
