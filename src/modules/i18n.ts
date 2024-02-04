import { createI18n } from 'vue-i18n'
import en from '../locales/en.json';
import zh from '../locales/zh-CN.json';
// pnpm i universal-cookie
// pnpm i @vueuse/integrations
import { useCookies } from '@vueuse/integrations/useCookies';
import type { App } from 'vue';
import moment from 'moment';
import _ from 'lodash';

type MessageSchema = typeof zh;
const cookies = useCookies();

export const LOCALE_CACHE_KEY = 'language';
export type LocaleLanguages = 'zh-CN' | 'en' | string;
export const supportLanguages = ['zh-CN', 'en'];
export const defaultLocale = 'zh-CN' as const;//默认语言
// const expiresTime = moment().add(1, 'year')//有效期1年
const nowDate = new Date();
const expiresTime = new Date(nowDate.setDate(nowDate.getDate() + 365));

function createI18nOpts() {
  let localeLang = cookies.get(LOCALE_CACHE_KEY)
  if (!supportLanguages.includes(localeLang)) {
    localeLang = defaultLocale
  }
  cookies.set(LOCALE_CACHE_KEY, localeLang, { expires: expiresTime })
  document.querySelector('html')?.setAttribute('lang', localeLang)//设置语言
  return {
    legacy: false, //处理报错Uncaught (in promise) SyntaxError
    locale:defaultLocale,//设置语言
    fallbackLocale: 'en', // 没有中文的话默认英文
    globalInjection: true, // 如果不设置为true挂载到全局的话，{{$t(`message.name`)}}这种使用会报错
    messages: {
      // 配置语言
      'zh-CN': zh,
      en: en
    }
  }
}

export const i18n = createI18n<[MessageSchema],LocaleLanguages>(createI18nOpts());

export const t = i18n.global.t;//ts文件中使用i18n.t()
export async function setupI18n(app: App) {
  app.use(i18n);
}
export function setLocale(locale: string){
  let _locale = _.cloneDeep(locale);
  if(!supportLanguages.includes(_locale)){
    _locale = defaultLocale;
  }

  i18n.global.locale = _locale;
  cookies.set(LOCALE_CACHE_KEY, _locale, { expires: expiresTime })//存储cookies这
}

export function getLocale()
{
  return i18n.global.locale;
}                                                                                                                    