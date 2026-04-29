<template>
  <div class="page-container">
    <h2 class="page-title">问题详情 - {{ problem.problemNo }}</h2>

    <!-- 问题头部信息 -->
    <el-card class="problem-header">
      <el-descriptions :column="3" border>
        <el-descriptions-item label="问题编号">{{ problem.problemNo }}</el-descriptions-item>
        <el-descriptions-item label="问题标题">{{ problem.title }}</el-descriptions-item>
        <el-descriptions-item label="问题等级">
          <el-tag :type="getLevelType(problem.level)" effect="dark">{{ problem.level }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="问题来源">{{ problem.source }}</el-descriptions-item>
        <el-descriptions-item label="问题阶段">{{ problem.phase }}</el-descriptions-item>
        <el-descriptions-item label="问题归属">{{ problem.ownership }}</el-descriptions-item>
        <el-descriptions-item label="责任部门">{{ problem.dept }}</el-descriptions-item>
        <el-descriptions-item label="责任人">{{ problem.assignee }}</el-descriptions-item>
        <el-descriptions-item label="当前状态">
          <el-tag :type="getStatusType(problem.status)">{{ problem.status }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 4阶段进度 -->
    <el-card class="progress-card">
      <template #header>
        <div class="card-header">
          <span>问题处理进度</span>
          <span class="progress-text">当前阶段: {{ currentStage.name }}</span>
        </div>
      </template>
      <el-steps :active="problem.progress" align-center finish-status="success">
        <el-step v-for="(stage, idx) in stages" :key="idx"
          :title="stage.name"
          :description="getStageDescription(idx)"
        />
      </el-steps>
    </el-card>

    <!-- 问题描述 -->
    <el-card class="info-card">
      <template #header>
        <div class="card-header">
          <span>问题描述</span>
          <el-button v-if="canEdit" type="primary" size="small" @click="editDescription = true">
            <el-icon><Edit /></el-icon> 编辑
          </el-button>
        </div>
      </template>
      <div v-if="!editDescription">{{ problem.description || '暂无描述' }}</div>
      <el-input v-else v-model="problem.description" type="textarea" :rows="4" @blur="editDescription = false" />
    </el-card>

    <!-- 问题分发信息 -->
    <el-card class="info-card">
      <template #header>
        <span>分发信息</span>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="分发日期">{{ problem.createTime }}</el-descriptions-item>
        <el-descriptions-item label="计划完成日期">{{ problem.deadline }}</el-descriptions-item>
        <el-descriptions-item label="延期申请" :span="2">
          <template v-if="extensionRequest">
            <el-tag type="warning">{{ extensionRequest.status }}</el-tag>
            {{ extensionRequest.reason }}
          </template>
          <el-button v-else-if="canApplyExtension" type="warning" size="small" @click="showExtensionDialog = true">
            申请延期
          </el-button>
          <span v-else>无</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 短期措施 -->
    <el-card class="info-card" v-if="problem.progress >= 1">
      <template #header>
        <div class="card-header">
          <span>短期措施</span>
          <el-button v-if="canEdit" type="primary" size="small" @click="showShortTermDialog = true">
            {{ shortTermMeasure ? '编辑' : '添加' }}
          </el-button>
        </div>
      </template>
      <div v-if="shortTermMeasure">
        <p><strong>措施内容:</strong> {{ shortTermMeasure.content }}</p>
        <p><strong>实施人:</strong> {{ shortTermMeasure.implementer }}</p>
        <p><strong>完成时间:</strong> {{ shortTermMeasure.completeTime }}</p>
      </div>
      <el-empty v-else description="暂无短期措施" />
    </el-card>

    <!-- 长期措施 -->
    <el-card class="info-card" v-if="problem.progress >= 2">
      <template #header>
        <div class="card-header">
          <span>长期措施</span>
          <el-button v-if="canEdit" type="primary" size="small" @click="showLongTermDialog = true">
            {{ longTermMeasure ? '编辑' : '添加' }}
          </el-button>
        </div>
      </template>
      <div v-if="longTermMeasure">
        <p><strong>措施内容:</strong> {{ longTermMeasure.content }}</p>
        <p><strong>实施人:</strong> {{ longTermMeasure.implementer }}</p>
        <p><strong>完成时间:</strong> {{ longTermMeasure.completeTime }}</p>
      </div>
      <el-empty v-else description="暂无长期措施" />
    </el-card>

    <!-- 验证关闭 -->
    <el-card class="info-card" v-if="problem.progress >= 3">
      <template #header>
        <div class="card-header">
          <span>验证结果</span>
          <el-button v-if="canVerify" type="success" size="small" @click="showVerifyDialog = true">
            验证通过关闭
          </el-button>
        </div>
      </template>
      <div v-if="verifyResult">
        <el-result icon="success" title="验证通过">
          <template #sub-title>
            <p>关闭时间: {{ verifyResult.closeTime }}</p>
            <p>验证结论: {{ verifyResult.conclusion }}</p>
          </template>
        </el-result>
      </div>
      <el-empty v-else description="尚未验证" />
    </el-card>

    <!-- 问题操作日志 -->
    <el-card class="info-card">
      <template #header>
        <span>处理日志</span>
      </template>
      <el-timeline>
        <el-timeline-item v-for="(log, idx) in logs" :key="idx" :timestamp="log.time" placement="top">
          <el-card>
            <h4>{{ log.action }}</h4>
            <p>{{ log.detail }}</p>
            <p class="log-author">操作人: {{ log.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 延期申请弹窗 -->
    <el-dialog v-model="showExtensionDialog" title="申请延期" width="500px">
      <el-form :model="extensionForm" label-width="100px">
        <el-form-item label="原完成日期">{{ problem.deadline }}</el-form-item>
        <el-form-item label="新完成日期">
          <el-date-picker v-model="extensionForm.newDeadline" type="date" placeholder="选择新日期" />
        </el-form-item>
        <el-form-item label="延期原因">
          <el-input v-model="extensionForm.reason" type="textarea" :rows="3" placeholder="请输入延期原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showExtensionDialog = false">取消</el-button>
        <el-button type="primary" @click="submitExtension">提交申请</el-button>
      </template>
    </el-dialog>

    <!-- 验证通过弹窗 -->
    <el-dialog v-model="showVerifyDialog" title="验证关闭" width="500px">
      <el-form :model="verifyForm" label-width="100px">
        <el-form-item label="验证结论">
          <el-radio-group v-model="verifyForm.conclusion">
            <el-radio label="通过">通过</el-radio>
            <el-radio label="不通过">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="验证说明">
          <el-input v-model="verifyForm.comment" type="textarea" :rows="3" placeholder="请输入验证说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showVerifyDialog = false">取消</el-button>
        <el-button type="success" @click="submitVerify">确认关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import { useProblemStore } from '@/store/problemStore'

const route = useRoute()
const problemStore = useProblemStore()

const problemId = parseInt(route.params.id || 1)
const problem = ref(problemStore.problemList.find(p => p.id === problemId) || problemStore.problemList[0])

const editDescription = ref(false)
const showExtensionDialog = ref(false)
const showShortTermDialog = ref(false)
const showLongTermDialog = ref(false)
const showVerifyDialog = ref(false)

const extensionForm = reactive({ newDeadline: '', reason: '' })
const verifyForm = reactive({ conclusion: '通过', comment: '' })

const stages = [
  { name: '原因分析' },
  { name: '短期措施' },
  { name: '长期措施' },
  { name: '验证关闭' }
]

const currentStage = computed(() => stages[problem.value.progress] || stages[0])

const shortTermMeasure = ref({ content: '增加焊缝检测频次', implementer: '张工', completeTime: '2024-04-10' })
const longTermMeasure = ref(null)
const verifyResult = ref(null)

const extensionRequest = computed(() => {
  return problemStore.extensionRequests.find(r => r.problemNo === problem.value.problemNo)
})

const canEdit = computed(() => ['待分发', '处理中'].includes(problem.value.status))
const canApplyExtension = computed(() => !extensionRequest.value && problem.value.status !== '已关闭')
const canVerify = computed(() => problem.value.progress >= 3)

const getLevelType = (level) => problemStore.getLevelType(level)
const getStatusType = (status) => problemStore.getStatusType(status)
const getStageDescription = (idx) => {
  if (problem.value.progress > idx) return '已完成'
  if (problem.value.progress === idx) return '进行中'
  return ''
}

const logs = ref([
  { time: '2024-04-01 09:00', action: '问题创建', detail: '问题登记入库', operator: '系统' },
  { time: '2024-04-01 10:30', action: '问题分发', detail: '分配给张工处理', operator: '质量部' },
  { time: '2024-04-03 14:00', action: '原因分析', detail: '完成原因分析，确认焊接参数偏移', operator: '张工' }
])

const submitExtension = () => {
  ElMessage.success('延期申请已提交')
  showExtensionDialog.value = false
}

const submitVerify = () => {
  verifyResult.value = { closeTime: new Date().toLocaleDateString(), conclusion: verifyForm.conclusion }
  problemStore.updateProblemStatus(problem.value.problemNo, '已关闭')
  ElMessage.success('问题已关闭')
  showVerifyDialog.value = false
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

  .problem-header { margin-bottom: 16px; }

  .progress-card {
    margin-bottom: 16px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .progress-text {
        font-size: 14px;
        color: #67C23A;
      }
    }
  }

  .info-card {
    margin-bottom: 16px;

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
}
</style>
