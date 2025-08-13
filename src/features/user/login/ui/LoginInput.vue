<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import URL from '@/shared/constants/URL';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import BoxInput from '@/shared/components/atoms/input/BoxInput.vue';
import LgMainButton from '@/shared/components/atoms/button/LgMainButton.vue';
import { signIn } from '../services/login.service';
import { useUserStore } from '@/entities/user/user.store';

const { t } = useI18n({ useScope: 'global' });

const router = useRouter();
const userStore = useUserStore();
const { isFCMInitialized } = storeToRefs(userStore);

const loginId = ref('');
const password = ref('');

const handleLogin = async () => {
  const result = await signIn({
    loginId: loginId.value,
    password: password.value,
  });
  if (result) {
    userStore.setUserInfo(result);
    userStore.setAccessToken(result.accessToken);
    isFCMInitialized.value = false;
    router.push(URL.PAGE.MAIN);
  } else {
    alert(t('login.error'));
  }
  loginId.value = '';
  password.value = '';
};
</script>

<template>
  <div class="flex flex-col gap-[25px]">
    <BoxInput :placeholder="t('login.id')" v-model="loginId" />
    <BoxInput
      :placeholder="t('login.password')"
      v-model="password"
      type="password"
    />
    <div class="flex justify-center items-center gap-[50px] text-dol-dark-gray">
      <P1
        class="underline cursor-pointer"
        @click="router.push(URL.PAGE.SIGNUP)"
      >
        {{ t('login.signup') }}
      </P1>
      <P1>|</P1>
      <P1
        class="underline cursor-pointer"
        @click="router.push(URL.PAGE.COMING)"
      >
        {{ t('login.forgotPassword') }}
      </P1>
    </div>
    <LgMainButton @click="handleLogin">{{ t('login.login') }}</LgMainButton>
  </div>
</template>
