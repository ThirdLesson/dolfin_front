<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { Line } from 'vue-chartjs';

// Chart.js에 필요한 요소 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
);

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
