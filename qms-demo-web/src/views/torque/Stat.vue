<template>
  <div class="page-container">
    <h2 class="page-title">扭矩统计分析</h2>
    <el-row :gutter="20">
      <el-col :span="12"><el-card shadow="hover"><template #header>合格率趋势</template><div ref="chartRef" style="height:300px;"></div></el-card></el-col>
      <el-col :span="12"><el-card shadow="hover"><template #header>扭矩分布</template><div ref="distChartRef" style="height:300px;"></div></el-card></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref(null), distChartRef = ref(null)
let chart, distChart
onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption({ tooltip: {trigger:'axis'}, xAxis: {type:'category',data:['1月','2月','3月','4月']}, yAxis: {type:'value',axisLabel:{formatter:'{value}%'}}, series: [{type:'line',data:[98.5,98.2,98.8,99.1],itemStyle:{color:'#409EFF'}}] })
  distChart = echarts.init(distChartRef.value)
  distChart.setOption({ tooltip: {trigger:'item'}, series: [{type:'pie',radius:'60%',data:[{value:985,name:'合格'},{value:15,name:'不合格'}]}]})
  window.addEventListener('resize',()=>{chart?.resize();distChart?.resize()})
})
onUnmounted(()=>{chart?.dispose();distChart?.dispose()})
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
