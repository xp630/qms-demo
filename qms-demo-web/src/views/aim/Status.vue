<template>
  <div class="page-container">
    <h2 class="page-title">状态管理</h2>

    <el-card shadow="hover" style="margin-bottom: 16px">
      <template #header>
        <div class="card-header">
          <span>状态流转配置</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新增状态
          </el-button>
        </div>
      </template>

      <el-table :data="statusConfigList" stripe border>
        <el-table-column prop="statusCode" label="状态编码" width="120" />
        <el-table-column prop="statusName" label="状态名称" width="150" />
        <el-table-column prop="category" label="所属类别" width="120" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="100" align="center">
          <template #default="{ row }">
            <span class="color-dot" :style="{ background: row.color }"></span>
            {{ row.color }}
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="启用状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'info'" size="small">
              {{ row.isActive ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="说明" show-overflow-tooltip />
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span>状态流转记录</span>
      </template>

      <el-table :data="statusTransitionList" stripe border>
        <el-table-column prop="recordNo" label="记录编号" width="140" />
        <el-table-column prop="problemNo" label="问题编号" width="130" />
        <el-table-column prop="fromStatus" label="原状态" width="110" align="center">
          <template #default="{ row }">
            <el-tag size="small" :type="getStatusType(row.fromStatus)">{{ row.fromStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="toStatus" label="新状态" width="110" align="center">
          <template #default="{ row }">
            <el-tag size="small" :type="getStatusType(row.toStatus)">{{ row.toStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" width="80" align="center" />
        <el-table-column prop="operateTime" label="操作时间" width="160" />
        <el-table-column prop="reason" label="变更原因" show-overflow-tooltip />
      </el-table>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" destroy-on-close>
      <el-form :model="statusForm" label-width="100px">
        <el-form-item label="状态编码">
          <el-input v-model="statusForm.statusCode" placeholder="如: OPEN, IN_PROGRESS" />
        </el-form-item>
        <el-form-item label="状态名称">
          <el-input v-model="statusForm.statusName" placeholder="如: 待处理, 处理中" />
        </el-form-item>
        <el-form-item label="所属类别">
          <el-select v-model="statusForm.category" placeholder="请选择" style="width: 100%">
            <el-option label="通用" value="通用" />
            <el-option label="QIM" value="QIM" />
            <el-option label="AIM" value="AIM" />
            <el-option label="DAM" value="DAM" />
          </el-select>
        </el-form-item>
        <el-form-item label="显示颜色">
          <el-color-picker v-model="statusForm.color" />
        </el-form-item>
        <el-form-item label="启用状态">
          <el-switch v-model="statusForm.isActive" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="statusForm.description" type="textarea" :rows="2" placeholder="状态说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const dialogTitle = ref('新增状态')
const isEdit = ref(false)

const statusForm = reactive({
  statusCode: '',
  statusName: '',
  category: '',
  color: '#409EFF',
  isActive: true,
  description: ''
})

const statusConfigList = ref([
  { statusCode: 'OPEN', statusName: '待处理', category: '通用', color: '#909399', isActive: true, description: '问题已创建，等待处理' },
  { statusCode: 'IN_PROGRESS', statusName: '处理中', category: '通用', color: '#409EFF', isActive: true, description: '正在处理中' },
  { statusCode: 'RESOLVED', statusName: '已解决', category: '通用', color: '#67C23A', isActive: true, description: '问题已解决，待验证' },
  { statusCode: 'CLOSED', statusName: '已关闭', category: '通用', color: '#1D7A1D', isActive: true, description: '问题已关闭，完全解决' },
  { statusCode: 'REOPENED', statusName: '重新打开', category: '通用', color: '#E6A23C', isActive: true, description: '问题重新打开' },
  { statusCode: 'PENDING_DIST', statusName: '待分发', category: 'QIM', color: '#F56C6C', isActive: true, description: '问题待分发处理' },
  { statusCode: 'VERIFYING', statusName: '待验证', category: 'QIM', color: '#9C27B0', isActive: true, description: '问题处理完成，待验证' }
])

const statusTransitionList = ref([
  { recordNo: 'TR2024-001', problemNo: 'Q2024-001', fromStatus: '待分发', toStatus: '处理中', operator: '张工', operateTime: '2024-04-01 09:30', reason: '正常流转' },
  { recordNo: 'TR2024-002', problemNo: 'Q2024-002', fromStatus: '待处理', toStatus: '处理中', operator: '李工', operateTime: '2024-04-02 10:15', reason: '责任人接单' },
  { recordNo: 'TR2024-003', problemNo: 'Q2024-003', fromStatus: '处理中', toStatus: '待验证', operator: '王工', operateTime: '2024-04-03 14:20', reason: '短期措施完成' },
  { recordNo: 'TR2024-004', problemNo: 'Q2024-004', fromStatus: '待验证', toStatus: '已关闭', operator: '刘工', operateTime: '2024-04-04 16:45', reason: '验证通过' },
  { recordNo: 'TR2024-005', problemNo: 'Q2024-005', fromStatus: '已关闭', toStatus: '重新打开', operator: '陈工', operateTime: '2024-04-05 08:30', reason: '市场反馈复发' }
])

const getStatusType = (status) => {
  const map = {
    '待处理': 'info', '处理中': '', '已解决': 'success', '已关闭': 'success',
    '重新打开': 'warning', '待分发': 'danger', '待验证': 'warning'
  }
  return map[status] || 'info'
}

const handleAdd = () => {
  isEdit.value = false
  dialogTitle.value = '新增状态'
  Object.assign(statusForm, { statusCode: '', statusName: '', category: '', color: '#409EFF', isActive: true, description: '' })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  dialogTitle.value = '编辑状态'
  Object.assign(statusForm, { ...row })
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除状态「${row.statusName}」？`, '提示', { type: 'warning' })
    .then(() => {
      statusConfigList.value = statusConfigList.value.filter(s => s.statusCode !== row.statusCode)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

const handleSave = () => {
  if (!statusForm.statusCode || !statusForm.statusName) {
    ElMessage.warning('请填写完整信息')
    return
  }
  if (isEdit.value) {
    const idx = statusConfigList.value.findIndex(s => s.statusCode === statusForm.statusCode)
    if (idx !== -1) statusConfigList.value[idx] = { ...statusForm }
    ElMessage.success('修改成功')
  } else {
    statusConfigList.value.push({ ...statusForm })
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .card-header { display: flex; justify-content: space-between; align-items: center; }
  .color-dot { display: inline-block; width: 14px; height: 14px; border-radius: 50%; vertical-align: middle; margin-right: 4px; }
}
</style>
