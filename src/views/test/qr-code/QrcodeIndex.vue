<template>
  <div class="container">
    <div v-if="!state.isMobile">该扫码功能仅支持移动端设备！</div>
    <div v-else>
      <div v-if="state.qrCodeVisible">
        <QrcodeParse @on-success="gotQrCode" />
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
import { reactive, onMounted } from "vue";
import QrcodeParse from "./QrcodeParse.vue";
import _ from 'lodash'
import { ElMessage } from "element-plus";

// 全局控制的数据
const state = reactive({
  qrCode: "",
  qrCodeVisible: true,
  isMobile: false,
  result: '',
  qrCOdeData: "",
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
    // 注意：这里只对扫码获得的base64编码进行识别展示，文件未作处理
    // 实际中需要在这调用接口...
    state.result = data
  }
};

</script>



<style lang="scss" scoped>
.container {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  .result-wrap {
    transform: translateY(46%);
  }

  .hide_file {
    display: none;
  }
}
</style>
