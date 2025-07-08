<script setup>
import { computed } from 'vue'
// 列表内容处理
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
const itemList = computed(() => globalStore.globalItemList)

</script>

<template>
  <el-scrollbar height="700px">
    <div v-for="item in itemList" :key="item.id" class="item-container">
      <input type="radio" class="radio">
      <div class="item">
        <div class="item-content">
          <p>{{ item.name }}</p>
          <p class="remark">{{ item.remark }}</p>
          <p class="time">{{ item.date }}</p>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.item-container{
  display: flex;
  gap:10px
}
.item{
  flex: 1
}
.radio{
  margin-bottom: 48px;
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
</style>
