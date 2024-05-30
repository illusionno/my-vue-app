<!-- 通过操作dom节点上的 scrollIntoView方法来实现将元素滚到可视区-->
<template>
    <div class="outer">
        <div class="tab-outer-wrap">
            <div class="tab-wrap">
                <div class="tab-item" :class="{ 'active-tab': index === activeIndex }" v-for="(item, index) in tabs"
                    :key="index" @click="changeTab(index)">
                    {{ item }}
                </div>
            </div>
        </div>
        <div class="content-wrap">
            <div class="content-item" v-for="(item, i) in tabs" :key="i" :ref="(e: any) => (contentRefs[i] = e)">{{ item }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// contentRefs 是一个对象，存储多个ref，键名是索引，值是dom实例
const contentRefs = reactive<Record<number, HTMLDivElement>>({});

const tabs = ['A', 'B', 'C', 'D', 'E']
const activeIndex = ref(0)
const changeTab = (index: number) => {
    activeIndex.value = index
    // 将当前激活的tab对应的content滚动到可视区域
    contentRefs[index].scrollIntoView({
        behavior: 'smooth',//定义滚动是立即的还是平滑的动画
        block: 'start',//定义垂直方向的对齐
        inline: 'nearest'//定义水平方向的对齐
    })
}

</script>
<style scoped lang="scss">
.outer {
    position: relative;
    width: 100%;
    height: 100%;
}

.tab-outer-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
}

.tab-wrap {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 40px;

    .tab-item {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(235, 231, 226);

        &.active-tab {
            color: red;
        }
    }
}

.content-wrap {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;

    .content-item {
        height: 220px;
        background-color: rgb(238, 219, 195);
        margin-bottom: 10px;
        // 定义滚动吸附区域的上外边距
        scroll-margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>