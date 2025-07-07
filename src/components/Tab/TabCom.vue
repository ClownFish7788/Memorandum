<script setup>
import ElementCom from './ElementCom.vue'
import { ref } from 'vue'

// 选中效果
const selected = ref('')
const handleSelect = (id) => {
  if(id === selected.value){
    selected.value = ''
    return
  }
  selected.value = id
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
      tabId="tab1"
      :selected="selected === 'tab1'"
      @select="handleSelect"
      title="今天"
      v-model="tabStore.today">
      </ElementCom>
      <ElementCom
      width="120px"
      tabId="tab2"
      :selected="selected === 'tab2'"
      @select="handleSelect"
      title="计划"
      v-model="tabStore.plan">
      </ElementCom>
    </div>
    <ElementCom
    width="260px"
    tabId="tab3"
    :selected="selected === 'tab3'"
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
