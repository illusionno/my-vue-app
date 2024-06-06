<template>
  <div class="container">
    <div v-if="!state.isMobile">该扫码功能仅支持移动端设备！</div>
    <div v-else>
      <div v-if="state.qrCodeVisible">
        <vueQrcode @on-success="gotQrCode" />
      </div>
      <!-- 解析结果 -->
      <div v-else class="result-wrap">
        <el-result :icon="state.result ? 'success' : 'error'" :title="state.result ? '解析结果' : '解析失败'">
          <template #sub-title>
            <div v-html="state.result"></div>
          </template>
          <template #extra>
            <el-button type="primary" @click="() => state.qrCodeVisible = true">返回</el-button>
          </template>
        </el-result>
      </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import vueQrcode from "./vueQrcode.vue";
import _ from 'lodash'
import tone from "@/assets/tone.mp3";
import { ElMessage } from 'element-plus'

const audio = new Audio(tone);
const state = reactive({
  qrCodeVisible: true,
  isMobile: false,
  result: '',
});
// 检查当前访问协议和设备
const checkEnvironment = () => {
  if (window.location.protocol !== 'https:') {
    return ElMessage.warning("只支持 https 环境!");
  }
  // 获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
  const info = navigator.userAgent;
  state.isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      info
    );
};
onMounted(() => {
  checkEnvironment();
});
// 扫码成功 (文件/string)
const gotQrCode = (data: any) => {
  state.qrCodeVisible = false
  if (!_.isEmpty(data)) {
    audio.play();
    // 处理结果 
    state.result = data
    // 这里可以进行后续处理，比如发送请求...
  }
};

</script>



<style lang="scss" scoped>

</style>
