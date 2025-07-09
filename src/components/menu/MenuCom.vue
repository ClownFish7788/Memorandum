<script setup>
import { Search, CirclePlus } from '@element-plus/icons-vue'
import TabCom from '@/components/Tab/TabCom.vue'
import ListCom from '@/components/List/ListCom.vue'
import DialogCom from './DialogCom.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { useListStore } from '@/stores'

const search = ref('')
// 输入框交互
const inp = ref(null)
const handleBlur = () => {
  inp.value.classList.remove('focus')
}
const handleFocus = () => {
  inp.value.classList.add('focus')
}
// 搜索
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
const listStore = useListStore()
const searchList = ref([])
const goSearch = () => {
  if(!search.value.trim()){
    if(searchList.value.length === 0){
      ElMessage({
        message: '请输入非空内容后再搜索',
        type: 'warning'
      })
    }else{
      searchList.value = listStore.list
    }
    return
  }
  searchList.value = listStore.searchItem(search.value)
  globalStore.searchItem(search.value)
}
// 添加
const isAdd = ref(false)
const handleAdd = () => {
  isAdd.value = true
}
</script>

<template>
  <div class="menu-container">
    <div class="inp" ref="inp">
      <el-input
        v-model="search"
        style="width: 100%;"
        placeholder="搜索"
        @blur="handleBlur"
        @focus="handleFocus"
        @keyup.enter="goSearch"
      >
        <template #prefix>
          <el-icon @click="goSearch" style="cursor: pointer;">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <TabCom></TabCom>
    <p class="list">我的列表</p>
    <div class="list-container">
      <ListCom v-model="searchList"></ListCom>
    </div>
    <p class="add" @click="handleAdd">
      <el-icon><CirclePlus /></el-icon>
      添加列表
    </p>
    <DialogCom v-model:isAdd="isAdd"></DialogCom>
  </div>
</template>

<style scoped>
.list {
  margin-left: 15px;
}

.add {
  margin-left: 30px;
  cursor: pointer;
}
.el-input__wrapper {
  background: transparent !important;
  box-shadow: none !important;
}
.el-input__inner {
  background: transparent !important;
  color: #000;
}
.inp{
  background-color: #c7c7c7;
  border-radius: 5px;
  margin-left: 5px;
  width: 260px;
}
/* 动画定义 */
@keyframes focus-scale {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.inp.focus {
  animation: focus-scale 1s cubic-bezier(.57,1.47,.76,.89);
  border: 2px solid #85cefa;
}

.menu-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 继承父容器高度 */
}

.list-container {
  flex: 1; /* 关键：占据剩余空间 */
  min-height: 0; /* 防止内容溢出 */
  overflow: hidden; /* 隐藏内部溢出 */
}
</style>
