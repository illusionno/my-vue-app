<template>
  <div class="layout-wrap outer-wrap bg-white">
    <Header></Header>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";

</script>
<style scoped lang="scss">
.layout-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.content-wrap {
  height: calc(100vh - 57px);
  margin-top: 58px;
  overflow: auto;
  border: 1px solid red;
}
</style>
