<template>
    <div class="m-4">
      <el-select
        v-model="value"
        value-key="id"
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.screenName"
          :value="item"
        />
      </el-select>
      <p>
        selected option's id:
        {{ value ? value.id : 'no select' }}
      </p>
      <p>
        selected option's value
        {{ value ? value : 'no select' }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  type Option = {
    id: number
    screenName: string
    screenSize: string
    screenFlag: string
  }
  const value = ref<Option>()
  const options = ref([
        {
          "id": 0,
          "screenName": "LEN970",
          "screenSize": "1920*1080",
          "screenFlag": "1a"
        },
        {
          "id": 1,
          "screenName": "NF123ABC",
          "screenSize": "3920*2080",
          "screenFlag": "3a"
        }
  ])
  </script>
  