<script setup>
import LoginInput from '@/features/user/login/ui/LoginInput.vue';
import logo from '@/asset/logo/logo.png';
</script>

<template>
  <div class="h-full flex flex-col justify-center">
    <div
      class="w-full h-[20vh] flex justify-center items-center overflow-hidden select-none"
    >
      <img :src="logo" alt="logo" class="w-[80%] object-cover" />
    </div>
    <LoginInput />
  </div>
</template>
