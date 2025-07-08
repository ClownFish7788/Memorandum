<script setup>
import ElementCom from './ElementCom.vue'
import { ref } from 'vue'

// 选中效果 -> 全局
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
const selected = ref('')
const handleSelect = (item) => {
  item.type = 'tab'
  globalStore.getGlobalType(item)
}

// tab内容管理
import { useTabStore } from '@/stores'
const tabStore = useTabStore()

</script>

<template>
  <div>
    <div class="top">
      <ElementCom
      width="120px"
      :selected="selected === '今天'"
      @select="handleSelect"
      title="今天"
      v-model="tabStore.today">
      </ElementCom>
      <ElementCom
      width="120px"
      :selected="selected === '计划'"
      @select="handleSelect"
      title="计划"
      v-model="tabStore.plan">
      </ElementCom>
    </div>
    <ElementCom
    width="260px"
    :selected="selected === '全部'"
    class="big-tab"
    @select="handleSelect"
    title="全部"
    v-model="tabStore.all">
  </ElementCom>
  </div>
</template>

<style scoped>
.top {
  display: flex;
  flex-direction: row; /* 横向排列 */
}

.top > * {
  margin: 8px; /* 上下左右都留出间距，可根据需要调整 */
}
.big-tab{
  margin: 8px;
}
</style>
