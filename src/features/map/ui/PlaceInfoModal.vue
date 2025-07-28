<script setup>
import Modal from '@/shared/components/organisms/Modal.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const props = defineProps({
  isOpen: Boolean,
  place: Object,
  tabType: String,
});

const emit = defineEmits(['close']);
</script>

<template>
  <Modal
    v-if="props.isOpen"
    title="상세 정보"
    button-text="확인"
    @close="emit('close')"
  >
    <div class="space-y-4 mb-6 text-gray-800">
      <div>
        <Head3>{{
          props.tabType === '다문화 가족 지원 센터' ? '센터명' : '은행 지점명'
        }}</Head3>
        <P1>{{ props.place?.name }}</P1>
      </div>
      <div>
        <Head3>주소</Head3>
        <P1>{{ props.place?.address }}</P1>
      </div>
      <div>
        <Head3>전화번호</Head3>
        <P1>{{ props.place?.phone }}</P1>
      </div>
      <div v-if="props.place?.website">
        <Head3>웹사이트</Head3>
        <P1>
          <a
            :href="props.place.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dol-dark underline hover:opacity-80"
          >
            {{ props.place.website }}
          </a>
        </P1>
      </div>
      <div>
        <Head3>{{
          props.tabType === '다문화 가족 지원 센터' ? '센터 안내' : '은행 안내'
        }}</Head3>
        <P1>{{ props.place?.description }}</P1>
      </div>
    </div>
  </Modal>
</template>
