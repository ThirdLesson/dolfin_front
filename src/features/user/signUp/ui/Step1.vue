<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';
import TitleInput from '@/shared/components/atoms/input/TitleInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import SmMainButton from '@/shared/components/atoms/button/SmMainButton.vue';
import { checkId } from '../services/signUp.service';

const { t } = useI18n({ useScope: 'global' });
const emit = defineEmits(['next', 'update']);

const loginId = ref('');
const password = ref('');
const passwordCheck = ref('');
const isIdValid = ref(null);
const idErrorMsg = ref('');
const pwErrorMsg = ref('');

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;

const handleCheckId = async () => {
  if (loginId.value.length < 6) {
    isIdValid.value = false;
    idErrorMsg.value = t('signup.step1.idTooShort');
    return;
  }
  idErrorMsg.value = '';
  const result = await checkId({ loginId: loginId.value });
  if (result.status === 400) {
    isIdValid.value = false;
    idErrorMsg.value = t('signup.step1.idExists');
  } else {
    isIdValid.value = true;
  }
};

const handleComplete = () => {
  if (password.value !== passwordCheck.value) {
    pwErrorMsg.value = t('signup.step1.passwordMismatch');
    return;
  }
  emit('update', { loginId: loginId.value, password: password.value });
  emit('next');
};

const isValid = computed(
  () =>
    loginId.value.length >= 6 &&
    isIdValid.value === true &&
    password.value &&
    passwordCheck.value,
);

watch(loginId, () => {
  isIdValid.value = null;
  idErrorMsg.value = '';
});

watch(password, () => {
  if (!password.value) {
    pwErrorMsg.value = '';
    return;
  }
  pwErrorMsg.value = passwordPattern.test(password.value)
    ? ''
    : t('signup.step1.passwordRules');
});
</script>

<template>
  <div class="flex flex-col flex-1 gap-[10vh] justify-center">
    <Head2
      >{{ t('signup.step1.title1') }}<br />{{ t('signup.step1.title2') }}</Head2
    >
    <div class="flex flex-col gap-[40px]">
      <div class="flex flex-col gap-[2px]">
        <div class="flex items-end gap-2">
          <TitleInput :title="t('signup.step1.id')" v-model="loginId" />
          <SmMainButton class="shrink-0" @click="handleCheckId">
            {{ t('signup.step1.checkDuplicate') }}
          </SmMainButton>
        </div>
        <div class="h-[2px]">
          <Caption2 v-if="idErrorMsg" class="text-dol-error">{{
            idErrorMsg
          }}</Caption2>
          <Caption2 v-else-if="isIdValid === true" class="text-dol-dark">
            {{ t('signup.step1.idAvailable') }}
          </Caption2>
        </div>
      </div>

      <div class="flex flex-col gap-[2px]">
        <TitleInput
          :title="t('signup.step1.password')"
          type="password"
          v-model="password"
        />
        <div class="h-[2px]">
          <Caption2 v-if="pwErrorMsg" class="text-dol-error">{{
            pwErrorMsg
          }}</Caption2>
        </div>
      </div>

      <TitleInput
        :title="t('signup.step1.passwordConfirm')"
        type="password"
        v-model="passwordCheck"
      />
    </div>
  </div>
  <LgMainButton :disabled="!isValid" @click="handleComplete">{{
    t('common.complete')
  }}</LgMainButton>
</template>
