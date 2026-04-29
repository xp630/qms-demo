<template>
  <div class="page-container">
    <h2 class="page-title">问题定义与判定</h2>

    <el-card shadow="hover">
      <el-steps :active="currentStep" finish-status="success" align-center>
        <el-step title="问题录入" description="创建问题" />
        <el-step title="问题判定" description="判定归属" />
        <el-step title="分发处理" description="分配责任人" />
      </el-steps>
    </el-card>

    <el-card shadow="hover" class="form-card">
      <template #header>
        <span>问题信息录入</span>
      </template>
      <el-form :model="problemForm" :rules="rules" ref="formRef" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题标题" prop="title">
              <el-input v-model="problemForm.title" placeholder="请输入问题标题" maxlength="100" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题类型" prop="type">
              <el-select v-model="problemForm.type" placeholder="请选择问题类型" style="width: 100%">
                <el-option label="实物问题" value="实物问题" />
                <el-option label="虚拟问题" value="虚拟问题" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题阶段" prop="phase">
              <el-select v-model="problemForm.phase" placeholder="请选择阶段" style="width: 100%">
                <el-option v-for="p in problemPhases" :key="p" :label="p" :value="p" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题来源" prop="source">
              <el-select v-model="problemForm.source" placeholder="请选择来源" style="width: 100%">
                <el-option v-for="s in problemSources" :key="s" :label="s" :value="s" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题等级" prop="level">
              <el-select v-model="problemForm.level" placeholder="请选择等级" style="width: 100%">
                <el-option v-for="l in problemLevels" :key="l" :label="`${l}级`" :value="l">
                  <span :style="{ color: getSeverityColor(l) }">{{ l }}级</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任部门" prop="dept">
              <el-select v-model="problemForm.dept" placeholder="请选择部门" style="width: 100%">
                <el-option label="生产部" value="生产部" />
                <el-option label="质量部" value="质量部" />
                <el-option label="技术部" value="技术部" />
                <el-option label="采购部" value="采购部" />
                <el-option label="设备部" value="设备部" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="问题描述" prop="description">
          <el-input v-model="problemForm.description" type="textarea" :rows="4" placeholder="请详细描述问题" maxlength="500" show-word-limit />
        </el-form-item>

        <el-divider content-position="left">判定信息</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题归属">
              <el-radio-group v-model="problemForm.ownership">
                <el-radio label="设计问题">设计问题</el-radio>
                <el-radio label="制造问题">制造问题</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任人">
              <el-select v-model="problemForm.assignee" placeholder="请选择责任人" style="width: 100%">
                <el-option label="张工" value="张工" />
                <el-option label="李工" value="李工" />
                <el-option label="王工" value="王工" />
                <el-option label="刘工" value="刘工" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="计划完成日期">
              <el-date-picker v-model="problemForm.deadline" type="date" placeholder="选择日期" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联机台">
              <el-select v-model="problemForm.machineNo" placeholder="请选择机台(可选)" clearable style="width: 100%">
                <el-option v-for="m in machineList" :key="m.machineNo" :label="m.machineNo" :value="m.machineNo" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            提交问题
          </el-button>
          <el-button @click="handleSaveDraft">保存草稿</el-button>
          <el-button @click="handleCheckRepeat">检查重复</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 重复问题提示 -->
    <el-dialog v-model="showRepeatDialog" title="重复问题检查" width="600px">
      <el-alert v-if="repeatProblems.length > 0" type="warning" :closable="false" show-icon>
        发现 {{ repeatProblems.length }} 个可能重复的问题
      </el-alert>
      <el-table v-if="repeatProblems.length > 0" :data="repeatProblems" style="margin-top: 16px">
        <el-table-column prop="problemNo" label="问题编号" width="120" />
        <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
        <el-table-column prop="level" label="等级" width="80" align="center" />
        <el-table-column prop="status" label="状态" width="100" align="center" />
      </el-table>
      <el-result v-else icon="success" title="未发现重复问题" sub-title="可以继续提交" />
      <template #footer>
        <el-button @click="showRepeatDialog = false">关闭</el-button>
        <el-button v-if="repeatProblems.length > 0" type="primary" @click="showRepeatDialog = false">确认为新问题</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useProblemStore } from '@/store/problemStore'
import { useMachineStore } from '@/store/machineStore'
import { getSeverityColor } from '@/utils/qualityColors'

const router = useRouter()
const problemStore = useProblemStore()
const machineStore = useMachineStore()

const currentStep = ref(0)
const submitting = ref(false)
const showRepeatDialog = ref(false)
const formRef = ref(null)

const problemLevels = problemStore.problemLevels
const problemSources = problemStore.problemSources
const problemPhases = problemStore.problemPhases
const machineList = computed(() => machineStore.getAllMachines())

const problemForm = reactive({
  title: '',
  type: '',
  phase: '',
  source: '',
  level: '',
  dept: '',
  description: '',
  ownership: '制造问题',
  assignee: '',
  deadline: '',
  machineNo: ''
})

const repeatProblems = ref([])

const rules = {
  title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  phase: [{ required: true, message: '请选择问题阶段', trigger: 'change' }],
  source: [{ required: true, message: '请选择问题来源', trigger: 'change' }],
  level: [{ required: true, message: '请选择问题等级', trigger: 'change' }],
  dept: [{ required: true, message: '请选择责任部门', trigger: 'change' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      setTimeout(() => {
        const newNo = problemStore.createProblem({
          ...problemForm,
          status: '待分发',
          createTime: new Date().toLocaleDateString()
        })
        submitting.value = false
        ElMessage.success(`问题创建成功: ${newNo}`)
        router.push('/qim/problem-list')
      }, 500)
    }
  })
}

const handleSaveDraft = () => {
  ElMessage.info('草稿已保存')
}

const handleCheckRepeat = () => {
  // 模拟重复检查
  repeatProblems.value = problemForm.title.length > 5
    ? problemStore.problemList.filter(p => p.title.includes(problemForm.title.substring(0, 5))).slice(0, 2)
    : []
  showRepeatDialog.value = true
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
  .form-card {
    max-width: 960px;
    margin: 16px auto 0;
  }
}
</style>
