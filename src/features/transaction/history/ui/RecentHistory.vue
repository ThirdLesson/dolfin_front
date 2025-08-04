<script setup>
import { ref, onMounted } from 'vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import { getTransactions } from '../services/history.service';

const recentTransactions = ref([]);

const convertUiType = (apiType) => {
  const type = apiType?.toUpperCase();
  switch (type) {
    case 'CHARGE':
      return '충전';
    case 'WITHDRAW':
      return '출금';
    case 'DEPOSIT':
      return '입금';
    default:
      return '기타';
  }
};

const getDisplayName = (item) => {
  const type = item.type?.toUpperCase();
  switch (type) {
    case 'CHARGE':
      return '충전';
    case 'DEPOSIT':
      return item.counterPartyName || '입금';
    case 'WITHDRAW':
      return item.counterPartyName || '출금';
    default:
      return '기타';
  }
};

const getTime = (createdAt) => {
  if (!createdAt) return '';
  return createdAt.includes(' ') ? createdAt.split(' ')[1] : createdAt;
};

onMounted(async () => {
  const res = await getTransactions({
    page: 0,
    size: 3,
    sortDirection: 'LATEST',
  });

  recentTransactions.value =
    res.data?.content.flatMap((group) =>
      group.transactions.map((item) => ({
        time: getTime(item.createdAt),
        title: getDisplayName(item),
        type: convertUiType(item.type),
        amount: item.amount,
      })),
    ) || [];
});
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
          index !== recentTransactions.slice(0, 3).length - 1 ? 'border-b' : '',
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
          <Head3
            :class="item.type === '출금' ? 'text-dol-error' : 'text-dol-main'"
          >
            {{ item.amount.toLocaleString() }} P
          </Head3>
        </div>
      </li>
    </ul>
  </PlainCard>
</template>
