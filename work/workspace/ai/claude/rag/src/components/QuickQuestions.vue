<template>
  <div class="quick-questions">
    <div class="scroll-container">
      <div
        v-for="q in questions"
        :key="q"
        class="tag"
        @click="$emit('select', q)"
      >
        {{ q }}
      </div>
    </div>
    <div class="new-btn" @click="$emit('new')">+</div>
  </div>
</template>

<script setup>
defineProps({
  questions: {
    type: Array,
    default: () => [
      '高新技术企业认定',
      '研发费用加计扣除',
      '科技型中小企业'
    ]
  }
})

defineEmits(['select', 'new'])
</script>

<style lang="scss" scoped>
.quick-questions {
  background: #fff;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 8px;
}

.scroll-container {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tag {
  background: #f0f9f0;
  color: #07c160;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #07c160;
  transition: all 0.2s;

  &:active {
    background: #07c160;
    color: #fff;
  }
}

.new-btn {
  width: 32px;
  height: 32px;
  background: #07c160;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(7, 193, 96, 0.3);

  &:active {
    transform: scale(0.95);
  }
}
</style>
