<template>
  <div class="page-container">
    <h2 class="page-title">受控发运管理</h2>

    <!-- 统计概览 -->
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">受控发运批次</div>
            <div class="stat-value" style="color: #409EFF">{{ totalBatches }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">待审批放行</div>
            <div class="stat-value" style="color: #E6A23C">{{ pendingRelease }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">运输中批次</div>
            <div class="stat-value" style="color: #67C23A">{{ inTransit }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">本月放行批次</div>
            <div class="stat-value" style="color: #F56C6C">{{ monthlyReleased }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 搜索表单 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="search-form-inline">
        <el-form-item label="发运单号">
          <el-input v-model="searchForm.shipmentNo" placeholder="请输入发运单号" clearable />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="searchForm.customer" placeholder="请输入客户名称" clearable />
        </el-form-item>
        <el-form-item label="放行状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable style="width: 140px">
            <el-option label="待审批" value="待审批" />
            <el-option label="已放行" value="已放行" />
            <el-option label="运输中" value="运输中" />
            <el-option label="已到达" value="已到达" />
            <el-option label="已拒收" value="已拒收" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮 -->
    <div class="table-toolbar">
      <el-button type="primary" @click="handleCreate">
        <el-icon><Plus /></el-icon> 新增发运申请
      </el-button>
      <el-button type="success" @click="handleExport">
        <el-icon><Download /></el-icon> 导出
      </el-button>
    </div>

    <!-- 发运列表 -->
    <el-table :data="filteredList" stripe border v-loading="loading">
      <el-table-column prop="shipmentNo" label="发运单号" width="150" fixed />
      <el-table-column prop="customerName" label="客户名称" width="140" show-overflow-tooltip />
      <el-table-column prop="productName" label="产品名称" width="120" show-overflow-tooltip />
      <el-table-column prop="quantity" label="数量" width="80" align="right" />
      <el-table-column prop="controlLevel" label="管控等级" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getControlType(row.controlLevel)" effect="dark" size="small">
            {{ row.controlLevel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="qualityOfficer" label="质量工程师" width="100" align="center" />
      <el-table-column prop="applyDate" label="申请日期" width="110" align="center" />
      <el-table-column prop="releaseDate" label="放行日期" width="110" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)" size="small">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logisticsNo" label="物流单号" width="140" show-overflow-tooltip />
      <el-table-column prop="eta" label="预计到达" width="110" align="center" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="handleDetail(row)">详情</el-button>
          <el-button v-if="row.status === '待审批'" type="success" link size="small" @click="handleRelease(row)">放行</el-button>
          <el-button v-if="row.status === '已放行' || row.status === '运输中'" type="warning" link size="small" @click="handleTrack(row)">追踪</el-button>
          <el-button v-if="row.status === '运输中'" type="info" link size="small" @click="handleConfirm(row)">确认到达</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="filteredList.length"
        layout="total, sizes, prev, pager, next"
      />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="发运详情" width="700px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentShipment">
        <el-descriptions-item label="发运单号">{{ currentShipment.shipmentNo }}</el-descriptions-item>
        <el-descriptions-item label="管控等级">
          <el-tag :type="getControlType(currentShipment.controlLevel)" effect="dark">{{ currentShipment.controlLevel }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="客户名称">{{ currentShipment.customerName }}</el-descriptions-item>
        <el-descriptions-item label="产品名称">{{ currentShipment.productName }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{ currentShipment.quantity }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusTagType(currentShipment.status)">{{ currentShipment.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="质量工程师">{{ currentShipment.qualityOfficer }}</el-descriptions-item>
        <el-descriptions-item label="申请日期">{{ currentShipment.applyDate }}</el-descriptions-item>
        <el-descriptions-item label="放行日期">{{ currentShipment.releaseDate || '—' }}</el-descriptions-item>
        <el-descriptions-item label="物流单号">{{ currentShipment.logisticsNo || '—' }}</el-descriptions-item>
        <el-descriptions-item label="预计到达">{{ currentShipment.eta || '—' }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ currentShipment.remark || '—' }}</el-descriptions-item>
      </el-descriptions>

      <!-- 质量文件检查 -->
      <el-divider content-position="left">质量文件检查</el-divider>
      <el-table :data="qualityDocList" stripe border size="small">
        <el-table-column prop="docName" label="文件名称" />
        <el-table-column prop="docType" label="文件类型" width="120" align="center" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '已上传' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" width="160" />
      </el-table>
    </el-dialog>

    <!-- 放行弹窗 -->
    <el-dialog v-model="releaseDialogVisible" title="放行审批" width="500px" destroy-on-close>
      <el-form :model="releaseForm" label-width="120px">
        <el-form-item label="发运单号">{{ currentShipment?.shipmentNo }}</el-form-item>
        <el-form-item label="审批结论">
          <el-radio-group v-model="releaseForm.result">
            <el-radio label="通过">通过放行</el-radio>
            <el-radio label="拒绝">拒绝放行</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="releaseForm.logisticsNo" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="预计到达日期">
          <el-date-picker v-model="releaseForm.eta" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input v-model="releaseForm.comment" type="textarea" :rows="3" placeholder="请输入审批意见" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="releaseDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitRelease">提交</el-button>
      </template>
    </el-dialog>

    <!-- 追踪弹窗 -->
    <el-dialog v-model="trackDialogVisible" title="物流追踪" width="600px" destroy-on-close>
      <el-timeline>
        <el-timeline-item v-for="(item, idx) in trackingData" :key="idx" :timestamp="item.time" :type="idx === 0 ? 'primary' : ''">
          <p><strong>{{ item.status }}</strong></p>
          <p>{{ item.location }}</p>
          <p v-if="item.remark">{{ item.remark }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Download } from '@element-plus/icons-vue'

const loading = ref(false)
const detailVisible = ref(false)
const releaseDialogVisible = ref(false)
const trackDialogVisible = ref(false)
const currentShipment = ref(null)

const searchForm = reactive({ shipmentNo: '', customer: '', status: '' })
const pagination = reactive({ page: 1, pageSize: 10 })

const releaseForm = reactive({ result: '通过', logisticsNo: '', eta: '', comment: '' })

const totalBatches = ref(28)
const pendingRelease = ref(4)
const inTransit = ref(8)
const monthlyReleased = ref(16)

const controlledShipmentList = ref([
  { shipmentNo: 'CS2024-001', customerName: '顾客A', productName: '类型A产品', quantity: 50, controlLevel: '高', qualityOfficer: '张工', applyDate: '2024-04-01', releaseDate: '2024-04-03', status: '运输中', logisticsNo: 'SF1234567890', eta: '2024-04-07', remark: '高管控批次' },
  { shipmentNo: 'CS2024-002', customerName: '顾客B', productName: '类型B产品', quantity: 30, controlLevel: '中', qualityOfficer: '李工', applyDate: '2024-04-02', releaseDate: '—', status: '待审批', logisticsNo: '', eta: '', remark: '' },
  { shipmentNo: 'CS2024-003', customerName: '顾客A', productName: '类型A产品', quantity: 20, controlLevel: '高', qualityOfficer: '王工', applyDate: '2024-04-03', releaseDate: '2024-04-05', status: '已到达', logisticsNo: 'SF1234567891', eta: '2024-04-06', remark: '' },
  { shipmentNo: 'CS2024-004', customerName: '顾客C', productName: '类型C产品', quantity: 100, controlLevel: '低', qualityOfficer: '刘工', applyDate: '2024-04-04', releaseDate: '—', status: '待审批', logisticsNo: '', eta: '', remark: '' },
  { shipmentNo: 'CS2024-005', customerName: '顾客D', productName: '类型B产品', quantity: 15, controlLevel: '中', qualityOfficer: '陈工', applyDate: '2024-03-28', releaseDate: '2024-03-30', status: '已到达', logisticsNo: 'YT9876543210', eta: '2024-04-01', remark: '' },
  { shipmentNo: 'CS2024-006', customerName: '顾客A', productName: '类型A产品', quantity: 40, controlLevel: '高', qualityOfficer: '张工', applyDate: '2024-04-05', releaseDate: '—', status: '已拒收', logisticsNo: '', eta: '', remark: '质量问题拒收' }
])

const qualityDocList = ref([
  { docName: '质量保证书', docType: 'PDF', status: '已上传', uploadTime: '2024-04-02 10:30' },
  { docName: '出厂检验报告', docType: 'PDF', status: '已上传', uploadTime: '2024-04-02 10:32' },
  { docName: '追溯文件包', docType: 'ZIP', status: '已上传', uploadTime: '2024-04-02 10:35' },
  { docName: '让步接收申请', docType: 'PDF', status: '待上传', uploadTime: '—' }
])

const trackingData = ref([
  { time: '2024-04-03 14:20', status: '已揽收', location: '上海分拨中心', remark: '货物已收取' },
  { time: '2024-04-03 18:30', status: '运输中', location: '上海→杭州', remark: '发往目的地方向' },
  { time: '2024-04-04 09:15', status: '运输中', location: '杭州中转站', remark: '正常中转' },
  { time: '2024-04-05 07:00', status: '到达目的', location: '杭州配送点', remark: '正在派送' }
])

const filteredList = computed(() => {
  let list = controlledShipmentList.value
  if (searchForm.shipmentNo) list = list.filter(s => s.shipmentNo.includes(searchForm.shipmentNo))
  if (searchForm.customer) list = list.filter(s => s.customerName.includes(searchForm.customer))
  if (searchForm.status) list = list.filter(s => s.status === searchForm.status)
  return list
})

const getControlType = (level) => {
  const map = { '高': 'danger', '中': 'warning', '低': 'info' }
  return map[level] || 'info'
}

const getStatusTagType = (status) => {
  const map = { '待审批': 'warning', '已放行': 'success', '运输中': 'primary', '已到达': 'success', '已拒收': 'danger' }
  return map[status] || 'info'
}

const handleCreate = () => { ElMessage.info('跳转至发运申请页面') }
const handleExport = () => { ElMessage.success('导出成功') }
const handleSearch = () => { loading.value = true; setTimeout(() => { loading.value = false; ElMessage.success('查询成功') }, 300) }
const handleReset = () => { Object.assign(searchForm, { shipmentNo: '', customer: '', status: '' }); handleSearch() }
const handleDetail = (row) => { currentShipment.value = row; detailVisible.value = true }

const handleRelease = (row) => {
  currentShipment.value = row
  Object.assign(releaseForm, { result: '通过', logisticsNo: '', eta: '', comment: '' })
  releaseDialogVisible.value = true
}

const handleSubmitRelease = () => {
  if (releaseForm.result === '通过' && !releaseForm.logisticsNo) {
    ElMessage.warning('请填写物流单号')
    return
  }
  const idx = controlledShipmentList.value.findIndex(s => s.shipmentNo === currentShipment.value.shipmentNo)
  if (idx !== -1) {
    if (releaseForm.result === '通过') {
      controlledShipmentList.value[idx].status = '运输中'
      controlledShipmentList.value[idx].releaseDate = new Date().toLocaleDateString()
      controlledShipmentList.value[idx].logisticsNo = releaseForm.logisticsNo
      controlledShipmentList.value[idx].eta = releaseForm.eta instanceof Date ? releaseForm.eta.toLocaleDateString() : releaseForm.eta
      pendingRelease.value--
      inTransit.value++
    } else {
      controlledShipmentList.value[idx].status = '已拒收'
      pendingRelease.value--
    }
  }
  releaseDialogVisible.value = false
  ElMessage.success(`审批完成：${releaseForm.result === '通过' ? '已放行' : '已拒绝'}`)
}

const handleTrack = (row) => {
  currentShipment.value = row
  trackDialogVisible.value = true
}

const handleConfirm = (row) => {
  const idx = controlledShipmentList.value.findIndex(s => s.shipmentNo === row.shipmentNo)
  if (idx !== -1) {
    controlledShipmentList.value[idx].status = '已到达'
    inTransit.value--
    ElMessage.success('确认到达成功')
  }
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .table-toolbar { margin-bottom: 16px; }
  .pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
  .stat-item {
    .stat-label { font-size: 14px; color: #94a3b8; margin-bottom: 8px; }
    .stat-value { font-size: 24px; font-weight: 600; }
  }
  .search-form {
    background: rgba(20, 35, 60, 0.6);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 229, 255, 0.15);
    .search-form-inline {
      :deep(.el-form-item) { margin-bottom: 0; }
    }
  }
  .stat-item {
    .stat-label { font-size: 14px; color: #94a3b8; margin-bottom: 8px; }
    .stat-value { font-size: 24px; font-weight: 600; color: #00e5ff; }
  }
}
</style>
