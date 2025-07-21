<script setup>
const props = defineProps({
  placeholder: String,
});

const value = defineModel();
</script>

<template>
  <div class="w-full">
    <div
      class="h-[50px] border-2 border-dol-dark-gray rounded focus-within:border-dol-main transition-colors"
    >
      <input
        class="text-[15px] font-semibold w-full bg-transparent border-none outline-none h-full py-[15px] px-[20px] placeholder-dol-light-gray"
        v-model="value"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
