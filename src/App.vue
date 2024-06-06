<template>
  <!-- <SecConditionTree  :encode="true" :data="data" :fields="[]"></SecConditionTree> -->
  <!-- <AntvX6></AntvX6> -->
  <!-- <router-view /> -->
  <!-- <ScrollIntoView></ScrollIntoView> -->
  <!-- <Qrcode></Qrcode> -->
  <VueQrcode></VueQrcode>
  <!-- <Test></Test> -->
</template>

<script lang="ts" setup>
// import '@sec-fe/sec-condition-tree/index.css';
import AntvX6 from '@/views/test/antv-x6/Index.vue';
import ScrollIntoView from '@/views/test/ScrollIntoView.vue'
import Qrcode from '@/views/test/qr-code/QrcodeIndex.vue'
import VueQrcode from '@/views/test/vue-qrcode-reader/vueQrcodeIndex.vue'
import Test from '@/views/test/css/Test.vue'
// import { SecConditionTree, validate as validateConditionTree } from '@sec-fe/sec-condition-tree';
// const data = ref([
//   { operate: 'AND', data: null, chd: null }
// ])


</script>
<style scoped >

</style>
