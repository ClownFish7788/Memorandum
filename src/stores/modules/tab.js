import { defineStore } from "pinia"
import { ref } from 'vue'

export const useTabStore = defineStore('tab-list',() => {
  // 当天
  const today = ref([1])
  // 计划
  const plan = ref([1,2])
  // 全部
  const all = ref([1,2,3])

  return {
    today,
    plan,
    all
  }
},
{
  persist: true
})
