<template>
  <SvgTest></SvgTest>
  <div class="flex gap-6">
    <n-button @click="handleExport">导出</n-button>
    <n-button @click="handleCopy">复制</n-button>
    <n-button @click="handlePaste">粘贴</n-button>
    <n-button @click="handleUndo" :disabled="!canUndo">撤销</n-button>
    <n-button @click="handleRedo" :disabled="!canRedo">重做</n-button>


  </div>
  <!-- 注意，使用 autoResize 配置时，需要在画布容器外面再套一层宽高都是 100% 的外层容器，在外层容器上监听尺寸改变，当外层容器大小改变时，画布自动重新计算宽高以及元素位置。 -->
  <div style="width:100%; height:100%" class="flex">
    <div id="dnd" class="dnd-wrap">
      <div data-type="rect" className="dnd-rect" @mousedown="startDrag">
        Rect
      </div>
      <div data-type="circle" className="dnd-circle" @mousedown="startDrag">
        Circle
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import SvgTest from './SvgTest.vue';
import { Export } from '@antv/x6-plugin-export'
import { Snapline } from '@antv/x6-plugin-snapline'// 对齐线
import { Clipboard } from '@antv/x6-plugin-clipboard'// 复制粘贴
import { Selection } from '@antv/x6-plugin-selection'// 节点选择
import { Keyboard } from '@antv/x6-plugin-keyboard'// 快捷键键盘
import { History } from '@antv/x6-plugin-history'// 
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Dnd } from '@antv/x6-plugin-dnd'
//? antv-x6文档：https://x6.antv.antgroup.com/tutorial/getting-started
import { Graph } from '@antv/x6';
// import { useMessage } from 'naive-ui'

import { createDiscreteApi } from "naive-ui"
const { message } = createDiscreteApi(["message"])

