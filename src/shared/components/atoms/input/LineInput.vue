<script setup>
const props = defineProps({
  placeholder: String,
});

const value = defineModel();
</script>

<template>
  <div class="w-full">
    <div
      class="border-b border-dol-light-gray focus-within:border-dol-main transition-colors"
    >
      <input
        class="text-[12px] font-medium w-full bg-transparent border-none outline-none placeholder-dol-light-gray"
        v-model="value"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
