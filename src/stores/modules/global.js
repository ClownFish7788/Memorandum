import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useItemStore } from '@/stores/index'

export const useGlobalStore = defineStore('global-store', () => {
  const itemStore = useItemStore()
  const globalType = ref('') // 选中的类型
  const globalName = ref('') // 选中的内容
  const globalItemList = ref([]) // 用于存储清单
  const globalId = ref()

  const getGlobalType = (item) => {
    globalName.value = item.name
    globalType.value = item.type
    if(item?.type !== 'tab') {
      const newList = itemStore.findItem(item.content.map(item => item.id))
      // 使用splice可以保持响应式
      globalItemList.value.splice(0, globalItemList.value.length, ...newList)
      console.log(globalItemList.value)
    }else{
      globalItemList.value.splice(0, globalItemList.value.length)
    }
    globalId.value = item.id
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
