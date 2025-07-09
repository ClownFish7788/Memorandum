<script setup>
import { computed, ref, watch } from 'vue'

// 列表内容处理
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()

// 添加一个状态来跟踪是否正在切换清单
const isSwitching = ref(false)

// 监听清单变化
watch(() => globalStore.currentListId, (newVal, oldVal) => {
  if (oldVal !== null) {
    isSwitching.value = true
    // 短暂延迟后重置状态
    setTimeout(() => {
      isSwitching.value = false
    }, 10)
  }
})

const itemList = computed(() => {
  // 在切换清单时返回空数组避免残留
  if (isSwitching.value) return []
  return globalStore.globalItemList
})

// 完成事件
import { useItemStore } from '@/stores/index'
const itemStore = useItemStore()
const finishCheckList = (item) => {
  itemStore.finishItem(item.id)
}

// 添加排序计算属性
const sortedList = computed(() => {
  return [...itemList.value].sort((a, b) => {
    // 未完成的排在前面，已完成的排在后面
    return a.finished === b.finished ? 0 : a.finished ? 1 : -1
  })
})
</script>

<template>
  <el-scrollbar height="700px">
    <!-- 使用 v-if 控制过渡组件的显示 -->
    <TransitionGroup
      v-if="!isSwitching"
      name="list"
      tag="div"
    >
      <div
        v-for="item in sortedList"
        :key="item.id"
        class="item-container"
      >
        <div class="checkbox-custom">
          <input
            type="checkbox"
            class="checkbox-inp"
            :id="'checked-' + item.id"
            :checked="item.finished"
            @change="finishCheckList(item)"
          >
          <label
            :for="'checked-' + item.id"
            class="checkbox-bg"
            :class="{ checked: item.finished }"
            :aria-label="'完成'+item.name"
            :aria-checked="item.finished"
          ></label>
        </div>
        <div class="item">
          <div class="item-content">
            <p>{{ item.name }}</p>
            <p class="remark">{{ item.remark }}</p>
            <p class="time">{{ item.date }}-{{ item.time }}</p>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </TransitionGroup>

    <!-- 切换清单时显示的占位内容 -->
    <div v-else class="loading-placeholder">
      <div class="placeholder-item" v-for="i in 5" :key="i">
        <div class="placeholder-checkbox"></div>
        <div class="placeholder-content">
          <div class="placeholder-line"></div>
          <div class="placeholder-line short"></div>
          <div class="placeholder-line shorter"></div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.item-container{
  display: flex;
  gap:10px;
  transition: all 1s;
}
.item{
  flex: 1
}
.checkbox-inp{
  opacity: 0;
  position: absolute;  /* 脱离文档流，避免影响全局样式 */
  pointer-events: none;
}
.item-content{
  height: 50px;
}
p{
  line-height: 20px;
  margin: 0;
}
.remark{
  font-size: 13px;
}
.time{
  font-size: 12px;
}
.checkbox-bg {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%; /* 圆角 */
  cursor: pointer;
  transition: all 0.2s ease; /* 平滑过渡 */
  display: block;
}
.checkbox-bg.checked {
  background-color: #42b983;
  border-color: #42b983; /* 增加边框颜色修改 */
  transform: scale(1.2); /* 可选：添加放大效果增强视觉反馈 */
}
.checked{
  background-color: #42b983; /* 蓝色背景 */
  border-color: #42b983; /* 边框颜色与背景一致 */
}
.checkbox-bg:hover {
  border-color: #42b983;
}
.checkbox-custom{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid gray;
  margin-top: 10px;
  display: flex;          /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  position: relative
}
.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active {
  transition: all 0.3s ease;
}

.list-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: calc(100% - 20px);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 添加加载占位样式 */
.loading-placeholder {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}

.placeholder-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.placeholder-checkbox {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #f0f0f0;
  margin-top: 10px;
}

.placeholder-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.placeholder-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite;
}

.placeholder-line.short {
  width: 70%;
}

.placeholder-line.shorter {
  width: 50%;
  height: 14px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
