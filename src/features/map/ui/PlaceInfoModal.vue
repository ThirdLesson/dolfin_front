<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Modal from '@/shared/components/organisms/Modal.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';

const props = defineProps({
  isOpen: Boolean,
  place: Object,
  tabKey: String,
});

const emit = defineEmits(['close']);

const { t } = useI18n();

const nameLabel = computed(() => {
  return props.tabKey === 'multicultural'
    ? t('modal.centerName')
    : t('modal.bankName');
});
</script>

<template>
  <Modal
    v-if="props.isOpen"
    :title="t('modal.title')"
    :buttonText="t('modal.confirm')"
    @close="emit('close')"
  >
    <div class="space-y-4 mb-6">
      <div>
        <Head3>{{ nameLabel }}</Head3>
        <P1>{{ props.place?.name }}</P1>
      </div>
      <div>
        <Head3>{{ t('modal.address') }}</Head3>
        <P1>{{ props.place?.address }}</P1>
      </div>
      <div>
        <Head3>{{ t('modal.phone') }}</Head3>
        <P1>{{ props.place?.tel }}</P1>
      </div>
      <div>
        <Head3>{{ t('modal.website') }}</Head3>
        <P1>
          <a
            :href="props.place?.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dol-dark underline hover:opacity-80"
          >
            {{ props.place?.website }}
          </a>
        </P1>
      </div>
    </div>
  </Modal>
</template>
