<template>
  <div>
    <qrcode-stream
      class="qrcode-wrap"
      :torch="torch"
      v-memo="[torch]"
      :constraints="selectedConstraints"
      :track="paintBoundingBox"
      @error="onError"
      @detect="onDetect"
      @camera-on="onCameraReady"
    >
      <div v-if="isSupportTorch" class="torch-wrap">
        <div class="torch" @click="() => (torch = !torch)">
          <div class="flash-light" v-if="torch">
            <MdiFlashlightOff style="width: 36px; height: 36px" />
          </div>
          <div class="flash-light" v-else>
            <MdiFlashlight style="width: 36px; height: 36px" />
          </div>
          {{ torch ? "关闭闪光灯" : "打开闪光灯" }}
        </div>
      </div>
      <div class="photo-wrap">
        <div class="photo" @click="handleOpenFile">
          <el-icon size="20">
            <PictureFilled />
          </el-icon>
        </div>
        <div class="color-[#fff]">相册</div>
      </div>
    </qrcode-stream>
  </div>
</template>
<script setup lang="ts">
// https://gruhn.github.io/vue-qrcode-reader/api/QrcodeStream.html
import { QrcodeStream ,setZXingModuleOverrides} from "vue-qrcode-reader";
import { PictureFilled } from "@element-plus/icons-vue";
import MdiFlashlight from "~icons/mdi/flashlight";
import MdiFlashlightOff from "~icons/mdi/flashlight-off";
import { ElMessage } from "element-plus";
import { fileOpen } from "browser-fs-access";
import _ from "lodash";
// 该文件由zxing-wasm项目构建而来
import wasmFile from './zxing_reader.wasm?url';

// !为了离线加载，vue-qrcode-reader内部也是以cdn方式使用了zxing 进行二维码解析
// https://github.com/gruhn/vue-qrcode-reader/issues/354
setZXingModuleOverrides({
  locateFile: (path: string, prefix: any) => {
    if (path.endsWith('.wasm')) {
      return wasmFile;
    }
    return prefix + path;
  },
});
const error = ref("");
const cameraIsReady = ref(false);
const isSupportTorch = ref(false); // 是否支持闪光灯
const torch = ref(false); // 闪光灯状态
// 相机配置选项: 'user'|'environment' （默认：environment）
const selectedConstraints = ref({ facingMode: "environment" });

// 检测到二维码后绘制画布类型
function paintBoundingBox(detectedCodes: any, ctx: CanvasRenderingContext2D) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    // 绘制边框矩形
    ctx.strokeRect(x, y, width, height);
  }
}

async function onCameraReady(capabilities: any) {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  try {
    isSupportTorch.value = !!capabilities.torch;
    cameraIsReady.value = true;
    error.value = "";
  } catch (error) {
    onError(error);
    cameraIsReady.value = false;
  }
}
// 错误提示
function onError(err: any) {
  error.value = `[${err.name}]: `;
  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
  ElMessage.warning(error.value);
}
// 用户摄像头的流后
function onDetect(detectedCodes: any) {
  if (detectedCodes.length > 0) {
    onDecode(detectedCodes[0]?.rawValue);
  }
}

const emit = defineEmits(["on-success"]);

// 解码(交给父组件处理：进行网络请求)
function onDecode(text: string) {
  emit("on-success", text);
}
// 文件转成base64
const processFile = async (file: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let base64String = e.target?.result as string ||'';
      // 此处可对该base64进行获取赋值传入后端
      onDecode(base64String)
    };
};
// 打开图片选择
async function handleOpenFile() {
  try {
    const file = await fileOpen({ mimeTypes: ["image/*"] }).catch(() => null);
    if (!file) return;
    // 计算文件的大小
    const fileSizeMb = _.round(file.size / 1024 / 1024, 2);
    // 文件大小不能超过 10MB
    const limitSizeMb = 10;
    if (fileSizeMb > limitSizeMb) {
      return ElMessage.warning(`图片大小限制 ${limitSizeMb}MB`);
    }
    processFile(file)
  } catch (error) {
    console.log(`[log] - handleOpenUploadIcon - error:`, error);
  }
}
</script>
<style scoped>
.qrcode-wrap {
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1 !important;
  background: rgba(0, 0, 0, 0.5);
}
.torch-wrap {
  width: 18.75rem;
  height: 12.5rem;
  position: fixed !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -30%);
  z-index: 20;
}

.torch {
  position: fixed;
  bottom: -6.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.photo-wrap {
  position: fixed;
  bottom: 2.875rem;
  left: 2.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.photo {
  height: 3.125rem;
  width: 3.125rem;
  background-color: rgba(250, 250, 250, 0.8);
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
}
</style>
