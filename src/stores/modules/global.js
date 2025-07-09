import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useItemStore } from '@/stores/index'
import { useListStore } from '@/stores/index'

export const useGlobalStore = defineStore('global-store', () => {
  const itemStore = useItemStore()
  const globalType = ref('') // 选中的类型
  const globalName = ref('') // 选中的内容
  const globalItemList = ref([]) // 用于存储清单
  const globalId = ref()
  const listStore = useListStore()

  const getGlobalType = (item) => {
    if(item !== undefined && item !== null){
      globalName.value = item.name
      globalType.value = item.type
      globalId.value = item.id
    }
    if(globalType.value !== 'tab') {
      const content = listStore.showContent(globalId.value)
      const newList = itemStore.findItem(content.map(item => item.id))
      // 使用splice可以保持响应式
      globalItemList.value.splice(0, globalItemList.value.length, ...newList)
    }else{
      globalItemList.value.splice(0, globalItemList.value.length)
    }
  }
  return {
    globalType,
    globalName,
    globalItemList,
    getGlobalType,
    globalId
  }
},
{
  persist: true
})
