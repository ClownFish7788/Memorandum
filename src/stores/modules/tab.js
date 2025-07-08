import { defineStore } from "pinia"
import { ref } from 'vue'

export const useTabStore = defineStore('tab-list',() => {
  // 当天
  const today = ref({
    content: [1],
    id: 1,
    name: '今天'
  })
  // 计划
  const plan = ref({
    content: [1,2],
    id: 2,
    name: '计划'
  })
  // 全部
  const all = ref({
    content: [1,2,3],
    id: 3,
    name: '全部'
  })

  return {
    today,
    plan,
    all
  }
},
{
  persist: true
})
