<script setup>
import { computed, ref } from 'vue'
import AddList from './AddList.vue';
import { useGlobalStore } from '@/stores/index'
// import { ElMessageBox, ELMessage } from 'element-plus';
const globalStore = useGlobalStore()

// 添加列表
const show = ref(false)
// 处理有几项已完成
const finishedCount = computed(() => {
  return globalStore.globalItemList.filter(item => item.finished).length
})
// 删除
const deleteItem = () => {
  ElMessageBox.confirm(
    `你确定要删除这${finishedCount.value}项已完成的任务吗`,
    'warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(() => {
    globalStore.deleteFinishedItem()
    ElMessage({
      message:'删除成功',
      type: 'success'
    })
  }).catch(() => {

  })
}
</script>

<template>
  <div class="header">
    <h2 class="type">{{ globalStore.globalName }}</h2>
    <div class="left">
      <button class="add" @click="show = true">+</button>
      <div class="count">{{ globalStore.globalItemList.length }}</div>
    </div>
  </div>
  <AddList v-model="show"></AddList>
  <span v-if="finishedCount > 0">完成{{ finishedCount }}项 &nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span class="deleteItem" @click="deleteItem">删除</span>
  <el-divider />
</template>


<style scoped>
.header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.type{
  color:#4ea3ff;
  font-size: 40px;
}
.left{
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
}
.left .add{
  background-color: #e2e2e2;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none
}
.deleteItem:hover{
  color:red;
  text-decoration: underline;
}
</style>
