<script setup>
import { ref } from 'vue'
import AddList from './AddList.vue';
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()

// 添加列表
const show = ref(false)

</script>

<template>
  <div class="header">
    <h2 class="type">{{ globalStore.globalType }}</h2>
    <div class="left">
      <button class="add" @click="show = true">+</button>
      <div class="count">{{ globalStore.globalList.length }}</div>
    </div>
  </div>
  <AddList v-model="show"></AddList>
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
</style>
