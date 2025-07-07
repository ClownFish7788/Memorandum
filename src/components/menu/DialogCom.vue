<script setup>
import { watch, ref, shallowRef } from 'vue'
import { iconList } from '@/utils/icon'
import { useListStore } from '@/stores'
import { ElMessageBox } from 'element-plus'

// 判断模式
const type = ref('add')

const listStore = useListStore()
const isAdd = defineModel('isAdd')
const dialog = ref(null)

const colorList = ['#e74c3c','#f39c12','#f1c40f','#27ae60',
'#1abc9c','#3498db','#9b59b6','#e67eaf','#7f8c8d','#bc8c63',
'#d3bfa3','#b47b6b']
const selectedColor = ref(colorList[5])

const selectedIcon = shallowRef(iconList[0])
const chooseIcon = (item) => {
  selectedIcon.value = item
}

const name = ref('')

const cancel = () => {
  dialog.value.handleClose()
}
const ensure = () => {
  const obj = {
    name: name.value,
    selectedColor: selectedColor.value,
    selectedIcon: selectedIcon.value.name
  }
  if(type.value === 'add'){
    if(!listStore.addItem(obj, false)){
      ElMessageBox.confirm(
        '您有重复名字的列表，您确认添加重复名字的标签吗',
        '温馨提醒',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        listStore.addItem(obj, true)
        cancel()
      }).catch(() => {
        return
      })
    }
    cancel()
  }else if(type.value === 'edit'){
    obj.id = currentItem.value.id
    obj.count = currentItem.value.count
    obj.content = currentItem.value.content
    if(!listStore.editNode(obj, false)){
      ElMessageBox.confirm(
        '您有重复名字的列表，您确认修改为重复名字的标签吗',
        '温馨提醒',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        listStore.editNode(obj, true)
        cancel()
      }).catch(() => {
        return
      })
    }
    cancel()
  }
}
const close = () => {
  selectedColor.value = colorList[5]
  selectedIcon.value = iconList[0]
  name.value = ''
}
// 展示弹框处理
const currentItem = defineModel('currentItem')
const findIcon = (icon) => {
  const foundIcon = iconList.find(item => item.name === icon)
  return foundIcon ? foundIcon : iconList[0]
}
watch(isAdd, (newVal) => {
  if(newVal){
    if(currentItem.value){
      name.value = currentItem.value.name
      selectedColor.value = currentItem.value.selectedColor
      selectedIcon.value = findIcon(currentItem.value.selectedIcon)
      type.value = 'edit'
    }else {
      type.value = 'add'
      selectedIcon.value = iconList[0]
    }
  }
})

</script>

<template>
  <el-dialog
  v-model="isAdd"
  class="my-dialog"
  ref="dialog"
  @close="close"
  draggable>
    <p>{{ currentItem ? currentItem.name + '简介' : '新建列表' }}</p>
    <div class="name">
      <span class="name-label">名称:</span>
      <el-input v-model="name" style="width: 450px"></el-input>
    </div>
    <div class="choose">
      <span class="color-choose">
        <p class="color-title">颜色:</p>
        <div class="color-radio-group">
          <label
            v-for="color in colorList"
            :key="color"
            class="color-radio-label"
            :style="{ backgroundColor: color }"
          >
            <input
              type="radio"
              class="color-radio"
              name="color"
              :value="color"
              v-model="selectedColor"
            />
            <span
              v-if="selectedColor === color"
              class="color-radio-dot"
            ></span>
          </label>
        </div>
      </span>
      <span class="icon-choose-wrapper">
        <el-popover trigger="click" placement="right" class="popover" :width="280" popper-class="my-popover">
          <template #default>
            <div class="icon-list">
              <div @click="chooseIcon(item)" v-for="item in iconList" :key="item" class="icon-container" :class="{ selected: selectedIcon === item }">
                <div class="icon-padding">
                  <el-icon :size="23" class="el-icon">
                    <component :is="item.icon" />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
          <template #reference>
            <span class="icon-choose">
              <span class="icon-name">图标:</span>
              <div
                class="icon-radio"
                :style="{ border: '2px solid ' + selectedColor }"
              >
                <div class="icon-bg">
                  <el-icon
                    :size="28"
                    class="el-icon"
                    :style="{ backgroundColor: selectedColor }"
                  >
                    <component :is="selectedIcon.icon" />
                  </el-icon>
                </div>
              </div>
            </span>
          </template>
        </el-popover>
      </span>
    </div>
    <el-divider></el-divider>
    <div class="operate">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="ensure" :disabled="!name.trim()">确认</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.my-dialog{
  width: 230px;
  border-radius: 20px;
}
:deep(.el-dialog) {
  width: 230px !important;   /* 必须加 !important */
  border-radius: 20px;
}
.name {
  display: flex;
  justify-content: left;
  gap: 15px
}
.name-label{
  margin-top: 4px;
}
.color-choose{
  display: flex;
  gap: 15px
}
.color-radio-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 12px 0;
  display: flex;
  justify-content: center;
  width: 180px;
  margin-top: 17px;
}
.color-radio-label {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 2px solid transparent;
  transition: border 0.2s;
}
.color-radio-label:hover {
  border: 2px solid #a0c4ff;
}
.color-radio {
  display: none;
}
.color-radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.icon-name{
  margin-top: 15px;
}
.icon-choose {
  display: flex;
  gap:20px;
  margin-right: 80px;
}
.icon-radio {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 你可以加margin或gap来调整多个并排时的间距 */
  margin-top: 20px;
}

.icon-bg {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon {
  border-radius: 50%;
  padding: 7px;
}

.choose {
  display: flex;
  justify-content: space-between;
}
.icon-container {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-padding {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin-top: 3px;
}
.icon-padding .el-icon {
  background-color: #e2e2e2;
}
.icon-container.selected{
  border: 2px solid #a8a8a8
}
.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 250px;
  padding: 5px;
}
.my-popover{
  background-color: #c4c4c4;
}
.operate {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* 按钮之间的间距，可选 */
}
</style>
