<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'disabled'].includes(value),
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
    'border-none',
    'rounded-lg',
    'font-medium',
    'cursor-pointer',
    'transition-all',
    'duration-200',
    'text-white',
    'font-sans',
  ];

  // 사이즈별 클래스
  const sizeClasses = {
    large: ['h-[60px]', 'w-full', 'text-base'],
    medium: ['h-[35px]', 'w-full', 'text-sm'],
    small: ['h-[35px]', 'w-[50px]', 'text-sm'],
  };

  // 색상별 클래스
  const variantClasses = {
    primary: ['bg-dol-main'],
    secondary: ['bg-dol-sub', 'text-[#000000]'],
    disabled: ['bg-dol-light-gray', 'cursor-not-allowed'],
  };

  // 상태별 클래스
  if (props.disabled) {
    return [
      ...baseClasses,
      ...sizeClasses[props.size],
      ...variantClasses.disabled,
    ];
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
  ];
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>
