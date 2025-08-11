<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import DoubleCard from '@/shared/components/molecules/card/DoubleCard.vue';
import { getRecentTels } from '../services/remit.service';
import { Icons } from '@/asset/images';
import { useTransStore } from '@/entities/transaction/transaction.store';
import { formatPhoneNumber } from '@/shared/utils/format';

const { t } = useI18n();
const router = useRouter();
const store = useTransStore();

const recentTels = ref([]);

const handleSelectTel = (item) => {
  store.setTransInfo({
    ...store.transInfo,
    phoneNumber: formatPhoneNumber(item.phoneNumber),
    name: item.name,
  });

  router.push({
    path: URL.PAGE.REMIT_AMOUNT,
    query: { type: 'tel' },
  });
};

const fetchRecentTels = async () => {
  const result = await getRecentTels();
  if (result.data) {
    recentTels.value = result.data;
  }
};

onMounted(() => {
  fetchRecentTels();
});
</script>

<template>
  <div class="flex flex-col gap-[15px]">
    <Subtitle2>{{ t('remit.recentTransactions') }}</Subtitle2>
    <DoubleCard
      v-for="(item, index) in recentTels"
      :key="index"
      :title="item.name"
      :image="Icons.tel"
      @click="handleSelectTel(item)"
    >
      <Subtitle2>{{ item.phoneNumber }}</Subtitle2>
    </DoubleCard>
  </div>
</template>
