<script setup>
import { ref, defineProps } from 'vue'
const picUrl = ref('')

// 获取宽度
const props = defineProps({
  width: {
    type: String,
    default: '280px'
  },
  tabId: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  }
})
// 点击效果
const emit = defineEmits(['select'])

// 数据管理
const list = defineModel()
</script>

<template>
  <div class="element" :class="{ selected: props.selected }" :style="{ width: props.width  }" @click="emit('select', props.tabId)" ref="tab">
    <div class="left">
      <el-avatar :src="picUrl" />
      <h3>{{ props.title }}</h3>
    </div>
    <div class="right">
      {{ list?.length || 0 }}
    </div>
  </div>
</template>

<style scoped>
.element {
  background-color: #8a8a8a66;
  border-radius: 12px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-sizing: border-box;
  transition: background 0.2s, box-shadow 0.2s, border 0.2s;
  cursor: pointer;
}

/* hover 效果 */
.element:hover {
  background-color: #b7b7b799;
  box-shadow: 0 2px 8px #0001;
}

/* 选中效果 */
.element.selected {
  background-color: #409eff22;
  border: 2px solid #409eff;
  box-shadow: 0 2px 12px #409eff33;
}

.left {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
}

.left h3 {
  margin: 0;
  font-size: 18px;
  color: #222;
  font-weight: 500;
}

.right {
  font-size: 20px;
  color: #666;
  font-weight: 600;
  min-width: 30px;
  text-align: right;
}
</style>
