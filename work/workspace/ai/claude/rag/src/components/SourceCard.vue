<template>
  <div v-if="sources && sources.length > 0" class="source-card">
    <div class="header">📄 参考来源</div>
    <div class="list">
      <div v-for="(source, index) in sources" :key="index" class="item">
        <div class="title">{{ source.document_name || source.title || '未知文档' }}</div>
        <div class="meta" v-if="source.position">{{ source.position }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.source-card {
  margin-left: 44px;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-left: 3px solid #3B82F6;

  .header {
    font-size: 11px;
    color: #3B82F6;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .item {
    padding: 6px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .title {
    font-size: 13px;
    color: #333;
    font-weight: 500;
  }

  .meta {
    font-size: 11px;
    color: #999;
    margin-top: 2px;
  }
}
</style>
