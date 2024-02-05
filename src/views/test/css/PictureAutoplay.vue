<template>
    <div class="stage">
     <div class="actor"></div>
     <div class="actor"></div>
     <div class="actor"></div>
   </div>
   </template>
   <script setup>
   
   </script>
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
     background-image: url("https://images.unsplash.com/photo-1504221507732-5246c045949b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80");
   }
   .actor:nth-child(2) {
     animation-delay: 10s;
     background-image: url("https://images.unsplash.com/photo-1595131838595-3154b9f4450b?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1MjE&ixlib=rb-4.0.3&q=80");
   }
   .actor:nth-child(3) {
     animation-delay: 20s;
     background-image: url("https://images.unsplash.com/photo-1618331835717-801e976710b2?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQ2OTA1NjU&ixlib=rb-4.0.3&q=80");
   }
   
   @keyframes kenburns {
     25% {
       opacity: 1;
     }
   
     50% {
       opacity: .8;
       scale: 1;
     }
   
     60% {
       opacity: 0;
     }
   }
   </style> 