// ? ports 连接桩
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      attrs: {// 节点/边属性样式
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          strokeDasharray: '10,2',
        },
        label: {
          text: 'Hello',
          fill: '#333',
          fontSize: 13,
        }
      },
    },
    {
      id: 'node2', // String，节点的唯一标识
      //?节点形状： https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%8A%82%E7%82%B9
      shape: 'ellipse',// 椭圆形 
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String， 节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      attrs: {
        line: {
          stroke: '#8f8f8f',// 线的颜色
        },
      },
    },
  ],

};
const commonAttrs = {
  body: {
    fill: '#fff',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
  label: {
    refX: 0.5,
    refY: '100%',
    refY2: 4,
    textAnchor: 'middle',
    textVerticalAnchor: 'top',
  },
}
const graph = ref<Graph>()
const dnd = ref<Dnd>()
const canRedo = ref(false)
const canUndo = ref(false)
const initDraw = () => {
  graph.value = new Graph({
    container: document.getElementById('container') as HTMLElement,
    // 容器大小
    width: 800,
    height: 600,
    autoResize: true,//自适应
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    mousewheel: {
      enabled: true,//鼠标滚轮缩放
      modifiers: ['ctrl', 'meta'],
    },
    panning: {//!画布平移
      enabled: true,// 开启画布平移
      modifiers: 'shift',// 按下shift键同时平移画布
    },
    connecting: {// 开启和关闭连线过程中自动吸附
      snap: true
    }
  });

  // 渲染数据
  graph.value.fromJSON(data)
  // 缩小画布
  graph.value.zoom(0.5)
  // 将画布内容中心与视口中心对齐
  graph.value.centerContent()
  graph.value.addNode({
    shape: 'circle',
    x: 180,
    y: 40,
    width: 40,
    height: 40,
    label: 'circle',
    attrs: commonAttrs,
  })
  // 使用 Export 插件
  graph.value.use(new Export())
  graph.value.use(new Snapline({ enabled: true }))
  graph.value.use(
    new Selection({
      enabled: true,
      multiple: true,//启用后按住 ctrl 或 command 键点击节点实现多选
      movable: true,
      rubberband: true,// 是否启用框选节点功能
      showNodeSelectionBox: true
    })
  )
  // 鼠标 Hover 时显示删除按钮
  graph.value.on('node:mouseenter', ({ node }) => {
  node.addTools({
    name: 'button-remove',
    args: {
      x: 0,
      y: 0,
      offset: { x: -5, y: 2 },
    },
  })
})
// 鼠标移开时移除删除按钮
  graph.value.on("node:mouseleave", ({ node }) => {
    if (node.hasTool("button-remove")) {
      node.removeTool("button-remove")
    }
  })
  graph.value.use(
    new Clipboard({
      enabled: true,
    })
  )
  graph.value.use(
    new Keyboard({
      enabled: true,
      global: true,
    })
  )
  graph.value.use(
    new History({
      enabled: true,
    })
  )
  // todo: 迷你地图
  // graph.value.use(
  //     new MiniMap({
  //       container: document.getElementById('minimap') as HTMLElement,
  //       width: 200,
  //       height: 160,
  //       padding: 10,
  //     }),
  //   )
  // 拖拽添加节点
  dnd.value = new Dnd({
    target: graph.value,
    scaled: false,
    dndContainer: document.getElementById('dnd') as HTMLElement,
  })
  graph.value.bindKey('ctrl+c', () => {
    const cells = graph.value?.getSelectedCells()
    if (cells?.length) {
      graph.value?.copy(cells)
    }
    return false
  })

  graph.value.bindKey('ctrl+v', () => {
    if (!graph.value?.isClipboardEmpty()) {
      const cells = graph.value?.paste({ offset: 32 }) as any
      graph.value?.cleanSelection()
      graph.value?.select(cells)
    }
    return false
  })
  // 监听操作历史
  graph.value?.on('history:change', () => {
    canUndo.value = graph.value?.canUndo() as boolean
    canRedo.value = graph.value?.canRedo() as boolean
  }
  )
}


// 撤销
const handleUndo = () => {
  graph.value?.undo()
}
// 重做
const handleRedo = () => {
  graph.value?.redo()
}

onMounted(() => {
  initDraw()
})
// 复制
const handleCopy = () => {
  const cells = graph.value?.getSelectedCells()
  if (cells && cells.length) {
    graph.value?.copy(cells)
    message.success('复制成功')
  } else {
    message.info('请先选中节点再复制')
  }
}

// 粘贴
const handlePaste = () => {
  if (graph.value?.isClipboardEmpty()) {
    message.info('剪切板为空，不可粘贴')
  } else {
    const cells = graph.value?.paste({ offset: 32 }) as any
    graph.value?.cleanSelection()
    graph.value?.select(cells)
    message.success('粘贴成功')
  }
}
// 导出
const handleExport = () => {
  // 默认导出文件名为chart
  graph.value?.exportPNG('chart-test', {
    padding: 8
  })
}
// 开始拖拽节点
const startDrag = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const type = target.getAttribute('data-type')
  console.log(target, type, 11);

  const node =
    type === 'rect'
      ? graph.value?.createNode({
        width: 100,
        height: 40,
        label: 'Rect',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      })
      : graph.value?.createNode({
        width: 60,
        height: 60,
        shape: 'circle',
        label: 'Circle',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      }) as any

  dnd.value?.start(node, e)
}


</script>
<style scoped lang="scss">
.app-content {
  flex: 1;
  height: 240px;
  margin-right: 8px;
  margin-left: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;

}

.dnd-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  user-select: none;

  .dnd-rect {
    width: 100px;
    height: 40px;
    margin: 16px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #8f8f8f;
    border-radius: 6px;
    cursor: move;
  }

  .dnd-circle {
    width: 60px;
    height: 60px;
    margin: 16px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #8f8f8f;
    border-radius: 100%;
    cursor: move;
  }
}
</style>