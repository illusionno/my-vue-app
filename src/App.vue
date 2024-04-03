<template>
  <!-- <SecConditionTree  :encode="true" :data="data" :fields="[]"></SecConditionTree> -->
  <router-view />
</template>

<script lang="ts" setup>
import '@sec-fe/sec-condition-tree/index.css';
import { SecConditionTree, validate as validateConditionTree } from '@sec-fe/sec-condition-tree';
const data = ref([
  { operate: 'AND', data: null, chd: null }
])
</script>
<style></style>
