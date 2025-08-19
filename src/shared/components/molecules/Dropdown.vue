<script setup>
import { ref, computed } from 'vue';
import Subtitle2 from '../atoms/typography/Subtitle2.vue';
import { useI18n } from 'vue-i18n';

const model = defineModel();
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

const localizedOptions = computed(() =>
  props.options.map((o) => ({
    ...o,
    translatedLabel: typeof o.label === 'string' ? t(o.label) : o.label,
  })),
);

const selectedOption = computed(() => {
  return (
    localizedOptions.value.find((opt) => opt.value === model.value) ||
    localizedOptions.value[0]
  );
});
</script>

<template>
  <div class="w-full flex flex-col gap-[10px]" v-bind="$attrs">
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
        @touchstart.prevent="isOpen = !isOpen"
      >
        <div class="flex items-center gap-2">
          <img
            v-if="selectedOption?.src"
            :src="selectedOption.src"
            class="w-5 h-5 object-contain"
          />
          {{ selectedOption?.translatedLabel }}
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
        <li
          v-for="item in localizedOptions"
          :key="item.value"
          @click="select(item.value)"
          @touchstart.prevent="select(item.value)"
          class="flex items-center h-[45px] px-4 border-b border-dol-light-gray hover:bg-dol-sub text-[15px] font-semibold cursor-pointer"
        >
          <div class="flex items-center gap-[10px]">
            <div
              v-if="item.src"
              class="h-5 w-5 flex items-center justify-center"
            >
              <img :src="item.src" class="object-fit" />
            </div>
            {{ item.translatedLabel }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
