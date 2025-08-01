<script setup>
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Modal from '@/shared/components/organisms/Modal.vue';
import PwModal from '@/shared/components/organisms/PwModal.vue';
import SingleCard from '@/shared/components/molecules/card/SingleCard.vue';
import { Banks } from '@/asset/images';
import { bankNameMap } from '@/shared/utils/KorEngMap';

const props = defineProps({
  showModal: Boolean,
  showPwModal: Boolean,
  accounts: Array,

  showError: Boolean,
  errorMessage: {
    type: String,
    default: '비밀번호가 올바르지 않습니다.',
  },
});

const emit = defineEmits([
  'selectAccount',
  'closeModal',
  'closePwModal',
  'passwordComplete',
  'closeModal',
  'closePwModal',
]);
</script>

<template>
  <Modal
    v-if="props.showModal"
    title="어떤 계좌를 사용할까요?"
    @close="emit('closeModal')"
  >
    <ul>
      <li
        v-for="(item, idx) in props.accounts"
        :key="idx"
        class="py-3 cursor-pointer"
        @click="emit('selectAccount', item)"
      >
        <SingleCard :image="Banks[bankNameMap[item.bankType]]"
          >{{ item.bankType }} {{ item.accountNumber }}</SingleCard
        >
      </li>
    </ul>
  </Modal>

  <PwModal
    v-if="props.showPwModal"
    title="전자지갑 비밀번호"
    :showError="props.showError"
    :errorMessage="props.errorMessage"
    @close="emit('closePwModal')"
    @complete="(pw) => emit('passwordComplete', pw)"
  />
</template>
