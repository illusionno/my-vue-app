<!--vue-chart 示例demo  -->
<template>
  <div class="chart-wrap">
    <v-chart autoresize class="chart" :option="option" />
  </div>
</template>
<script setup lang="ts">
import _ from "lodash";
import VChart from "@/modules/echarts";
import type { ECBasicOption } from "echarts/types/dist/shared";

const state = reactive<{ chartValue: ECBasicOption }>({
  // 后端返回的 echart 图表配置
  chartValue: {
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    series: [
      {
        type: "line",
        data: [150, 230, 224, 218, 135, 147, 220],
      },
      {
        type: "line",
        data: [110, 210, 24, 208, 137, 176, 130],
      },
    ] as any[],
  },
});

// 前端定义的默认图表配置
const defaultOption: ECBasicOption = {
  grid: {
    left: 0,
    right: "2%",
    bottom: "2%",
    top: "2%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "none",
    },
    textStyle: {
      color: "fff",
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: [
    {
      type: "value",
    },
  ],
};
// 定义颜色
const colorList = ["#F77234", "#21a3f1", "#FF9A2E"];
const series = state.chartValue.series as any[];
series.forEach((item, index) => {
  colorList.forEach(() => {
    item.itemStyle = {
      borderType: "dashed", //小圆点样式
      color: {
        //线条和区域颜色一样
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: colorList[index], // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#fff", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    };
  });
  item.areaStyle = {};//设置为有区域显示
  item.smooth= true;//圆滑曲线
});

// 最终合并生成的 echart 配置
const option = computed<ECBasicOption>(() =>
  _.merge(_.cloneDeep(defaultOption), state.chartValue)
);
</script>
<style lang="scss" scoped>
.chart-wrap {
  width: 600px;
  height: 200px;
  position: relative;
  background: #fff;
}
</style>
