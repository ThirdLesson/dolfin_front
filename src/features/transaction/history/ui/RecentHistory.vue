<script setup>
import { ref } from 'vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';

const recentTransactions = ref([
  { time: '10:55:14', title: '외국인', type: '출금', amount: -1800 },
  { time: '10:53:37', title: '더치페이', type: '출금', amount: -3200 },
  { time: '10:53:36', title: '포인트 충전', type: '충전', amount: 10000 },
  { time: '10:50:00', title: '보너스', type: '충전', amount: 3000 },
]);
</script>

<template>
  <PlainCard>
    <Head3>최근 거래 내역</Head3>
    <ul class="flex flex-col gap-3">
      <li
        v-for="(item, index) in recentTransactions.slice(0, 3)"
        :key="index"
        :class="[
          'flex justify-between pb-3',
          index !== recentTransactions.slice(0, 3).length - 1
            ? 'border-b border-dol-light-gray'
            : '',
        ]"
      >
        <div>
          <Caption2 class="text-dol-light-gray">{{ item.time }}</Caption2>
          <Head3>{{ item.title }}</Head3>
        </div>
        <div class="flex flex-col items-end">
          <Caption1
            :class="item.type === '출금' ? 'text-dol-error' : 'text-dol-main'"
          >
            {{ item.type }}
          </Caption1>
          <Head3 :class="item.amount > 0 ? 'text-dol-main' : 'text-dol-error'">
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toLocaleString() }} P
          </Head3>
        </div>
      </li>
    </ul>
  </PlainCard>
</template>
