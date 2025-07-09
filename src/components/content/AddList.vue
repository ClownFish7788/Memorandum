<script setup>
import { Calendar, Flag, Clock } from '@element-plus/icons-vue'
import { computed, ref, watch, onMounted } from 'vue'
const show = defineModel()

// 单选框取消
const checked = ref(false)
const onClick = () => {
  if(checked.value){
    checked.value = false
  }else{
    checked.value = true
  }
}

const name = ref('')
const remark = ref('')
const date = ref()
const time = ref(null)
// 监听date改变
watch(date, (newVal, oldVal) => {
  if(oldVal === ''){
    const now = new Date()
    time.value = now
  }
})

// 点击样式添加
const isActive = ref('')
const selectedFlag = ref(false)
const addActive = (className) => {
  isActive.value = className
  setTimeout(() => {
    isActive.value = ''
  },100)
}

// 分组弹出框
import { useListStore } from '@/stores'
const listStore = useListStore()
const selectedGroup = ref()
const chooseGroup = (item) => {
  selectedGroup.value = item
}

// 监听添加弹框是否消失 （重置数据）
watch(show, (newVal, oldVal) => {
  if(oldVal){
    selectedGroup.value = ''
    name.value = ''
    remark.value = ''
    date.value = ''
    time.value = ''
    checked.value = false
  }
})

// 检查列表内容
const nameError = ref('')
const nameCheck = () => {
  if(name.value === ''){
    nameError.value = '请输入列表名字'
  }else if(name.value.length > 10){
    nameError.value = '列表名字长度应小于10个非空字符'
  }else if(name.value !== name.value.trim()){
    nameError.value = '列表名字不能出现空格'
  }else{
    nameError.value = ''
    return true
  }
  return false
}

// 格式化时间
const getFormatDate = () => {
  const formatDate = new Date(date.value)
  const YYYY = formatDate.getFullYear()
  const MM = String(formatDate.getMonth()).padStart(2, '0')
  const DD = String(formatDate.getDay()).padStart(2, '0')
  return `${YYYY}-${MM}-${DD}`
}

const getFormatTime = () => {
  const formatTime = new Date(time.value)
  const hh = String(formatTime.getHours()).padStart(2, '0')
  const mm = String(formatTime.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

// 添加列表
import { useItemStore } from '@/stores'
const itemStore = useItemStore()
const addItem = () => {
  if(!nameCheck()) return
  const item = {
    checked: checked.value,
    name: name.value,
    remark: remark.value,
    date: getFormatDate(),
    time: getFormatTime(),
    group: selectedGroup.value.id,
    flag: selectedFlag.value
  }
  itemStore.addItem(item)
  show.value = false
}

// 监听数据给提交键加禁用效果
const disabled = ref(true)
watch([() => name.value, () => date.value], ([newName, newDate]) => {
  const isDateVaild = newDate !== '' && newDate !== undefined && newDate !== null
  const isNameVaild = /^.{1,10}$/.test(newName)
  disabled.value = !(isDateVaild && isNameVaild)
})

// 如果当前选中为checkList设置group
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
const type = computed(() => globalStore.globalType)
const globalName = computed(() => globalStore.globalName)
// 初始化时就渲染
const assignment = () => {
  selectedGroup.value = {
    name : globalStore.globalName,
    id: globalStore.globalId
  }
}
onMounted(() => {
  if(type.value === 'checkList'){
    assignment()
  }
})
watch(globalName, () => {
  if(type.value === 'checkList'){
    assignment()
  }
})
</script>

<template>
  <el-dialog v-model="show">
    <template #header>
      <div class="header">
        <h1>添加列表</h1>
      </div>
    </template>
    <template #default>
      <el-divider />
      <div class="body">
        <input class="radio" :value="true" v-model="checked" type="radio" name="option" @click="onClick">
        <div class="left">
          <div class="inp">
            <input type="text" v-model="name" @blur="nameCheck" :class="{ error : nameError.length > 0 }">
            <div class="name-error" v-if="nameError">{{ nameError }}</div>
            <input type="text" placeholder="备注" v-model="remark">
          </div>
          <div class="time">
            <div class="time-picker">
              <el-date-picker
              v-model="date"
              format="YYYY-MM-DD"
              :prefix-icon="Calendar"
              :editable="false"
              ></el-date-picker>

              <el-time-picker
              v-if="date"
              :prefix-icon="Clock"
              v-model="time"
              placeholder="time"
              style="width:200px"
              format="hh:mm">
              </el-time-picker>
            </div>

            <el-popover
            placement="bottom"
            trigger="hover">
            <template #reference>
              <div
              class="group"
              :class="{ active: 'group' === isActive }"
              @click="addActive('group')">{{ selectedGroup?.name || '#' }}</div>
            </template>
              <el-scrollbar max-height="300px">
                <div
                class="list-item"
                v-for="item in listStore.list"
                :key="item.id"
                @click="chooseGroup(item)">{{ item.name }}</div>
              </el-scrollbar>
            </el-popover>

            <el-icon
            class="flag-icon"
            :class="{ selected: selectedFlag }"
            @click="selectedFlag = !selectedFlag"
            ><Flag /></el-icon>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <el-divider />
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="addItem" :disabled="disabled">添加</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.body{
  display: flex;
  gap: 20px;
}
.header{
  height: 10px;
}
.left{
  flex:1
}
.radio{
  transform: scale
}
.inp{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
input[type="text"]{
  outline: none;
  border: none;
  height: 30px;
}
.time{
  display: flex;
  justify-content: start;
  gap: 10px
}
.time-picker{
  display: flex;
  justify-content: start;
  gap:10px;
}
.group{
   background-color: #dcdcdc;
   width: 30px;
   height: 30px;
   border-radius: 5px;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
}
.flag-icon{
  background-color: #dcdcdc;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  transition: background-color 0.2s;
}
.active{
  background-color: #b6b5b5;
}
.selected{
  background-color: #64bcff;
}
.list-item{
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.list-item:hover{
  background-color: #bdbdbd;
}
.name-error{
  color: red;
  font-size: 10px;
}
.error{
  border: 2px solid red !important;
  border-radius: 5px;
}
</style>
