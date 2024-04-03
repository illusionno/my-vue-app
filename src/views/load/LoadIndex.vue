<template>
  <DynamicBg>
    <div class="box-container flex flex-col" id="glass">
      <h1 class="blog-title">BaiTao's Blog</h1>
      <div class="content">
        <div class="left flex items-center justify-center">
          <div class="img-wrap">
            <img src="@/assets/common/loadImg.png" alt="图片加载失败" />
          </div>
        </div>
        <div class="right flex flex-col gap-6">
          <div>
            <h1 class="font-italic animate__fadeInRight animate__infinite	infinite">Welcome to my blog!</h1>
            <div class="memo">Your work is going to fill a large part of your life, and the only way to be truly satisfied
              is to do
              what you believe is great work. And the only way to do great work is to love what you do. If you haven't
              found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
              --Steve Jobs</div>

          </div>
          <div class="flex justify-center ml--20%" >
            <StartBtn @click="router.push({name:'home'})"></StartBtn>
          </div>
        </div>
      </div>
      <div class="bottom">I'm coding my life.</div>
    </div>
  </DynamicBg>
</template>
<script setup>
import DynamicBg from "./DynamicBg.vue";
import StartBtn from './StartBtn.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
 function getOneSentence(){
  try {
  fetch('https://v1.hitokoto.cn').then(res =>{
    console.log(res);
  })
  } catch (error) {
    console.log(error);
  }
}
onMounted(() =>{
  getOneSentence()
})
</script>
<style scoped lang="scss">
@font-face {
  font-family: "阿里妈妈灵动体 VF Thin";
  src: url("//at.alicdn.com/wf/webfont/k8HrvipBrrXo/doORoACQJHua.woff2") format("woff2"),
    url("//at.alicdn.com/wf/webfont/k8HrvipBrrXo/VO3CDuxpfQRW.woff") format("woff");
  font-display: swap;
}

// 打字机动画
@keyframes typing {
  from {
    width: 1ch;
  }

  to {
    width: 13ch;
  }
}

.box-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 500px;
  padding: 16px;

  color: white;
  border-radius: 41px;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 191, 255, 0.021);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
  border-right: 2px rgba(40, 40, 40, 0.35) solid;
  z-index: 999;

  .blog-title {
    font-family: Georgia, serif;
    font-style: italic;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;

    .right {
      .greeting {
        width: 2ch;
        overflow: hidden;
        white-space: nowrap;
        animation: 5s typing forwards;
      }

      .memo {
        font-size: 24px;
        line-height: 1.2em;
        word-spacing: 2px;

      }
    }
  }

  .bottom {
    font-family: cursive;
    font-size: 22px;
    text-align: center;
  }
}

.login-box {
  position: fixed;
  width: 1100px;
  height: 600px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 26px;
  z-index: 999;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .img-wrap {
    width: 100%;
    height: 100%;
  }

  .animBtn {
    position: relative;
    width: 180px;
    height: 40px;
    padding: 14px 15px;
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    letter-spacing: 0.08em;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      background: none repeat scroll 0 0 #fff;
      height: 0%;
      left: 50%;
      top: 50%;
      width: 100%;
      z-index: -1;
      transition: all 0.3s ease 0s;
    }

    &:hover {
      color: #333;
      text-shadow: none;

      &:after {
        height: 420%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
      }
    }
  }
}
</style>
