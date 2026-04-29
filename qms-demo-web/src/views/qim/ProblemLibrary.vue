<template>
  <div class="page-container">
    <h2 class="page-title">问题库 - 失效模式库</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>失效模式库 ({{ failureModes.length }})</span>
          <div>
            <el-input v-model="searchKeyword" placeholder="搜索失效模式" style="width: 200px; margin-right: 10px" clearable />
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon> 添加模式
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="filteredModes" stripe border>
        <el-table-column prop="modeCode" label="模式编号" width="120" />
        <el-table-column prop="modeName" label="失效模式" min-width="150" />
        <el-table-column prop="category" label="缺陷类别" width="120" align="center" />
        <el-table-column prop="cause" label="主要原因" min-width="200" show-overflow-tooltip />
        <el-table-column prop="prevention" label="预防措施" min-width="200" show-overflow-tooltip />
        <el-table-column prop="occurrence" label="发生频次" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getOccurrenceType(row.occurrence)" size="small">{{ row.occurrence }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="severity" label="严重度" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="getSeverityType(row.severity)" size="small">{{ row.severity }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" destroy-on-close>
      <el-form :model="form" label-width="100px">
        <el-form-item label="模式编号" required>
          <el-input v-model="form.modeCode" :disabled="isEdit" placeholder="自动生成或手动输入" />
        </el-form-item>
        <el-form-item label="失效模式" required>
          <el-input v-model="form.modeName" placeholder="请输入失效模式名称" />
        </el-form-item>
        <el-form-item label="缺陷类别" required>
          <el-select v-model="form.category" placeholder="请选择" style="width: 100%">
            <el-option label="焊接缺陷" value="焊接缺陷" />
            <el-option label="装配缺陷" value="装配缺陷" />
            <el-option label="表面缺陷" value="表面缺陷" />
            <el-option label="加工缺陷" value="加工缺陷" />
            <el-option label="材料缺陷" value="材料缺陷" />
          </el-select>
        </el-form-item>
        <el-form-item label="主要原因">
          <el-input v-model="form.cause" type="textarea" :rows="2" placeholder="请输入主要原因" />
        </el-form-item>
        <el-form-item label="预防措施">
          <el-input v-model="form.prevention" type="textarea" :rows="2" placeholder="请输入预防措施" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发生频次">
              <el-input-number v-model="form.occurrence" :min="1" :max="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="严重度">
              <el-select v-model="form.severity" placeholder="请选择" style="width: 100%">
                <el-option label="高" value="高" />
                <el-option label="中" value="中" />
                <el-option label="低" value="低" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useQualityStore } from '@/store/qualityStore'

const qualityStore = useQualityStore()

const searchKeyword = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)
const dialogTitle = computed(() => isEdit.value ? '编辑失效模式' : '添加失效模式')

const form = reactive({
  modeCode: '',
  modeName: '',
  category: '',
  cause: '',
  prevention: '',
  occurrence: 1,
  severity: ''
})

const failureModes = computed(() => qualityStore.failureModeLibrary)

const filteredModes = computed(() => {
  if (!searchKeyword.value) return failureModes.value
  const kw = searchKeyword.value.toLowerCase()
  return failureModes.value.filter(m =>
    m.modeName.toLowerCase().includes(kw) ||
    m.category.toLowerCase().includes(kw) ||
    m.cause.toLowerCase().includes(kw)
  )
})

const getOccurrenceType = (occurrence) => {
  if (occurrence >= 15) return 'danger'
  if (occurrence >= 10) return 'warning'
  return 'info'
}

const getSeverityType = (severity) => {
  const map = { '高': 'danger', '中': 'warning', '低': 'success' }
  return map[severity] || 'info'
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, { modeCode: '', modeName: '', category: '', cause: '', prevention: '', occurrence: 1, severity: '' })
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除此失效模式吗?', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

const handleSave = () => {
  if (!form.modeName || !form.category) {
    ElMessage.warning('请填写必填项')
    return
  }
  ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
  dialogVisible.value = false
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
