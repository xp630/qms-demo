<template>
  <div class="chat-input">
    <div class="input-wrapper">
      <div class="mic-btn" :class="{ active: isListening }" @click="handleMic">
        {{ isListening ? '🔴' : '🎤' }}
      </div>
      <div class="input-box" @click="inputRef?.focus()">
        <span class="input-icon">💬</span>
        <input
          ref="inputRef"
          v-model="inputText"
          type="text"
          placeholder="有什么问题都可以问我"
          :disabled="disabled"
          @keyup.enter="handleSend"
        />
      </div>
      <div class="send-btn" @click="handleSend"></div>
    </div>
    <p class="input-hint">内容由AI生成，仅供参考</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSpeech } from '@/composables/useSpeech'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send'])

const inputRef = ref(null)
const inputText = ref('')
const { isSupported, isListening, transcript, toggle } = useSpeech()

// 监听语音识别结果
watch(transcript, (val) => {
  if (val) {
    inputText.value = val
  }
})

function handleSend() {
  const text = inputText.value.trim()
  if (!text || props.disabled) return

  emit('send', text)
  inputText.value = ''
}

function handleMic() {
  toggle()
}

// 清空输入
function clear() {
  inputText.value = ''
}

defineExpose({ clear, inputRef })
</script>

<style lang="scss" scoped>
.chat-input {
  padding: 8px 16px 6px;
  background: #fff;
  border-top: 1px solid #eee;
}

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
  font-size: 18px;

  &.active {
    animation: pulse 1s infinite;
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
  cursor: text;

  .input-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: #1F2937;

    &::placeholder {
      color: #9CA3AF;
    }

    &:disabled {
      opacity: 0.6;
    }
  }
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
  font-size: 18px;

  &::before {
    content: '📤';
  }
}

.input-hint {
  text-align: center;
  font-size: 10px;
  color: #9CA3AF;
  margin-top: 4px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
</style>
