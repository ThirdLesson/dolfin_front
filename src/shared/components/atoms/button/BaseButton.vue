<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'sub', 'disabled'].includes(value),
  },
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['large', 'medium', 'small'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
  ];

  const sizeClasses = {
    large: ['h-[60px]', 'w-full'],
    medium: ['h-[35px]', 'w-full'],
    small: ['h-[35px]', 'w-[50px]'],
  };

  const colorClasses = {
    main: ['bg-dol-main', 'cursor-pointer', 'text-white'],
    sub: ['bg-dol-sub', 'cursor-pointer'],
    disabled: ['bg-dol-light-gray', 'cursor-not-allowed', 'text-white'],
  };

  if (props.disabled) {
    return [
      ...baseClasses,
      ...sizeClasses[props.size],
      ...colorClasses.disabled,
    ];
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...colorClasses[props.color],
  ];
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>
