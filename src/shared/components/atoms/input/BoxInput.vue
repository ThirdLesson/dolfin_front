<script setup>
const props = defineProps({
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  color: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 50,
  },
});

const value = defineModel();
</script>

<template>
  <div class="w-full">
    <div
      class="border-2 border-dol-dark-gray rounded focus-within:border-dol-main transition-colors"
      :class="[
        color ? 'border-dol-sub' : 'border-dol-dark-gray',
        'focus-within:border-dol-main',
      ]"
      :style="{ height: `${height}px` }"
    >
      <input
        class="text-[15px] font-semibold w-full bg-transparent border-none outline-none h-full py-[15px] px-[20px] placeholder-dol-light-gray"
        v-model="value"
        :placeholder="placeholder"
        :type="type"
      />
    </div>
  </div>
</template>
