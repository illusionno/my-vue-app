<!-- https://sortablejs.github.io/vue.draggable.next/#/simple -->
<!-- https://github.com/SortableJS/vue.draggable.next -->
<template>
  <n-button @click="add" type="primary">Add</n-button>
  <draggable
    :list="state.list"
    :disabled="!state.enabled"
    item-key="id"
    class="w-25"
    ghost-class="ghost"
    chosen-class="chosen"
    @start="state.dragging = true"
    @end="state.dragging = false"
    animation="300"
  >
    <template #item="{ element }">
      <div class="mt-2 w-100%">
        <!-- <transition-group> -->
          <!-- 使用 transition-group 要添加 key -->
          <n-tag
            class="item"
            :class="{ 'not-draggable': !state.enabled }"
            :key="element.id"
          >
            {{ element.name }}
          </n-tag>
        <!-- </transition-group> -->
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
let id = 1;
const state = reactive({
  enabled: true,
  list: [
    { name: "西瓜", id: 0 },
    { name: "橙子", id: 1 },
    { name: "草莓", id: 2 },
  ],
  dragging: false,
});

const draggingInfo = computed(() => (state.dragging ? "under drag" : ""));

const add = () => {
  state.list.push({ name: "水果" + id, id: id++ });
};
</script>
<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  border: 1px solid #18a058;
}
.chosen {
  border: 1px solid #18a058;
}
.item {
  width: 100%;
  text-align: center;
  &:hover {
    background-color: #f0f0f0;
  }
}
.not-draggable {
  cursor: no-drop;
}
/* 对移动中的元素应用的过渡 */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.v-leave-active {
  position: absolute;
}
</style>
