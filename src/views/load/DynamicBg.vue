<template>
  <div class="stage">
        <slot></slot>
    <div class="actor"></div>
    <div class="actor"></div>
    <div class="actor"></div>
    </div>
</template>
<script setup></script>
<style scoped>
body {
  background: #000;
}

.stage {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.actor {
  display: flex;
  justify-content: center;
  align-items: center;

  animation: kenburns 30s linear infinite;
  /* 景图片会被缩放以完全覆盖其容器 */
  background-size: cover;
  /* 背景图片在容器的中心位置水平居中 */
  background-position: 50%;
  width: 100vw;
  height: 100vh;
  /* 内边距：意味着元素与容器的上下左右间距均为0 */
  inset: 0;
  /* 完全透明 */
  opacity: 0;
  position: absolute;
  scale: 1.2;
}

.actor:nth-child(1) {
  background-image: url("https://glassgenerator.netlify.app/assets/images/bg-default-03.jpg");
}
.actor:nth-child(2) {
  animation-delay: 10s;
  background-image: url("https://glassgenerator.netlify.app/assets/images/bg-default-02.jpg");
}
.actor:nth-child(3) {
  animation-delay: 20s;
  background-image: url("https://glassgenerator.netlify.app/assets/images/bg-default-03.jpg");
}

@keyframes kenburns {
  25% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
    scale: 1;
  }

  60% {
    opacity: 1;
  }
}
</style>
