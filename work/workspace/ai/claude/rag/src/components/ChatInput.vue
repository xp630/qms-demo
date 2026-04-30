<template>
  <div class="chat-input">
    <div class="input-wrapper">
      <input
        ref="inputRef"
        v-model="inputText"
        type="text"
        placeholder="输入问题..."
        :disabled="disabled"
        @keyup.enter="handleSend"
      />
      <button
        class="mic-btn"
        :class="{ active: isListening }"
        @click="handleMic"
      >
        {{ isListening ? '🔴' : '🎤' }}
      </button>
    </div>
    <button
      class="send-btn"
      :disabled="!inputText.trim() || disabled"
      @click="handleSend"
    >
      ↑
    </button>
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
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #eee;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 22px;
  padding: 0 16px;

  input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 15px;
    padding: 10px 0;
    min-height: 40px;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      opacity: 0.6;
    }
  }

  .mic-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      animation: pulse 1s infinite;
    }
  }
}

.send-btn {
  width: 48px;
  height: 40px;
  background: #07c160;
  border: none;
  border-radius: 22px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: scale(0.95);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
</style>
