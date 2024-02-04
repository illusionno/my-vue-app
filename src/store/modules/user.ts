import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',
  () => {
    const name = ref('foo')
    const age = ref(18)
    return {
      name,
      age,
    }
  }
  , {
    persist:{
      key:'my-custom-key', // 存储的key, 默认store.$id
      storage: sessionStorage, // 存储的类型，默认localStorage
      paths:['name','sex']// 指定 state 中哪些数据需要被持久化, 默认undefined
    }
  })