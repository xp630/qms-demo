<template>
  <div class="page-container">
    <h2 class="page-title">偏差实施</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>实施中偏差 ({{ implementingDam.length }})</span>
          <el-radio-group v-model="filterStatus" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="实施中">实施中</el-radio-button>
            <el-radio-button label="已批准">已批准</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table :data="filteredDam" stripe border>
        <el-table-column prop="damNo" label="偏差单号" width="130" fixed />
        <el-table-column prop="description" label="偏差描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="applicant" label="申请人" width="100" align="center" />
        <el-table-column prop="applyDate" label="申请日期" width="120" align="center" />
        <el-table-column label="版本" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.version }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批进度" width="140" align="center">
          <template #default="{ row }">
            <el-steps :active="row.currentLevel" :max="row.totalLevels" finish-status="success" size="small">
              <el-step v-for="n in row.totalLevels" :key="n" />
            </el-steps>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="success" link @click="handleImplement(row)" v-if="row.status === '已批准'">实施</el-button>
            <el-button type="warning" link @click="handleUpdate(row)">更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 实施详情弹窗 -->
    <el-dialog v-model="detailVisible" title="偏差实施详情" width="700px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentDam">
        <el-descriptions-item label="偏差单号">{{ currentDam.damNo }}</el-descriptions-item>
        <el-descriptions-item label="版本">{{ currentDam.version }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ currentDam.applicant }}</el-descriptions-item>
        <el-descriptions-item label="申请日期">{{ currentDam.applyDate }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentDam.status)">{{ currentDam.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="计划完成">{{ currentDam.deadline }}</el-descriptions-item>
        <el-descriptions-item label="偏差描述" :span="2">{{ currentDam.description }}</el-descriptions-item>
      </el-descriptions>

      <el-divider>实施进度</el-divider>

      <el-timeline>
        <el-timeline-item v-for="(log, idx) in implementationLogs" :key="idx" :timestamp="log.time" placement="top">
          <el-card shadow="hover">
            <h4>{{ log.action }}</h4>
            <p>{{ log.detail }}</p>
            <p class="log-author">操作人: {{ log.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-divider>添加实施记录</el-divider>

      <el-form :model="implementationForm" label-width="100px">
        <el-form-item label="实施进度">
          <el-slider v-model="implementationForm.progress" :min="0" :max="100" show-input />
        </el-form-item>
        <el-form-item label="实施说明">
          <el-input v-model="implementationForm.comment" type="textarea" :rows="3" placeholder="请输入实施说明" />
        </el-form-item>
        <el-form-item label="完成日期">
          <el-date-picker v-model="implementationForm.completeDate" type="date" placeholder="选择日期" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveImplementation">保存</el-button>
        <el-button type="success" @click="handleCloseDam" v-if="implementationForm.progress >= 100">
          完成实施
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useDamStore } from '@/store/damStore'

const damStore = useDamStore()

const filterStatus = ref('all')
const detailVisible = ref(false)
const currentDam = ref(null)

const implementationForm = reactive({
  progress: 0,
  comment: '',
  completeDate: ''
})

const implementationLogs = ref([
  { time: '2024-04-01 10:00', action: '偏差批准', detail: '技术总监批准实施', operator: '技术总监' },
  { time: '2024-04-02 09:00', action: '开始实施', detail: '按偏差要求调整参数', operator: '张工' }
])

const implementingDam = computed(() =>
  damStore.damList.filter(d => ['已批准', '实施中'].includes(d.status))
)

const filteredDam = computed(() => {
  if (filterStatus.value === 'all') return implementingDam.value
  return implementingDam.value.filter(d => d.status === filterStatus.value)
})

const getStatusType = (status) => damStore.getStatusType(status)

const handleView = (row) => {
  currentDam.value = row
  implementationForm.progress = row.status === '实施中' ? 50 : 0
  implementationForm.comment = ''
  implementationForm.completeDate = ''
  detailVisible.value = true
}

const handleImplement = (row) => {
  currentDam.value = row
  row.status = '实施中'
  ElMessage.success('开始实施')
}

const handleUpdate = (row) => {
  currentDam.value = row
  detailVisible.value = true
}

const saveImplementation = () => {
  ElMessage.success('保存成功')
}

const handleCloseDam = () => {
  if (currentDam.value) {
    currentDam.value.status = '已关闭'
    ElMessage.success('偏差已关闭')
    detailVisible.value = false
  }
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .log-author {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 8px;
  }
}
</style>
