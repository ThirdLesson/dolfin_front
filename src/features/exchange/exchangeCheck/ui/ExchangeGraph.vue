<script setup>
import { ref, watch, computed } from 'vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import PlainCard from '@/shared/components/molecules/card/PlainCard.vue';
import LineChart from './LineChart.vue';
import { getExchangeGraph } from '../service/exchangeCheck.service';

const props = defineProps({
  currency: String,
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '환율',
      data: [],
      borderColor: '#5264BF',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      tension: 0.1,
      pointRadius: 2,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value) => `${value.toLocaleString()}`,
      },
    },
  },
});

const chartKey = ref(0);

const currency = computed(() => props.currency);

const getGraphData = async () => {
  const result = await getExchangeGraph(currency.value);

  chartData.value.labels = result.data.map((item) => {
    const date = new Date(item.exchangeDate);
    return `${date.getMonth() + 1}/${date.getDate()}`; // "10/1"
  });

  chartData.value.datasets[0].data = result.data.map(
    (item) => item.exchangeValue,
  );
};

watch(
  currency,
  () => {
    getGraphData();
    chartKey.value++; // 그래프 다시 그리기
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <PlainCard>
    <Head3>환율 변화 그래프</Head3>
    <div class="w-full h-[250px]">
      <LineChart
        v-if="chartData.labels.length && chartData.datasets[0].data.length"
        :chartData="chartData"
        :chartOptions="chartOptions"
        :key="chartKey"
      />
    </div>
  </PlainCard>
</template>
