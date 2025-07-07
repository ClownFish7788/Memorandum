<script setup>
import ListItem from '@/components/List/ListItem.vue'
import DeleteDialog from './DeleteDialog.vue'
import { ref } from 'vue'
// 获取列表
import { useListStore } from '@/stores/index'
const listStore = useListStore()


// 控制点击效果->全局
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()
const select = ref()
const handleSelect = (item) => {
  select.value = item.id
  globalStore.getGlobalType(item)
}

// 实现拖拽效果
const dragedId = ref() //被拖拽的对象
const dragEnterId = ref()
const getDragedId = (id) => {
  dragedId.value = id
}
const getDragEnterId = (id) => {
  dragEnterId.value = id
}

const onDragenter = (e) => {  //放置的位置
  e.preventDefault()
  if (!dragedId.value || !dragEnterId.value) return;
  if (dragedId.value === dragEnterId.value) return;
  listStore.changeOrder(dragedId, dragEnterId)
}
const onDragover = (e) => {
  e.preventDefault()
}
const dragend = () => {
  dragedId.value = null
  dragEnterId.value = null
}
// 搜索
const searchList = defineModel()
// 右键触发交互框
const isMenuVisiable = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const currentItem = ref()
const rightClick = (e, item) => {
  isMenuVisiable.value = true
  currentItem.value = item
  menuX.value = e.clientX
  menuY.value = e.clientY

}
const hideMenu = () => {
  isMenuVisiable.value = false
}
// 辨识右键元素
const listItemMap = ref({})
const setListItemMap = (e, id) => {
  if(e){
    listItemMap.value[id] = e
  }else{
    delete listItemMap.value[id]
  }
}
// 重命名
const rename = () => {
  listItemMap.value[currentItem.value.id]?.rename()
  isMenuVisiable.value = false
}
//删除
const deleteDialog = ref(false)
const showDeleteDialog = () => {
  deleteDialog.value = true
}
// 展示列表信息
import DialogCom from '../menu/DialogCom.vue'
const isEdit = ref(false)
const showInfo = () => {
  isEdit.value = true
}
</script>

<template>
  <el-scrollbar class="list-scroll">
    <transition-group name="move" tag="div">
      <ListItem
        :ref="el => el && setListItemMap(el, item.id)"
        v-for="item in searchList.length > 0 ? searchList : listStore.list.filter(Boolean)"
        :item="item"
        :key="item.id"
        :selected="select === item.id"
        @selected="handleSelect(item)"
        draggable="true"
        @dragenter="onDragenter"
        @dragover="onDragover"
        @getDragedId="getDragedId"
        @getDragEnterId="getDragEnterId"
        @dragend="dragend"
        @rightClick="rightClick"
      />
      <!-- 右键弹窗 -->
      <el-menu
      v-if="isMenuVisiable"
      @mouseleave="hideMenu"
      :style="{ position: 'fixed', left: menuX + 'px', top: menuY + 'px', zIndex: 9999, minWidth: '160px' }">
        <el-menu-item index="info" @click="showInfo">显示列表信息</el-menu-item>
        <el-divider />
        <el-menu-item index="open">在新窗口中打开列表</el-menu-item>
        <el-divider />
        <el-sub-menu index="sort">
          <template #title>排序方式</template>
          <el-menu-item index="timeSort">按时间排序</el-menu-item>
        </el-sub-menu>
        <el-divider />
        <el-menu-item index="rename" @click="rename">重新命名</el-menu-item>
        <el-menu-item index="delete" @click="showDeleteDialog">删除</el-menu-item>
        <el-divider />
        <el-menu-item index="share">共享列表</el-menu-item>
      </el-menu>
    </transition-group>
  </el-scrollbar>
  <!-- 删除确认弹窗 -->
  <DeleteDialog
  v-model:deleteDialog="deleteDialog"
  v-model:currentItem="currentItem"></DeleteDialog>
  <!-- 展示弹框 -->
  <DialogCom
  v-model:currentItem="currentItem"
  v-model:isAdd="isEdit"></DialogCom>
</template>

<style scoped>
.move-move {
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.move-enter-active,
.move-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.move-enter-from,
.move-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.move-enter-to,
.move-leave-from {
  opacity: 1;
  transform: translateY(0);
}
:deep(.el-menu) {
  background-color: #d9d9d9;
  border-radius: 5px;
}
:deep(.el-divider) {
  margin: 4px 0 !important;
  background-color: #7e7e7e;
  border-width: 2px !important;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title){
  border-radius: 5px;
  height: 25px;
  margin-top: 5px;
}
/* 删除弹窗表单 */
.delte-dialog :deep(.el-dialog__body) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
