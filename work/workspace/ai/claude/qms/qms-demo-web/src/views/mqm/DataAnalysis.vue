<template>
  <div class="page-container">
    <h2 class="page-title">数据分析</h2>
    <el-row :gutter="20">
      <el-col :span="12"><el-card shadow="hover"><template #header>IPTV分析</template><div ref="ipChartRef" style="height:300px;"></div></el-card></el-col>
      <el-col :span="12"><el-card shadow="hover"><template #header>TOP问题分析</template><div ref="topChartRef" style="height:300px;"></div></el-card></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
const ipChartRef = ref(null), topChartRef = ref(null)
let ipChart, topChart
onMounted(() => {
  ipChart = echarts.init(ipChartRef.value)
  ipChart.setOption({ tooltip: {trigger: 'axis'}, xAxis: {type: 'category', data: ['1月','2月','3月','4月']}, yAxis: {type: 'value'}, series: [{type: 'line', data: [2.3, 2.1, 1.9, 1.7], itemStyle: {color: '#409EFF'}}] })
  topChart = echarts.init(topChartRef.value)
  topChart.setOption({ tooltip: {trigger: 'axis'}, xAxis: {type: 'category', data: ['气密性','外观','扭矩','尺寸','装配']}, yAxis: {type: 'value'}, series: [{type: 'bar', data: [156,134,98,87,76], itemStyle: {color: '#409EFF'}}] })
  window.addEventListener('resize', () => { ipChart?.resize(); topChart?.resize() })
})
onUnmounted(() => { ipChart?.dispose(); topChart?.dispose() })
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
