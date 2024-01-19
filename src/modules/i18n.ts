import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
export default createI18n({
    legacy: false, //处理报错Uncaught (in promise) SyntaxError
    locale: localStorage.getItem('lang') || "zh-cn",//设置语言
    fallbackLocale: 'en', // 没有中文的话默认英文
    globalInjection: true, // 如果不设置为true挂载到全局的话，{{$t(`message.name`)}}这种使用会报错
    messages: {
      // 配置语言
      'zh-cn': zh,
      en: en
    }
})