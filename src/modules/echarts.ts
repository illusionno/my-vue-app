import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
// 手动引入 ECharts 各模块来减小打包体积
// https://github.com/apache/echarts/blob/master/src/echarts.all.ts
import { CanvasRenderer } from 'echarts/renderers';

import {
    BarChart,
    PieChart,
    GraphChart,
    LineChart,
    PictorialBarChart,
    MapChart,
    EffectScatterChart,
  } from 'echarts/charts';

  import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    GeoComponent,
    TitleComponent,
  } from 'echarts/components';

  use([
    CanvasRenderer,
    BarChart,
    PieChart,
    LineChart,
    GraphChart,
    PictorialBarChart,
    MapChart,
    EffectScatterChart,
  
    GridComponent,
    TooltipComponent,
    LegendComponent,
    GeoComponent,
    TitleComponent,
  ]);
  
  export default ECharts;
