<template>
  <div class="page-container">
    <h2 class="page-title">统计分析</h2>
    <el-row :gutter="20">
      <el-col :span="12"><el-card shadow="hover"><template #header>问题分布</template><div ref="pieChartRef" style="height:300px;"></div></el-card></el-col>
      <el-col :span="12"><el-card shadow="hover"><template #header>趋势分析</template><div ref="lineChartRef" style="height:300px;"></div></el-card></el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
const pieChartRef = ref(null), lineChartRef = ref(null)
let pieChart, lineChart
onMounted(() => {
  pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption({ tooltip: {trigger:'item'}, series: [{type:'pie',radius:'60%',data:[{value:35,name:'生产部'},{value:25,name:'质量部'},{value:20,name:'采购部'},{value:20,name:'其他'}]}] })
  lineChart = echarts.init(lineChartRef.value)
  lineChart.setOption({ tooltip: {trigger:'axis'}, xAxis: {type:'category',data:['1月','2月','3月','4月']}, yAxis: {type:'value'}, series: [{type:'line',data:[12,15,10,8],itemStyle:{color:'#409EFF'}}] })
  window.addEventListener('resize',()=>{pieChart?.resize();lineChart?.resize()})
})
onUnmounted(()=>{pieChart?.dispose();lineChart?.dispose()})
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
