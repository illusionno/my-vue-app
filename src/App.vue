<template>
  <!-- <SecConditionTree  :encode="true" :data="data" :fields="[]"></SecConditionTree> -->
  <div class="todo" id="todo" :class="{'done': isDone}" @click="() =>isDone = !isDone">11111</div>

  <AntvX6></AntvX6>
  <!-- <router-view /> -->
</template>

<script lang="ts" setup>
// import '@sec-fe/sec-condition-tree/index.css';
import AntvX6 from '@/views/test/antv-x6/Index.vue'
// import { SecConditionTree, validate as validateConditionTree } from '@sec-fe/sec-condition-tree';
// const data = ref([
//   { operate: 'AND', data: null, chd: null }
// ])
const isDone = ref(false)

</script>
<style scoped >
    .todo {
      /*禁用与鼠标交互：悬浮、点击...*/
        pointer-events: none;
        margin-left: 20px;
    }

    .todo:before {
        content: " ";
        display: inline-block;
        line-height: normal;
        font-size: 16px;
        border: 1px solid black;
        border-radius: 4px;
        /* 将背景图片定位在元素的中心位置 */
        background-position: 50%;
        white-space: normal;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        box-sizing: border-box !important;
        position: relative;
        cursor: pointer;
        pointer-events: auto;
        top: 2px;
    }
    .todo:hover:before {
        border: 1px solid rgb(100, 149, 237);
    }
.done{
  text-decoration: line-through;
}
.done::before{
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwLjU4OSAzLjkwM2wuODA4LjgwOGEuMzUuMzUgMCAwMTAgLjQ5NUw2LjE4IDEwLjQyNWEuMzUuMzUgMCAwMS0uNDk1IDBMMi43MDMgNy40NDRhLjM1LjM1IDAgMDEwLS40OTVsLjgwOC0uODA4YS4zNS4zNSAwIDAxLjQ5NSAwbDEuOTI1IDEuOTI0IDQuMTYzLTQuMTYzYS4zNS4zNSAwIDAxLjQ5NSAweiIgZmlsbD0iIzMzNzBGRiIvPjwvc3ZnPg==);
}

</style>
