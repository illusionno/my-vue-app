<template>
<div class="p-6">
    <VueDraggableTest></VueDraggableTest>
    name: {{ userStore.name||'默认名' }}
</div>
</template>

<script lang="ts" setup>
import VueDraggableTest from './views/test/vue-draggable/Demo1.vue'
import {useUserStore} from '@/store/modules/user'
const userStore = useUserStore()
setTimeout(() =>{
    userStore.name = 'foo'
},1000)
</script>

<style>
</style>
