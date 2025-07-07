import { defineStore } from "pinia"
import { ref } from 'vue'

export const useListStore = defineStore('list-store', () => {
  const list = ref([])

  // 拖拽时更换顺序
  const changeOrder = (firstId, secondId) => {
    const dragIdVal = firstId.value
    const targetIdVal = secondId.value

    const copyList = [...list.value]

    const firstIndex = copyList.findIndex(item => item.id === dragIdVal)
    if(firstIndex === -1) return
    const [obj] = copyList.splice(firstIndex, 1)

    const secondIndex = copyList.findIndex(item => item.id === targetIdVal)
    if(secondIndex === -1) return
    copyList.splice(secondIndex, 0, obj)

    list.value = copyList
  }
  // 新增列表
  const addItem = (obj, bool) => {
    if(list.value.some(item => item.name === obj.name) && !bool) return false
    const maxId = list.value.length <= 0 ? 0 : Math.max(...list.value.map(item => item.id))
    obj.id = maxId + 1
    obj.count = 0
    obj.content = []
    list.value.unshift(obj)
    return true
  }
  // 搜索
  const searchItem = (keyWord) => {
    return list.value.filter(item => item.name.includes(keyWord))
  }
  // 重命名
  const rename = (id, newName) => {
    const index = list.value.findIndex(item => item.id === id)
    list.value[index].name = newName
  }
  // 删除
  const deleteNode = (id) => {
    if(!id) return
    const index = list.value.findIndex(item => item.id === id)
    delete list.value[index]
    list.value.splice(index, 1)
  }
  // 编辑
  const editNode = (obj, bool) => {
    if(!bool && list.value.find(item => item.name === obj.name && item.id !== obj.id)) return false
    const id = obj.id
    const index = list.value.findIndex(item => item.id === id)
    list.value[index] = obj
    return true
  }
  //添加清单
  const addListItem = (id, item) => {
    const index = list.value.findIndex(item => item.id === id)
    list.value[index].content.unshift({
      id: item.id,
      name: item.name
    })
  }
  return {
    list,
    changeOrder,
    addItem,
    searchItem,
    rename,
    deleteNode,
    editNode,
    addListItem
  }
},
{
  persist: true
})
