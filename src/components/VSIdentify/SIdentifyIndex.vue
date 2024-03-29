<!-- 验证码组件 -->
<template>
  <div class="flex gap-3 items-center">
    <slot></slot>
    <!-- 验证码 -->
    <SIdentify :identifyCode="identifyCode" />
    <!-- 刷新验证码 -->
    <n-button text type="primary" @click="getIdentifyCode(props.codeLength)">换一张</n-button>
  </div>

    <!-- <VSIdentify @change="getCodeValue">
      <n-input v-model:value="code" type="text" placeholder="请输入验证码" />
    </VSIdentify> -->
</template>
  
<script setup lang="ts">
// 引入登录验证组件
import SIdentify from "./SIdentify.vue";

const props = withDefaults(defineProps<{
  // 验证码长度
  codeLength?: number
}>(), {
  codeLength: 4
})
//密码登录图形验证码
const identifyCode = ref("");
//生成图形验证码的依据
const identifyCodes = ref("1234567890abcdefghizklmnopqrstuvwxyz");
// 生成单个验证码
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const makeIdentifyCode = (l: number) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value +=
      identifyCodes.value[randomNum(0, identifyCodes.value.length)];
  }
};
// 验证码值 改变
const emit = defineEmits(['change'])
const getIdentifyCode = (l: number) => {
  identifyCode.value = "";
  makeIdentifyCode(l);
  emit('change', identifyCode.value)
}
onMounted(() => {
  getIdentifyCode(props.codeLength)
});
</script>
  