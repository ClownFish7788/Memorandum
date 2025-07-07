<script setup>
import { useListStore } from '@/stores'
import { watch,ref } from 'vue'
const listStore = useListStore()
const deleteDialog = defineModel('deleteDialog',{default: false})
const currentItem = defineModel('currentItem')

// 获取删除对象icon color
const deleteNodeIcon = ref('')
const deleteNodeColor = ref('black')
import { iconList } from '@/utils/icon'
const findIcon = (icon) => {
  const foundIcon = iconList.find(item => item.name === icon)
  return foundIcon.icon || iconList[0].icon
}
watch(deleteDialog, (newVal) => {
  if(newVal){
    deleteNodeColor.value = currentItem.value.selectedColor
    deleteNodeIcon.value = findIcon(currentItem.value.selectedIcon)
  }
})
// 删除
const deleteElDialog = ref(null)
const deleteNode = () => {
  const id = currentItem.value.id
  listStore.deleteNode(id)
  deleteElDialog.value.handleClose()
}
</script>

<template>
  <el-dialog ref="deleteElDialog" v-model="deleteDialog" class="delete-dialog">
    <template #default>
        <div class="delete-content">
          <el-icon
            v-if="deleteNodeIcon"
            :size="40"
            :style="{ backgroundColor: deleteNodeColor }"
            class="el-icon">
              <component :is="deleteNodeIcon" />
          </el-icon>
          <h2>删除列表{{ currentItem.name }}?</h2>
          <p>这将删除该列表的所有内容。</p>
        </div>
    </template>
    <template #footer>
      <div class="footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteNode">删除</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>
/* #default */
.delete-content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.el-icon{
  border-radius: 50%;
  padding: 5px;
}
.footer{
  display: flex;
  justify-content: center;
  gap: 50px;
}
</style>
