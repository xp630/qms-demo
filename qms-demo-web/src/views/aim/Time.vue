<template>
  <div class="page-container">
    <h2 class="page-title">时间管理</h2>

    <!-- 时间统计概览 -->
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">平均响应时间</div>
            <div class="stat-value" style="color: #67C23A">4.2 小时</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">平均处理周期</div>
            <div class="stat-value" style="color: #409EFF">12.5 天</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">超时预警数</div>
            <div class="stat-value" style="color: #E6A23C">{{ overdueCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-label">按时关闭率</div>
            <div class="stat-value" style="color: #F56C6C">{{ onTimeRate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 时间配置 -->
    <el-card style="margin-bottom: 16px">
      <template #header>
        <div class="card-header">
          <span>SLA 时间配置</span>
          <el-button type="primary" size="small" @click="handleAddConfig">
            <el-icon><Plus /></el-icon> 新增配置
          </el-button>
        </div>
      </template>
      <el-table :data="slaConfigList" stripe border>
        <el-table-column prop="level" label="问题等级" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" effect="dark" size="small">{{ row.level }}级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="responseTime" label="响应时限" width="120" align="center" />
        <el-table-column prop="handleTime" label="处理时限" width="120" align="center" />
        <el-table-column prop="closeTime" label="关闭时限" width="120" align="center" />
        <el-table-column prop="warningThreshold" label="预警阈值" width="120" align="center">
          <template #default="{ row }"> {{ row.warningThreshold }}% </template>
        </el-table-column>
        <el-table-column prop="isActive" label="启用" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'info'" size="small">{{ row.isActive ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="说明" show-overflow-tooltip />
        <el-table-column label="操作" width="120" align="center">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEditConfig(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 超时预警列表 -->
    <el-card shadow="hover">
      <template #header>
        <span>超时预警 ({{ overdueList.length }})</span>
      </template>
      <el-table :data="overdueList" stripe border>
        <el-table-column prop="problemNo" label="问题编号" width="130" />
        <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
        <el-table-column prop="level" label="等级" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" effect="dark" size="small">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="截止日期" width="110" align="center" />
        <el-table-column prop="overdueDays" label="超期天数" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.overdueDays > 0" style="color: #F56C6C; font-weight: 600">{{ row.overdueDays }} 天</span>
            <span v-else-if="row.overdueDays === 0" style="color: #E6A23C; font-weight: 600">今日到期</span>
            <span v-else style="color: #67C23A">正常</span>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="责任人" width="80" align="center" />
        <el-table-column prop="status" label="当前状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleExtend(row)">延期</el-button>
            <el-button type="danger" link size="small" @click="handleUrge(row)">催办</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 时间线 -->
    <el-card style="margin-top: 16px">
      <template #header>
        <span>问题时间线追踪</span>
      </template>
      <el-form :inline="true" :model="searchForm" style="margin-bottom: 16px">
        <el-form-item label="问题编号">
          <el-input v-model="searchForm.problemNo" placeholder="请输入问题编号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="timelineList" stripe border>
        <el-table-column prop="problemNo" label="问题编号" width="130" />
        <el-table-column prop="phase" label="阶段" width="130" />
        <el-table-column prop="planStart" label="计划开始" width="110" align="center" />
        <el-table-column prop="planEnd" label="计划结束" width="110" align="center" />
        <el-table-column prop="actualStart" label="实际开始" width="110" align="center" />
        <el-table-column prop="actualEnd" label="实际结束" width="110" align="center" />
        <el-table-column prop="duration" label="持续时间" width="100" align="center">
          <template #default="{ row }">
            <span :style="{ color: row.isOverdue ? '#F56C6C' : '#67C23A' }">{{ row.duration }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isOverdue ? 'danger' : 'success'" size="small">{{ row.isOverdue ? '已超时' : '正常' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 配置弹窗 -->
    <el-dialog v-model="configDialogVisible" title="SLA配置" width="500px" destroy-on-close>
      <el-form :model="slaForm" label-width="100px">
        <el-form-item label="问题等级">
          <el-select v-model="slaForm.level" style="width: 100%">
            <el-option label="S级" value="S" />
            <el-option label="A级" value="A" />
            <el-option label="B级" value="B" />
            <el-option label="C级" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="响应时限">
          <el-input v-model="slaForm.responseTime" placeholder="如: 2小时" />
        </el-form-item>
        <el-form-item label="处理时限">
          <el-input v-model="slaForm.handleTime" placeholder="如: 3天" />
        </el-form-item>
        <el-form-item label="关闭时限">
          <el-input v-model="slaForm.closeTime" placeholder="如: 7天" />
        </el-form-item>
        <el-form-item label="预警阈值">
          <el-input-number v-model="slaForm.warningThreshold" :min="50" :max="100" style="width: 100%" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="slaForm.isActive" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="configDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveConfig">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useProblemStore } from '@/store/problemStore'

const problemStore = useProblemStore()
const overdueCount = ref(3)
const onTimeRate = ref('85.7%')

const searchForm = reactive({ problemNo: '' })
const configDialogVisible = ref(false)

const slaForm = reactive({
  level: '', responseTime: '', handleTime: '', closeTime: '', warningThreshold: 80, isActive: true
})

const slaConfigList = ref([
  { level: 'S', responseTime: '1小时', handleTime: '1天', closeTime: '3天', warningThreshold: 80, isActive: true, description: 'S级问题：紧急处理' },
  { level: 'A', responseTime: '4小时', handleTime: '3天', closeTime: '7天', warningThreshold: 80, isActive: true, description: 'A级问题：高优先级' },
  { level: 'B', responseTime: '1天', handleTime: '7天', closeTime: '14天', warningThreshold: 80, isActive: true, description: 'B级问题：标准处理' },
  { level: 'C', responseTime: '3天', handleTime: '14天', closeTime: '30天', warningThreshold: 80, isActive: true, description: 'C级问题：低优先级' }
])

const overdueList = ref([
  { problemNo: 'Q2024-001', title: '焊接不良导致气密性不合格', level: 'S', deadline: '2024-04-05', overdueDays: 3, owner: '张工', status: '处理中' },
  { problemNo: 'Q2024-002', title: '来料尺寸超差', level: 'A', deadline: '2024-04-08', overdueDays: 1, owner: '李工', status: '待分发' },
  { problemNo: 'Q2024-004', title: '扭矩数据异常', level: 'A', deadline: '2024-04-10', overdueDays: 0, owner: '刘工', status: '处理中' }
])

const timelineList = ref([
  { problemNo: 'Q2024-001', phase: '原因分析', planStart: '2024-04-01', planEnd: '2024-04-03', actualStart: '2024-04-01', actualEnd: '2024-04-04', duration: '4天', isOverdue: true },
  { problemNo: 'Q2024-001', phase: '短期措施', planStart: '2024-04-04', planEnd: '2024-04-06', actualStart: '2024-04-04', actualEnd: '—', duration: '进行中', isOverdue: false },
  { problemNo: 'Q2024-001', phase: '长期措施', planStart: '2024-04-07', planEnd: '2024-04-15', actualStart: '—', actualEnd: '—', duration: '—', isOverdue: false },
  { problemNo: 'Q2024-001', phase: '验证关闭', planStart: '2024-04-16', planEnd: '2024-04-20', actualStart: '—', actualEnd: '—', duration: '—', isOverdue: false }
])

const getLevelType = (level) => problemStore.getLevelType(level)

const handleAddConfig = () => {
  Object.assign(slaForm, { level: '', responseTime: '', handleTime: '', closeTime: '', warningThreshold: 80, isActive: true })
  configDialogVisible.value = true
}

const handleEditConfig = (row) => {
  Object.assign(slaForm, { ...row })
  configDialogVisible.value = true
}

const handleSaveConfig = () => {
  const idx = slaConfigList.value.findIndex(s => s.level === slaForm.level)
  if (idx !== -1) slaConfigList.value[idx] = { ...slaForm }
  else slaConfigList.value.push({ ...slaForm })
  configDialogVisible.value = false
  ElMessage.success('保存成功')
}

const handleExtend = (row) => {
  ElMessage.info(`已提交延期申请：${row.problemNo}`)
}

const handleUrge = (row) => {
  ElMessage.success(`已发送催办通知给 ${row.owner}`)
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .card-header { display: flex; justify-content: space-between; align-items: center; }
  .stat-item {
    .stat-label { font-size: 14px; color: #94a3b8; margin-bottom: 8px; }
    .stat-value { font-size: 24px; font-weight: 600; }
  }
}
</style>
