<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import URL from '@/shared/constants/URL';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import SmallDropdown from '@/shared/components/molecules/SmallDropdown.vue';
import CollectCard from './CollectCard.vue';
import { currencyOptions } from '@/shared/constants/options';
import { getMemberCount } from '../service/groupRemit.service';
import { useGroupRemitStore } from '@/entities/groupRemit/groupRemit.store';

const router = useRouter();
const store = useGroupRemitStore();

const selectedType = ref(currencyOptions[0].value);
const groupList = ref([]);

const handleClick = (item) => {
  store.setGroupRemitInfo({
    currency: selectedType.value,
    remittanceDate: item.day,
    memberCount: item.memberCount,
  });

  router.push(URL.PAGE.GROUP_SIGNUP);
};

const fetchMemberCount = async () => {
  const result = await getMemberCount({
    currency: selectedType.value,
  });

  groupList.value = result.data;
};

watch(
  selectedType,
  () => {
    fetchMemberCount();
    store.setGroupRemitInfo({
      currency: selectedType.value,
    });
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <Head2>공동 송금에 참여하여 <br />수수료를 절약해보세요.</Head2>
  <div class="flex flex-col gap-5">
    <div class="flex justify-end mt-[10px]">
      <SmallDropdown :options="currencyOptions" v-model="selectedType" />
    </div>
    <div class="flex flex-col gap-[15px]">
      <CollectCard
        v-for="item in groupList"
        :key="item.day"
        :remittanceDate="item.day"
        :memberCount="item.memberCount"
        @click="handleClick(item)"
      />
    </div>
  </div>
</template>
