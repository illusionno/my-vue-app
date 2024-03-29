<template>
    <div class="header">
      <div class="name-wrap">
        <!-- todo:图标 -->
        <span>BaiTao's World</span>
      </div>
      <div class="tab-wrap flex gap-8">
        <n-button text @click="router.push({ name: 'index' })">主页</n-button>
        <n-dropdown
          trigger="hover"
          :options="state.fontEndOptions"
          :show-arrow="true"
          @select="handleFontEndOptions"
        >
          <n-button text size="large">前端</n-button>
        </n-dropdown>
        <n-button text>文学</n-button>
        <n-dropdown
          trigger="hover"
          :options="state.langOptions"
          :show-arrow="true"
          @select="handleLangOptions"
        >
          <n-button text @click="toggle">切换语言</n-button>
        </n-dropdown>
        <div class="flex gap-3">
          <n-button quaternary> GitHub </n-button>
          <n-button quaternary class="link-btn"> CSDN </n-button>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
// todo:这里不自动引入？
const state = reactive({
  // 前端
  fontEndOptions: [
    {
      label: "javascript",
      key: "javascript",
    },
    {
      label: "Css",
      key: "2",
    },
    {
      label: "Vue",
      key: "3",
    },
  ],
  // 语言
  langOptions: [
    {
      label: "中文",
      key: "1",
    },
    {
      label: "英文",
      key: "2",
    },
  ],
});
const handleFontEndOptions = (key) => {
  // 路由跳转
  console.log(key);
  router.push({ name: key });
};
const handleLangOptions = (key) => {
  // 路由跳转
  console.log(key);
};
const toggle = () => {
if(localStorage.getItem('locale')==='zh-cn'){
  localStorage.setItem('locale','en')
}else{
  localStorage.setItem('locale','zh-cn')
}
  // language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}
</script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 46px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  box-shadow: 0 3px 10px #0000001a;
  font-family: Hanken Grotesk, sans-serif;
  z-index: 1;

  .name-wrap {
    color: #3863d9;
  }
  .link-btn :deep(.n-button) {
    // padding: 0 0;
  }
}
</style>