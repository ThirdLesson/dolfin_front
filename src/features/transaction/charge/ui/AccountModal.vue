<script setup>
import Modal from '@/shared/components/organisms/Modal.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';

const props = defineProps({
  showModal: Boolean,
  accounts: Array,
});

const emit = defineEmits(['select', 'close']);
</script>

<template>
  <Modal
    v-if="props.showModal"
    title="어떤 계좌를 사용할까요?"
    :showButton="false"
    @close="emit('close')"
  >
    <ul class="flex flex-col gap-[15px]">
      <li
        v-for="(item, idx) in props.accounts"
        :key="idx"
        class="cursor-pointer"
        @click="emit('select', item)"
      >
        <SingleCard :image="Banks[bankNameMap[item.bankType]]"
          >{{ item.bankType }} {{ item.accountNumber }}</SingleCard
        >
      </li>
    </ul>
  </Modal>
</template>
