<template>
  <div class="s-canvas">
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
     
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
const props = defineProps({
  identifyCode: {
    type: String,
    default: "1234",
  },
  fontSizeMin: {
    type: Number,
    default: 25,
  },
  fontSizeMax: {
    type: Number,
    default: 30,
  },
  backgroundColorMin: {
    type: Number,
    default: 255,
  },
  backgroundColorMax: {
    type: Number,
    default: 255,
  },
  colorMin: {
    type: Number,
    default: 0,
  },
  colorMax: {
    type: Number,
    default: 160,
  },
  lineColorMin: {
    type: Number,
    default: 100,
  },
  lineColorMax: {
    type: Number,
    default: 255,
  },
  dotColorMin: {
    type: Number,
    default: 0,
  },
  dotColorMax: {
    type: Number,
    default: 255,
  },
  contentWidth: {
    type: Number,
    default: 112,
  },
  contentHeight: {
    type: Number,
    default: 31,
  },
});
watch(
  () => props.identifyCode,
  () => {
    drawPic();
  }
);
onMounted(() => {
  drawPic();
});
// 生成一个随机数
const randomNum = (min:number, max:number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
// 生成一个随机的颜色
const randomColor = (min:number, max:number) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};
const drawText = (ctx:CanvasRenderingContext2D , txt:string, i:number) => {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax);
  ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei";
  let x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1));
  let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
  var deg = randomNum(-45, 45); // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0); // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};
const drawPic = () => {
  let canvas = document.getElementById("s-canvas") as HTMLCanvasElement;
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D ;
  ctx.textBaseline = "bottom"; // 绘制背景
  ctx.fillStyle = randomColor(
    props.backgroundColorMin,
    props.backgroundColorMax
  );
  ctx.fillRect(0, 0, props.contentWidth, props.contentHeight); // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i++) {
    drawText(ctx, props.identifyCode[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};

const drawLine = (ctx:CanvasRenderingContext2D ) => {
  // 绘制干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
    ctx.beginPath();
    ctx.moveTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    );
    ctx.lineTo(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight)
    );
    ctx.stroke();
  }
};

const drawDot = (ctx:CanvasRenderingContext2D ) => {
  // 绘制干扰点
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, props.contentWidth),
      randomNum(0, props.contentHeight),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
};
</script>

<style scoped lang="scss">
.s-canvas {
  height: 38px;
  border:1px solid #e7e3e3;
  canvas {
    margin-top: 1px;
    margin-left: 8px;
  }
}
</style>
