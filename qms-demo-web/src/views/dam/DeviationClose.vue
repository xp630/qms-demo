<template>
  <div class="page-container">
    <h2 class="page-title">偏差关闭</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>待关闭偏差</span>
          <el-button type="primary" size="small" @click="handleRefresh">
            <el-icon><Refresh /></el-icon> 刷新
          </el-button>
        </div>
      </template>

      <el-table :data="closableDam" stripe border v-loading="loading">
        <el-table-column prop="damNo" label="偏差单号" width="130" fixed />
        <el-table-column prop="description" label="偏差描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="applicant" label="申请人" width="100" align="center" />
        <el-table-column prop="applyDate" label="申请日期" width="120" align="center" />
        <el-table-column label="版本" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.version }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="success" link @click="handleClose(row)">关闭</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 关闭确认弹窗 -->
    <el-dialog v-model="closeDialogVisible" title="偏差关闭确认" width="500px">
      <el-form :model="closeForm" label-width="100px">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="偏差单号">{{ currentDam?.damNo }}</el-descriptions-item>
          <el-descriptions-item label="偏差描述">{{ currentDam?.description }}</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <el-form-item label="关闭日期">
          <el-date-picker v-model="closeForm.closeDate" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
        <el-form-item label="实施结果">
          <el-radio-group v-model="closeForm.result">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="异常">异常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="closeForm.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialogVisible = false">取消</el-button>
        <el-button type="success" @click="confirmClose">确认关闭</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="偏差详情" width="700px" destroy-on-close>
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

      <el-divider>处理流程</el-divider>

      <el-steps :active="4" finish-status="success" align-center>
        <el-step title="申请" />
        <el-step title="评审" />
        <el-step title="审批" />
        <el-step title="实施" />
        <el-step title="关闭" />
      </el-steps>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { useDamStore } from '@/store/damStore'

const damStore = useDamStore()

const loading = ref(false)
const closeDialogVisible = ref(false)
const detailVisible = ref(false)
const currentDam = ref(null)

const closeForm = reactive({
  closeDate: new Date().toLocaleDateString(),
  result: '正常',
  remark: ''
})

const closableDam = computed(() =>
  damStore.damList.filter(d => d.status === '实施中' || d.status === '已批准')
)

const getStatusType = (status) => damStore.getStatusType(status)

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => { loading.value = false; ElMessage.success('刷新成功') }, 500)
}

const handleView = (row) => {
  currentDam.value = row
  detailVisible.value = true
}

const handleClose = (row) => {
  currentDam.value = row
  closeForm.closeDate = new Date().toLocaleDateString()
  closeForm.result = '正常'
  closeForm.remark = ''
  closeDialogVisible.value = true
}

const confirmClose = () => {
  if (!closeForm.closeDate) {
    ElMessage.warning('请选择关闭日期')
    return
  }
  if (currentDam.value) {
    currentDam.value.status = '已关闭'
    ElMessage.success(`偏差 ${currentDam.value.damNo} 已关闭`)
    closeDialogVisible.value = false
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
}
</style>
