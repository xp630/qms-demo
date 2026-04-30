<template>
  <div class="app">
    <!-- 快捷问题栏 -->
    <QuickQuestions
      :questions="quickQuestions"
      @select="handleQuickSelect"
      @new="handleNewChat"
    />

    <!-- 消息列表 -->
    <div class="messages" ref="messagesRef">
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

    <!-- 输入框 -->
    <ChatInput
      ref="chatInputRef"
      :disabled="isLoading"
      @send="handleSend"
    />

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
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useChat } from '@/composables/useChat'
import { useHistory } from '@/composables/useHistory'
import ChatMessage from '@/components/ChatMessage.vue'
import ThinkingCard from '@/components/ThinkingCard.vue'
import SourceCard from '@/components/SourceCard.vue'
import QuickQuestions from '@/components/QuickQuestions.vue'
import ChatInput from '@/components/ChatInput.vue'

const quickQuestions = ref([
  '高新技术企业认定条件',
  '研发费用加计扣除政策',
  '科技型中小企业评价'
])

const messagesRef = ref(null)
const chatInputRef = ref(null)
const showNewConfirm = ref(false)

const { messages, isLoading, thinking, sources, sendMessage, newChat, init } = useChat()
const { addSession } = useHistory()

// 滚动到底部
async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

// 发送消息
function handleSend(text) {
  sendMessage(text)
  scrollToBottom()
}

// 快捷问题选择
function handleQuickSelect(text) {
  handleSend(text)
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

// 监听消息变化，自动滚动
onMounted(() => {
  init()
  scrollToBottom()
})
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
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
        background: #07c160;
        color: #fff;
      }
    }
  }
}
</style>
