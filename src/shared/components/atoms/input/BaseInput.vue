<script setup>
import Subtitle2 from '../typography/Subtitle2.vue';
import Head3 from '../typography/Head3.vue';
import P1 from '../typography/P1.vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'box',
    validator: (value) => ['box', 'line-default', 'line-sub'].includes(value),
  },
  modelValue: String,
  placeholder: String,
  readonly: Boolean,
  title: String,
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  if (!props.readonly) {
    emit('update:modelValue', event.target.value);
  }
};

const styles = {
  container: {
    box: 'h-[50px] border-2 border-dol-dark-gray rounded focus-within:border-dol-main transition-colors',
    'line-default': 'border-b-2 border-dol-main',
    'line-sub': 'border-b border-dol-light-gray',
  },
  input: {
    box: 'w-full bg-transparent border-none outline-none h-full py-[15px] px-[20px] placeholder-dol-light-gray',
    'line-default':
      'w-full bg-transparent border-none outline-none pb-2 placeholder-dol-light-gray',
    'line-sub':
      'w-full bg-transparent border-none outline-none pb-2 placeholder-dol-light-gray',
  },
  component: {
    box: Subtitle2,
    'line-default': Head3,
    'line-sub': P1,
  },
};
</script>

<template>
  <div class="w-full">
    <Head3 v-if="variant === 'line-default' && title" class="mb-2">{{
      title
    }}</Head3>
    <div :class="styles.container[variant]">
      <component :is="styles.component[variant]">
        <input
          :class="styles.input[variant]"
          :value="modelValue"
          :placeholder="placeholder"
          :readonly="readonly"
          @input="handleInput"
        />
      </component>
    </div>
  </div>
</template>
