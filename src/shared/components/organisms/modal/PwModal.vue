<script setup>
import { ref, watch, onMounted } from 'vue';
import Subtitle1 from '../../atoms/typography/Subtitle1.vue';
import Caption2 from '../../atoms/typography/Caption2.vue';
import Keypad from '../../atoms/Keypad.vue';

const props = defineProps({
  errorMessage: { type: String, default: '비밀번호가 올바르지 않습니다.' },
  showError: { type: Boolean, default: false },
});

const password = ref('');
const shuffledNumbers = ref([]);
const emit = defineEmits(['close', 'complete']);

const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const shuffleKeypad = () => {
  shuffledNumbers.value = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

onMounted(() => {
  shuffleKeypad();
});

const inputNumber = (num) => {
  if (password.value.length < 4) password.value += num.toString();
};
const deleteNumber = () => (password.value = password.value.slice(0, -1));
const resetAndShuffle = () => {
  password.value = '';
  shuffleKeypad();
};

watch(password, (newPassword) => {
  if (newPassword.length === 4) {
    emit('complete', newPassword);
    password.value = '';
    shuffleKeypad();
  }
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
    @click="$emit('close')"
  >
    <div
      class="bg-white rounded-t-2xl transition-all duration-300 w-full relative flex flex-col justify-between"
      @click.stop
    >
      <button
        class="absolute top-[25px] right-[25px] text-black text-xl"
        @click="$emit('close')"
      >
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="mt-[80px] text-center">
        <Subtitle1 class="text-black">전자지갑 비밀번호</Subtitle1>
      </div>

      <div class="flex justify-center gap-3 mt-4">
        <div
          v-for="i in 4"
          :key="i"
          class="w-5 h-5 rounded-full border-2"
          :class="
            password.length >= i
              ? 'bg-dol-point border-dol-point'
              : 'border-dol-dark-gray'
          "
        ></div>
      </div>

      <div class="text-center mt-2 min-h-[20px]">
        <Caption2 :class="props.showError ? 'text-dol-error' : 'opacity-0'">
          {{ props.errorMessage }}
        </Caption2>
      </div>

      <div class="mt-[80px] bg-dol-main h-[40vh] p-2 py-8 text-white">
        <Keypad
          class="w-full h-full text-white"
          :numbers="shuffledNumbers"
          @select="inputNumber"
          @reshuffle="resetAndShuffle"
          @delete="deleteNumber"
        />
      </div>
    </div>
  </div>
</template>
