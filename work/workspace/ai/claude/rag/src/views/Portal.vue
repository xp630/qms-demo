<template>
  <div class="portal">
    <!-- 1. 顶部导航栏 -->
    <div class="navbar">
      <span class="navbar-title">蓉小贸</span>
      <div class="navbar-controls">
        <div class="control-btn">⋮</div>
        <div class="control-btn">−</div>
        <div class="control-btn">✕</div>
      </div>
    </div>

    <!-- 2. 品牌Logo与欢迎语区域 -->
    <div class="brand-section">
      <div class="history-btn" @click="showHistory = true"></div>

      <!-- 历史记录弹窗 -->
      <div v-if="showHistory" class="history-modal" @click.self="showHistory = false">
        <div class="history-sheet">
          <div class="history-header">
            <span>历史记录</span>
            <span class="close-btn" @click="showHistory = false">✕</span>
          </div>
          <div class="history-list">
            <div
              v-for="item in history"
              :key="item.id"
              class="history-item"
              @click="loadHistory(item)"
            >
              <span class="history-title">{{ item.title }}</span>
              <span class="history-date">{{ formatDate(item.createdAt) }}</span>
            </div>
            <div v-if="history.length === 0" class="history-empty">
              暂无历史记录
            </div>
          </div>
        </div>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" @error="handleLogoError" />
      </div>
      <p class="welcome-text">
        你好，我是蓉小贸，您在外贸业务中遇到的任何难题，都可以随时问我
      </p>
    </div>

    <!-- 3. 功能图标区 -->
    <div class="function-section">
      <div class="function-icons">
        <div
          v-for="(func, index) in functions"
          :key="index"
          class="function-item"
          :class="{ active: activeFunction === index }"
          @click="activeFunction = index"
        >
          <div class="function-icon">{{ func.icon }}</div>
          <span class="function-label">{{ func.name }}</span>
        </div>
      </div>
      <div class="pagination">
        <div
          v-for="(_, index) in functions"
          :key="index"
          class="pagination-dot"
          :class="{ active: activeFunction === index }"
        ></div>
      </div>
    </div>

    <!-- 4. 常见问题卡片区 -->
    <div class="qa-section">
      <div class="qa-cards">
        <div
          v-for="(card, cardIndex) in faqCards"
          :key="cardIndex"
          class="qa-card"
        >
          <div class="qa-card-header">常见问题</div>
          <div class="qa-card-title">{{ card.title }}</div>
          <div
            v-for="(q, qIndex) in card.questions"
            :key="qIndex"
            class="qa-item"
            @click="handleQuestion(q)"
          >
            <span class="qa-item-text">{{ q }}</span>
            <span class="qa-item-arrow">›</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. 底部对话输入区 -->
    <div class="input-section">
      <div class="new-chat-btn" @click="handleNewChat">开启新对话</div>
      <div class="input-wrapper">
        <div class="mic-btn" @click="handleMic"></div>
        <div class="input-box" @click="handleConsult">
          <span>💬</span>
          <span class="input-text">有什么问题都可以问我</span>
        </div>
        <div class="send-btn" @click="handleConsult"></div>
      </div>
      <p class="input-hint">内容由AI生成，仅供参考</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFAQ, CATEGORIES } from '@/composables/useFAQ'
import { useHistory } from '@/composables/useHistory'

const emit = defineEmits(['navigate'])

const { getFAQQuestionsByCategory } = useFAQ()
const { history } = useHistory()

const showHistory = ref(false)
const activeFaqCard = ref(0)

const faqCards = computed(() => {
  const cat = currentCategory.value
  const questions = currentQuestions.value
  // 确保始终返回两个卡片
  const half = Math.ceil(questions.length / 2)
  return [
    {
      title: cat.name,
      questions: questions.slice(0, half)
    },
    {
      title: cat.name,
      questions: questions.slice(half)
    }
  ]
})

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

function loadHistory(item) {
  emit('navigate', { type: 'history', session: item })
  showHistory.value = false
}

const activeFunction = ref(0)

const functions = [
  { name: '办事指引', icon: '📋✓' },
  { name: '出海政策', icon: '⚓' },
  { name: '出海指南', icon: '✈️' },
  { name: '行业研究', icon: '📈' }
]

const categoryMap = {
  0: CATEGORIES.POLICY,
  1: CATEGORIES.TAX,
  2: CATEGORIES.TALENT,
  3: CATEGORIES.TECH
}

const categoryNames = {
  0: '货物贸易',
  1: '服务贸易',
  2: '贸易摩擦',
  3: '跨境投资'
}

const currentCategory = computed(() => {
  return {
    id: categoryMap[activeFunction.value] || CATEGORIES.POLICY,
    name: categoryNames[activeFunction.value] || '货物贸易'
  }
})

