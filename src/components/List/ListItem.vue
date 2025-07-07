<script setup>
import { iconList } from '@/utils/icon'
import { ref,nextTick } from 'vue'
import { useListStore } from '@/stores'

// icon处理
const findIcon = (name) => {
  const foundIcon = iconList.find(item => item.name === name)
  return foundIcon ? foundIcon.icon : iconList[0].icon
}

// 点击效果
const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object
  }
})
const emit = defineEmits(['selected', 'getDragedId', 'getDragEnterId', 'rightClick'])
// 解决拖拽时边缘透明化
const dragenter = (e) => {
  // 用当前元素作为 drag image
  e.dataTransfer.effectAllowed = 'move'
  // 关键：自定义 drag image，解决只显示部分的问题
  e.dataTransfer.setDragImage(e.target, 0, 0)
  emit('getDragEnterId', props.item.id)
}
// 右键点击
const onRightClick = (e) => {
  emit('rightClick', e, props.item)
}
// 重命名
const isRename = ref(false)
const name = ref('')
const inp = ref(null)
const rename = () => {
  isRename.value = true
  name.value = props.item.name
  nextTick(() => {
    inp.value && inp.value.select()
  })
}
const listStore = useListStore()
const confirmRename = () => {
  if(name.value.trim()){
    listStore.rename(props.item.id, name.value)
    name.value = ''
    isRename.value = false
  }
}
defineExpose({
  rename
})
</script>

<template>
  <el-container
  @dragstart="emit('getDragedId', item.id)"
  @dragenter="dragenter"
  :class="{ selected: selected }"
  class="container"
  @click="emit('selected', item.id)"
  @contextmenu.prevent="onRightClick"
  >
    <el-main class="main-row">
      <div class="left">
        <div class="icon-container" :style="{ backgroundColor: item.selectedColor }">
          <el-icon :size="20">
            <component :is="findIcon(item.selectedIcon)" />
          </el-icon>
        </div>
        <span class="title" v-if="!isRename">{{ item.name }}</span>
        <el-input
        ref="inp"
        v-model="name"
        @keyup.enter="confirmRename"
        @blur="confirmRename"
        v-else></el-input>
      </div>
      <div class="right">
        {{ item.count }}
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.container,
.main-row {
  overflow: hidden; /* 禁止滚动，隐藏滚动条 */
}
.container {
  border-radius: 10px;
  margin: 0 6px;
  /* 你可以根据需要设置宽度 */
  height: 60px;
}

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

.selected {
  animation: focus-scale 0.8s cubic-bezier(.57,1.47,.76,.89);
  background-color: #afafaf;
}

.main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 10px;  /* 可根据实际调整高度 */
}

.left {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 10px;
}
.icon-container{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
