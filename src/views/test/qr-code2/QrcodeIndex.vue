<template>
  <div class="container">
    <!-- <div v-if="state.isQrCodeShown"> -->
      <GetQrcode @on-success="gotQrCode" />
    <!-- </div>
    <div v-else>该扫码功能仅支持移动端设备！</div> -->

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox } from 'element-plus'
import GetQrcode from "./GetQrcode2.vue";


// 全局控制的数据
const state = reactive({
  qrCode: "",
  // 是否是移动端设备
  isQrCodeShown: false,
  qrCOdeData: "",
});
const fileRef = ref()
onMounted(() => {
  handleScan()
})
// 点击扫描图标---打开扫码功能
const handleScan = () => {
  const isMobile = checkDevice();
  if (isMobile === true) {
    state.isQrCodeShown = true;
  }
};

// 检查当前登录设备类型
const checkDevice = () => {
  // 获取浏览器navigator对象的userAgent属性（浏览器用于HTTP请求的用户代理头的值）
  const info = navigator.userAgent;
  // 通过正则表达式的test方法判断是否包含“Mobile”字符串
  const isMobile = /mobile/i.test(info);
  // 如果包含“Mobile”（是手机设备）则返回true
  return isMobile;
};

// 扫码成功
const gotQrCode = (data: any) => {
  if (data) {
    ElMessageBox.alert(data, '解析结果', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
    }).finally(() =>{
      state.isQrCodeShown = true;
    })
  }
};

const closeScan = () => {
  // 开发的 时候为了方便，加了这个关闭按钮，正常项目可以去掉
  state.isQrCodeShown = false;
};
const handleClickFile = () => {
  fileRef.value.click()
}

const getFile = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e: any) {
    const base64 = e.target.result
    console.log(base64)
  }
}
</script>

<style lang="scss" scoped>
.top-tip-txt,
.no-data {
  color: rgb(var(--gray-6));
}

.input-container {
  padding: 8px 0 16px;
}

@media (min-width: 992px) {
  .detail-info {
    display: flex;

    .device-img {
      flex: 0 0 100px;
    }

    .txt-info {
      flex: 1;
    }
  }
}

@media (max-width: 992px) {
  .detail-info {

    // display: flex;
    .device-img {
      margin-bottom: 16px;
    }

    .txt-info {
      // flex: 1;
    }
  }
}

.detail-info {

  // display: flex;
  .device-img {
    // flex: 0 0 100px;
    height: 100px;
    background-color: #eee;
  }

  .txt-info {
    // flex: 1;
    padding: 0 16px;

    .uuid-name {
      color: var(--base);
    }

    .desc {}
  }
}

.w-p-90 {
  width: 90%;
  margin-left: 5%;
}

.hide_file {
  display: none;
}
</style>

<style lang="scss" scoped>
// responsive

.container {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  .photo {
    position: fixed;
    bottom: 10;
    right: 10;
    height: 40px;
    width: 40px;
    background-color: #eee;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
}
</style>
