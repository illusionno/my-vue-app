<template>
    <div class="w-100">
    <VSIdentify @change="getCodeValue" >
    <n-input v-model:value="code" type="text" placeholder="请输入验证码" />
  </VSIdentify>
  </div>
  </template>
  
  <script lang="ts" setup>
  import VSIdentify from '@/components/VSIdentify/SIdentifyIndex.vue'
  const code = ref('')
  
  const getCodeValue = (val:string) =>{
    console.log(val)
  }
  </script>
  <style></style>
  