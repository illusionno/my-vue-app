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

// 全局控制的数据
const state = reactive({
  qrCode: "",
  qrCodeVisible: true,
  isMobile: false,
  result: '',
  qrCOdeData: "",
});


onMounted(() => {
  handleScan()
})
// 开始扫描，检查设备
const handleScan = () => {
  state.isMobile = checkDevice()
};

// 检查当前登录设备类型
const checkDevice = () => {
  // 获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
  const info = navigator.userAgent;
  console.log(info, 'info');
  // 通过正则表达式的test方法判断是否包含“Mobile”字符串
  const isMobile = /mobile/i.test(info);
  // 如果包含“Mobile”（是手机设备）则返回true
  return isMobile;
};

// 扫码成功 (文件/string)
const gotQrCode = (data: any) => {
  state.qrCodeVisible = false
  if (!_.isEmpty(data)) {
    state.result = data
  }

  // try {
  //   if (_.isEmpty(data)) return；
  //   let res;
  //   // 字符串解码
  //   if (_.isString(data)) {
  //     res = await api.getStringDecrypt({ content: data });
  //   } else {
  //     const formData = new FormData();
  //     formData.append('file', data);
  //     res = await api.getQrCodeDecrypt(formData);
  //   }
  //   if (res?.code) {
  //     state.result = res?.message
  //   } else {
  //     state.result = res?.data?.content?.replace(/\n/g, '<br>') ?? t('common.noData')
  //   }
  // } catch (error) {
  //  state.result = '解析失败，请重试！'
  //   console.log(`getQrCodeDecrypt - error`, error);
  // }
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
