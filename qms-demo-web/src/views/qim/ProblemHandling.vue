<template>
  <div class="page-container">
    <h2 class="page-title">问题处理</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>处理中问题 ({{ processingProblems.length }})</span>
          <el-radio-group v-model="filterStage" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="0">原因分析</el-radio-button>
            <el-radio-button label="1">短期措施</el-radio-button>
            <el-radio-button label="2">长期措施</el-radio-button>
            <el-radio-button label="3">验证关闭</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table :data="filteredProblems" stripe border>
        <el-table-column prop="problemNo" label="问题编号" width="120" fixed />
        <el-table-column prop="title" label="问题标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="level" label="等级" width="70" align="center">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" effect="dark" size="small">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dept" label="责任部门" width="100" align="center" />
        <el-table-column prop="assignee" label="责任人" width="80" align="center" />
        <el-table-column label="当前阶段" width="140" align="center">
          <template #default="{ row }">
            <el-tag :type="getStageTagType(row.progress)">{{ stages[row.progress]?.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="计划完成" width="100" align="center" />
        <el-table-column label="进度" width="140" align="center">
          <template #default="{ row }">
            <el-progress :percentage="(row.progress / 4) * 100" :color="getProgressColor(row.progress)" size="small" :stroke-width="10" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleProcess(row)">处理</el-button>
            <el-button type="success" link v-if="row.progress >= 3" @click="handleVerify(row)">验证</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 处理弹窗 -->
    <el-dialog v-model="processDialogVisible" :title="`处理问题 - ${currentProblem?.problemNo}`" width="700px" destroy-on-close>
      <el-form :model="processForm" label-width="100px">
        <el-form-item label="问题编号">{{ currentProblem?.problemNo }}</el-form-item>
        <el-form-item label="当前阶段">
          <el-tag :type="getStageTagType(currentProblem?.progress || 0)">{{ stages[currentProblem?.progress || 0]?.name }}</el-tag>
        </el-form-item>

        <el-divider content-position="left">原因分析</el-divider>
        <el-form-item label="原因分析">
          <el-input v-model="processForm.reasonAnalysis" type="textarea" :rows="3" placeholder="请输入原因分析" />
        </el-form-item>

        <el-divider content-position="left">短期措施</el-divider>
        <el-form-item label="短期措施">
          <el-input v-model="processForm.shortTermMeasure" type="textarea" :rows="2" placeholder="请输入短期措施" />
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker v-model="processForm.shortTermCompleteTime" type="date" placeholder="选择日期" />
        </el-form-item>

        <el-divider content-position="left">长期措施</el-divider>
        <el-form-item label="长期措施">
          <el-input v-model="processForm.longTermMeasure" type="textarea" :rows="2" placeholder="请输入长期措施" />
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker v-model="processForm.longTermCompleteTime" type="date" placeholder="选择日期" />
        </el-form-item>

        <el-divider content-position="left">验证结果</el-divider>
        <el-form-item label="验证结论">
          <el-radio-group v-model="processForm.verifyResult">
            <el-radio label="通过">通过</el-radio>
            <el-radio label="不通过">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证说明">
          <el-input v-model="processForm.verifyComment" type="textarea" :rows="2" placeholder="请输入验证说明" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="processDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProcess">保存</el-button>
        <el-button type="success" v-if="canAdvance" @click="advanceStage">推进阶段</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useProblemStore } from '@/store/problemStore'
import { getProgressColor, getStageTagType } from '@/utils/qualityColors'

const problemStore = useProblemStore()

const filterStage = ref('all')
const processDialogVisible = ref(false)
const currentProblem = ref(null)

const stages = [
  { name: '原因分析', value: 0 },
  { name: '短期措施', value: 1 },
  { name: '长期措施', value: 2 },
  { name: '验证关闭', value: 3 }
]

const processForm = reactive({
  reasonAnalysis: '',
  shortTermMeasure: '',
  shortTermCompleteTime: '',
  longTermMeasure: '',
  longTermCompleteTime: '',
  verifyResult: '通过',
  verifyComment: ''
})

const processingProblems = computed(() =>
  problemStore.problemList.filter(p => p.status === '处理中')
)

const filteredProblems = computed(() => {
  if (filterStage.value === 'all') return processingProblems.value
  const stageNum = parseInt(filterStage.value)
  return processingProblems.value.filter(p => p.progress === stageNum)
})

const canAdvance = computed(() => {
  if (!currentProblem.value) return false
  return currentProblem.value.progress < 4
})

const getLevelType = (level) => problemStore.getLevelType(level)

const handleProcess = (row) => {
  currentProblem.value = row
  processForm.reasonAnalysis = ''
  processForm.shortTermMeasure = ''
  processForm.shortTermCompleteTime = ''
  processForm.longTermMeasure = ''
  processForm.longTermCompleteTime = ''
  processForm.verifyResult = '通过'
  processForm.verifyComment = ''
  processDialogVisible.value = true
}

const handleVerify = (row) => {
  currentProblem.value = row
  processDialogVisible.value = true
}

const saveProcess = () => {
  ElMessage.success('保存成功')
  processDialogVisible.value = false
}

const advanceStage = () => {
  if (!currentProblem.value) return
  const newProgress = Math.min(currentProblem.value.progress + 1, 4)
  problemStore.updateProblemProgress(currentProblem.value.problemNo, newProgress)
  if (newProgress >= 4) {
    problemStore.updateProblemStatus(currentProblem.value.problemNo, '已关闭')
    ElMessage.success('问题已关闭')
  } else {
    ElMessage.success('阶段推进成功')
  }
  processDialogVisible.value = false
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
