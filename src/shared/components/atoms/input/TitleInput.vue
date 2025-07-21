<script setup>
const props = defineProps({
  placeholder: String,
  label: {
    type: String,
    required: true,
  },
});

const value = defineModel();
</script>

<template>
  <div class="w-full">
    <Head3 class="mb-2 text-dol-main">{{ label }}</Head3>
    <div class="border-b-2 border-dol-main">
      <input
        class="text-[15px] font-bold w-full bg-transparent border-none outline-none pb-2 placeholder-dol-light-gray"
        v-model="value"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
