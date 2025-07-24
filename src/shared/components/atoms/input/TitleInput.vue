<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: '텍스트를 입력해주세요',
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
});

const value = defineModel();
</script>

<template>
  <div class="w-full">
    <Head3 class="mb-2 text-dol-main">{{ title }}</Head3>
    <div class="border-b-2 border-dol-main">
      <input
        class="text-[15px] font-bold w-full bg-transparent border-none outline-none pb-2 placeholder-black"
        v-model="value"
        :placeholder="placeholder"
        :type="type"
      />
    </div>
  </div>
</template>
