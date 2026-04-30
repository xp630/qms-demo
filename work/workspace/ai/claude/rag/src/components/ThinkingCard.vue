<template>
  <div v-if="thinking || isLoading" class="thinking-card">
    <!-- 思考中状态 -->
    <div v-if="isLoading && !thinking" class="thinking-loading">
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="text">正在思考...</span>
    </div>

    <!-- 思考内容 -->
    <div v-if="thinking" class="thinking-content" @click="toggle">
      <div class="header">
        <span class="icon">💭</span>
        <span class="label">思考过程</span>
        <span class="toggle">{{ isExpanded ? '▼ 点击收起' : '▶ 点击展开' }}</span>
      </div>
      <div v-show="isExpanded" class="body">
        {{ thinking }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  thinking: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
.thinking-card {
  margin-left: 44px;
  margin-bottom: 12px;
}

.thinking-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  .dots {
    display: flex;
    gap: 4px;

    span {
      width: 8px;
      height: 8px;
      background: #3B82F6;
      border-radius: 50%;
      animation: bounce 1s infinite;
    }
  }

  .text {
    font-size: 13px;
    color: #999;
  }
}

.thinking-content {
  background: #fef9f3;
  border: 1px solid #f5e6d3;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 12px;
  cursor: pointer;

  .header {
    display: flex;
    align-items: center;
    gap: 6px;

    .icon {
      font-size: 13px;
    }

    .label {
      font-weight: 600;
      color: #b8860b;
    }

    .toggle {
      font-size: 11px;
      color: #999;
      margin-left: auto;
    }
  }

  .body {
    margin-top: 8px;
    color: #666;
    line-height: 1.7;
  }
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}
</style>
