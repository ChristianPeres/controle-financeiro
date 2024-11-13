<!-- components/LineChart.vue -->
<template>
<div class="bg-white shadow rounded-lg px-4 py-6 mb-8 h-96">
  <h1 class="text-2xl font-semibold mb-4">Grãfico financeiro</h1>
    <Line :data="chartData" :options="chartOptions" />
</div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, 
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
  datasets: [
    {
      label: 'Despesas',
      data: [1, 800, 800, 1, 800, 800, 1, 4000,4000,1],
      borderColor: '#ff6384',
      fill: false
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>