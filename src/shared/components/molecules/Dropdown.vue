<script setup>
import { ref, computed } from 'vue';
import Subtitle2 from '../atoms/typography/Subtitle2.vue';
import { useI18n } from 'vue-i18n';

const model = defineModel(); // 양방향 바인딩을 위한 변수
const props = defineProps({
  title: String,
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
  color: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const isOpen = ref(false);

const select = (option) => {
  model.value = option;
  isOpen.value = false;
};

// 옵션 라벨(i18n 키)을 번역해 _label 로 보강
const localizedOptions = computed(() =>
  props.options.map((o) => ({
    ...o,
    _label: typeof o.label === 'string' ? t(o.label) : o.label,
  })),
);

// 선택 표시 localizedOptions 기준으로 찾고, _label 사용
const selectedOption = computed(() => {
  return (
    localizedOptions.value.find((opt) => opt.value === model.value) ||
    localizedOptions.value[0]
  );
});
</script>
<template>
  <div class="w-full flex flex-col gap-[10px]" v-bind="$attrs">
    <!-- title 도 t() 적용 (키면 번역, 일반문자면 원문) -->
    <Subtitle2 v-if="props.title" :class="props.color && 'text-dol-main'">{{
      t(props.title)
    }}</Subtitle2>
    <div class="relative">
      <div
        class="h-[50px] px-5 border-2 text-[15px] font-semibold rounded-sm flex items-center justify-between cursor-pointer"
        :class="[
          props.color && 'border-dol-main',
          isOpen ? 'border-dol-main' : 'border-dol-dark-gray',
        ]"
        @click="isOpen = !isOpen"
      >
        <div class="flex items-center gap-2">
          <img
            v-if="selectedOption?.src"
            :src="selectedOption.src"
            class="w-5 h-5 object-contain"
          />
          {{ selectedOption?._label }}
        </div>
        <i
          :class="isOpen ? 'text-dol-main' : 'text-dol-dark-gray'"
          class="bi bi-caret-down-fill"
        />
      </div>
      <ul
        v-if="isOpen"
        class="absolute top-[48px] z-10 mt-1 w-full border border-dol-dark-gray rounded bg-white shadow"
      >
        <!-- 변경: props.options → localizedOptions, item.label → item._label -->
        <li
          v-for="item in localizedOptions"
          :key="item.value"
          @click="select(item.value)"
          class="flex items-center h-[45px] px-4 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
        >
          <div class="flex items-center gap-[10px]">
            <div
              v-if="item.src"
              class="h-5 w-5 flex items-center justify-center"
            >
              <img :src="item.src" class="object-fit" />
            </div>
            {{ item._label }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
