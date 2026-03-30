# Superpowers × Team Agent 多智能体协作方案

> 本文档阐述如何将 Superpowers 开发工作流与现有 Team Agent 架构结合。

---

## 一、系统对应关系

| Superpowers 阶段 | Team Agent 角色 | 核心职责 |
|-----------------|---------------|---------|
| **Brainstorming** (需求探索) | PM + 主控(铁蛋) | 需求澄清、多方案对比、设计评审 |
| **Writing Plans** (制定计划) | PM + 架构师 | 任务拆解、技术方案、验收标准 |
| **Subagent-Driven Build (TDD)** | dev + dev-2 + reviewer + qa | 编写测试→实现→审核→验证 |
| **Systematic Debugging** | 架构师 + reviewer | 根因分析、修复方案制定 |
| **Finishing Branch** | 架构师 + ops | 合并代码、部署上线 |

---

## 二、标准化工作流

### 2.1 复杂新功能开发

```
用户: "let's build XX功能"
    │
    ▼
┌─────────────────────────────────────┐
│  Phase 1: Brainstorming              │
│  参与者: PM(主导) + 主控(铁蛋)        │
│  输出: docs/plans/YYYY-MM-DD-XX-design.md │
└─────────────────────────────────────┘
    │ 设计评审通过
    ▼
┌─────────────────────────────────────┐
│  Phase 2: Writing Plans              │
│  参与者: 架构师(主导) + PM            │
│  输出: docs/plans/YYYY-MM-DD-XX-plan.md   │
└─────────────────────────────────────┘
    │ 计划评审通过
    ▼
┌─────────────────────────────────────┐
│  Phase 3: Subagent-Driven Build      │
│  参与者: dev(实现) + reviewer(审核)   │
│         + qa(测试) + 架构师(协调)     │
│  循环: 写测试→失败→实现→通过→提交     │
└─────────────────────────────────────┘
    │ 所有任务完成
    ▼
┌─────────────────────────────────────┐
│  Phase 5: Finishing Branch          │
│  参与者: 架构师 + ops                 │
│  操作: 验证测试→合并PR→部署上线       │
└─────────────────────────────────────┘
```

### 2.2 Bug 修复流程

```
用户: "this is broken"
    │
    ▼
┌─────────────────────────────────────┐
│  Phase 4: Systematic Debugging       │
│  参与者: 架构师(主导) + reviewer      │
│  步骤: 根因调查→模式分析→假设验证     │
└─────────────────────────────────────┘
    │ 根因确定
    ▼
┌─────────────────────────────────────┐
│  修复执行                             │
│  参与者: dev(修复) + reviewer(审核)   │
│  TDD: 先写测试→修复→验证              │
└─────────────────────────────────────┘
```

---

## 三、TDD 强制要求

> Superpowers 核心原则：**No code without failing test first**

每个开发任务必须遵循：

```
1. 编写一个失败的测试（红色）
2. 编写最小代码使测试通过（绿色）
3. 重构优化代码
4. 提交（commit）
5. 重复
```

**禁止**：先写实现代码，后补测试。

---

## 四、Subagent 调度模式

当 Phase 3 执行时，使用 `sessions_spawn` 派发任务：

### 4.1 派发格式

```
sessions_spawn(
  task: "详细任务描述",
  label: "dev-task-序号"
)
```

### 4.2 任务上下文包含

- **Goal**: 一句话目标
- **Context**: 为什么重要、关联计划文件
- **Files**: 精确文件路径
- **Constraints**: 禁止事项（如：不做范围蔓延、只做TDD）
- **Verify**: 验证方式（如何确认成功）
- **Task text**: 计划中的完整任务文本

### 4.3 执行循环

```
for each 任务 in 计划:
    sessions_spawn(dev)      # 实现
    sessions_spawn(reviewer) # Spec Review（是否符合规格）
    sessions_spawn(reviewer) # Quality Review（代码质量）
    if 需要修复:
        dev 修复
        reviewer 重新审核
    标记任务完成
最终: 派发给 reviewer 做整体 Code Review
```

---

## 五、与现有流程的差异

| 维度 | 现有流程 | Superpowers 模式 |
|------|---------|-----------------|
| 测试时机 | 开发后测试 | **TDD：测试先行** |
| 设计评审 | 口头讨论 | **文档化设计、分阶段评审** |
| 任务执行 | 人工分配 | **sessions_spawn 自动派发** |
| 代码审核 | 单次 Review | **Spec Review + Quality Review 两次** |
| 调试方式 | 经验猜测 | **系统性根因分析** |

---

## 六、适用场景判断

### ✅ 应该使用 Superpowers

- 构建新功能或应用
- 复杂的多模块任务
- Bug 修复（特别是反复出现的 Bug）
- 用户明确说 "let's build"、"help me plan"、"I want to add X"、"this is broken"

### ❌ 不需要使用

- 一次性简单修复（直接 edit）
- 读代码、看文档
- 非代码任务（发消息、查日历等）

---

## 七、当前项目应用建议

### claw-etl Vue 迁移（P0）

建议按照 Superpowers 工作流执行：

1. **Brainstorming**: 确认迁移范围、技术方案
2. **Writing Plans**: 拆解为可测试的小任务
3. **Subagent-Driven**: dev-2 实现 + reviewer 审核 + qa 验证
4. **TDD 贯穿**: 每个组件迁移前先写测试

---

*文档版本: v1.0*
*创建时间: 2026-03-30*
