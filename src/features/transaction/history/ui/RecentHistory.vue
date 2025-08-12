<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import { getTransactions } from '../services/history.service';

const recentTransactions = ref([]);

const { t } = useI18n();

const getTime = (createdAt) => {
  if (!createdAt) return '';
  return createdAt.includes(' ') ? createdAt.split(' ')[1] : createdAt;
};

const getUiType = (type) => {
  switch (type) {
    case 'WITHDRAW':
      return t('history.label.withdraw');
    case 'DEPOSIT':
      return t('history.label.deposit');
    case 'CHARGE':
      return t('history.label.charge');
    default:
      return '';
  }
};

onMounted(async () => {
  const res = await getTransactions({
    page: 0,
    size: 4,
    sortDirection: 'LATEST',
  });

  recentTransactions.value =
    res.data?.content.flatMap((group) =>
      group.transactions.map((item) => ({
        time: getTime(item.createdAt),
        title:
          item.type === 'DEPOSIT' || item.type === 'WITHDRAW'
            ? item.counterPartyName || getUiType(item.type)
            : getUiType(item.type),
        type: getUiType(item.type),
        amount: item.amount,
      })),
    ) || [];
});
</script>

<template>
  <PlainCard>
    <div class="flex flex-col gap-4">
      <Head3>{{ t('history.title.recentHistory') }}</Head3>
      <ul v-if="recentTransactions.length > 0" class="flex flex-col gap-3">
        <li
          v-for="(item, index) in recentTransactions.slice(0, 4)"
          :key="index"
          :class="[
            'flex justify-between',
            index !== recentTransactions.slice(0, 4).length - 1
              ? 'border-b pb-3'
              : '',
          ]"
        >
          <div>
            <Caption2 class="text-dol-light-gray">{{ item.time }}</Caption2>
            <Head3>{{ item.title }}</Head3>
          </div>
          <div class="flex flex-col items-end">
            <Caption1
              :class="
                item.type === t('history.label.withdraw')
                  ? 'text-dol-error'
                  : 'text-dol-main'
              "
            >
              {{ item.type }}
            </Caption1>
            <Head3
              :class="
                item.type === t('history.label.withdraw')
                  ? 'text-dol-error'
                  : 'text-dol-main'
              "
            >
              {{ item.amount.toLocaleString() }} P
            </Head3>
          </div>
        </li>
      </ul>
      <P1 v-else class="text-dol-dark-gray"
        >{{ t('history.label.exists') }}
      </P1>
    </div>
  </PlainCard>
</template>