const currentQuestions = computed(() => {
  const faqs = getFAQQuestionsByCategory(currentCategory.value.id)
  if (faqs.length > 0) {
    return faqs.slice(0, 3)
  }
  // 默认问题
  return [
    '🔥 我公司刚成立，尚无任何外贸经验...',
    '2️⃣ 我想开始做服装出口，第一步应该...'
  ]
})

function handleLogoError(e) {
  e.target.style.display = 'none'
}

function handleQuestion(q) {
  emit('navigate', {
    type: 'faq',
    question: q.replace(/^[🔥2️⃣]\s*/, ''),
    category: categoryNames[activeFunction.value] || '货物贸易'
  })
}

function handleConsult() {
  emit('navigate', {
    type: 'chat',
    category: categoryNames[activeFunction.value] || '货物贸易'
  })
}

function handleNewChat() {
  emit('navigate', {
    type: 'new-chat',
    category: categoryNames[activeFunction.value] || '货物贸易'
  })
}

function handleMic() {
  // 语音功能暂时不可用
}
</script>

<style lang="scss" scoped>
.portal {
  min-height: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #ffffff;
  padding-bottom: 70px;
  border: 1px solid #e5e5e5;
}

.navbar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;

  .navbar-title {
    font-size: 17px;
    font-weight: 600;
    color: #000;
  }

  .navbar-controls {
    position: absolute;
    right: 12px;
    display: flex;
    gap: 8px;
  }

  .control-btn {
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #000;
    border: 1px solid #e5e5e5;
    cursor: pointer;
  }
}

.brand-section {
  padding: 12px 24px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .history-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &::before {
      content: '🕐';
      font-size: 18px;
    }
  }

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    background: #EFF6FF;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .welcome-text {
    text-align: center;
    color: #4B5563;
    font-size: 14px;
    line-height: 1.6;
    padding: 0 20px;
  }
}

.history-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.history-sheet {
  width: 100%;
  max-width: 430px;
  background: #fff;
  border-radius: 16px 16px 0 0;
  max-height: 60%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  position: relative;
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;

  .close-btn {
    position: absolute;
    right: 16px;
    font-size: 14px;
    color: #999;
    cursor: pointer;
  }
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;

  &:active {
    background: #f5f5f5;
  }

  .history-title {
    font-size: 14px;
    color: #333;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history-date {
    font-size: 12px;
    color: #999;
    margin-left: 12px;
  }
}

.history-empty {
  text-align: center;
  padding: 40px 16px;
  font-size: 14px;
  color: #999;
}

.function-section {
  padding: 24px 24px 16px;

  .function-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &.active .function-icon {
      border-color: #3B82F6;
      background: #EFF6FF;
    }

    &.active .function-label {
      color: #3B82F6;
    }
  }

  .function-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border: 2px solid #e5e5e5;
    background: #fff;
  }

  .function-label {
    font-size: 11px;
    color: #9CA3AF;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
  }

  .pagination-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e5e5e5;

    &.active {
      background: #3B82F6;
      width: 18px;
      border-radius: 3px;
    }
  }
}

.qa-section {
  padding: 16px 24px 0;

  .qa-cards {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 16px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .qa-card {
    min-width: 70%;
    background: #EFF6FF;
    border-radius: 16px;
    padding: 16px;
    scroll-snap-align: start;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .qa-card-header {
    font-size: 12px;
    color: #9CA3AF;
    margin-bottom: 6px;
  }

  .qa-card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 14px;
  }

  .qa-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 13px;
    color: #4B5563;
    gap: 8px;
    cursor: pointer;

    &:active {
      opacity: 0.7;
    }
  }

  .qa-item-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qa-item-arrow {
    color: #9CA3AF;
    font-size: 12px;
  }
}

.input-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 430px;
  margin: 0 auto;
  padding: 8px 16px;
  background: #fff;

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mic-btn {
    width: 40px;
    height: 40px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;

    &::before {
      content: '🎤';
      font-size: 18px;
    }
  }

  .input-box {
    flex: 1;
    background: #f3f4f6;
    border-radius: 20px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &::before {
      content: '💬';
      font-size: 16px;
    }
  }

  .input-text {
    flex: 1;
    font-size: 14px;
    color: #9CA3AF;
  }

  .send-btn {
    width: 40px;
    height: 40px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;

    &::before {
      content: '📤';
      font-size: 18px;
    }
  }

  .new-chat-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    font-size: 12px;
    color: #4B5563;
    margin-bottom: 8px;
    cursor: pointer;
  }

  .input-hint {
    text-align: center;
    font-size: 10px;
    color: #9CA3AF;
    margin-top: 6px;
  }
}
</style>
