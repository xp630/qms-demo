<template>
  <div class="app">
    <!-- 门户首页 -->
    <Portal v-if="currentView === 'portal'" @navigate="handleNavigate" />

    <!-- 聊天页面 -->
    <template v-else>
      <!-- 消息列表 -->
      <div class="messages" ref="messagesRef">
        <!-- 顶部操作按钮 -->
        <div class="chat-top-actions">
          <div class="action-btn back-btn" @click="currentView = 'portal'">
            <span>←</span>
          </div>
          <div class="chat-title">{{ chatTitle }}</div>
          <div class="action-btn history-btn" @click="showHistory = true">
            <span>🕐</span>
          </div>
        </div>

        <ChatMessage
          v-for="msg in messages"
          :key="msg.id"
          :message="msg"
        />

        <!-- 思考过程 -->
        <ThinkingCard
          v-if="isLoading || thinking"
          :thinking="thinking"
          :isLoading="isLoading"
        />

        <!-- 来源引用 -->
        <SourceCard
          v-if="sources.length > 0"
          :sources="sources"
        />
      </div>

      <!-- 输入框区域 -->
      <div class="input-area">
        <div class="new-chat-btn" @click="handleNewChat">开启新对话</div>
        <ChatInput
          ref="chatInputRef"
          :disabled="isLoading"
          @send="handleSend"
        />
      </div>

      <!-- 新建确认弹窗 -->
      <div v-if="showNewConfirm" class="modal">
        <div class="modal-content">
          <p>确定要开始新对话吗？</p>
          <p class="sub">当前对话将被清空</p>
          <div class="actions">
            <button @click="showNewConfirm = false">取消</button>
            <button class="confirm" @click="confirmNewChat">确定</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useChat } from '@/composables/useChat'
import { useHistory } from '@/composables/useHistory'
import ChatMessage from '@/components/ChatMessage.vue'
import ThinkingCard from '@/components/ThinkingCard.vue'
import SourceCard from '@/components/SourceCard.vue'
import ChatInput from '@/components/ChatInput.vue'
import Portal from '@/views/Portal.vue'

const currentView = ref('portal')
const currentCategory = ref('')

const messagesRef = ref(null)
const chatInputRef = ref(null)
const showNewConfirm = ref(false)
const showHistory = ref(false)

const { messages, isLoading, thinking, sources, sendMessage, newChat, init } = useChat()
const { addSession, history } = useHistory()

const chatTitle = computed(() => {
  const firstMsg = messages.value.find(m => m.role === 'user')
  if (firstMsg?.content) {
    return firstMsg.content.length > 20
      ? firstMsg.content.slice(0, 20) + '...'
      : firstMsg.content
  }
  return '新对话'
})

// 滚动到底部
async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

// 发送消息
function handleSend(text) {
  sendMessage(text, currentCategory.value)
  scrollToBottom()
}

// 新建对话
function handleNewChat() {
  showNewConfirm.value = true
}

function confirmNewChat() {
  addSession(messages.value)
  newChat()
  showNewConfirm.value = false
  chatInputRef.value?.clear()
}

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

function loadHistory(item) {
  // TODO: 加载历史会话
  showHistory.value = false
}

// 处理从 Portal 导航
function handleNavigate(payload) {
  if (payload.type === 'chat') {
    currentView.value = 'chat'
    currentCategory.value = ''
    init()
  } else if (payload.type === 'faq') {
    currentView.value = 'chat'
    currentCategory.value = payload.category || ''
    init()
    nextTick(() => {
      handleSend(payload.question)
    })
  } else if (payload.type === 'history') {
    currentView.value = 'chat'
    // TODO: 加载历史会话
  }
}

// 监听消息变化，自动滚动
onMounted(() => {
  scrollToBottom()
})
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e5e5e5;
}

.chat-top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.chat-title {
  flex: 1;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 14px;
  }
}

.back-btn {
  background: #3B82F6;
  border-color: #3B82F6;

  span {
    color: #fff;
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

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
}

.input-area {
  padding: 8px 16px 6px;
  background: #fff;
  border-top: 1px solid #eee;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
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
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 280px;
  text-align: center;

  p {
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .sub {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
    font-weight: normal;
  }

  .actions {
    display: flex;
    gap: 12px;
    margin-top: 20px;

    button {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      cursor: pointer;

      &:first-child {
        background: #f5f5f5;
        color: #666;
      }

      &.confirm {
        background: #3B82F6;
        color: #fff;
      }
    }
  }
}
</style>
