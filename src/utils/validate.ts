// import _ from 'lodash';
// // https://github.com/sindresorhus/ip-regex
// import ipRegex from 'ip-regex';
// import { t as $t } from '@/modules/i18n';
// import type { RuleItem } from 'async-validator';
// import type { FormInstance } from 'element-plus';

// type ValidatorFn = RuleItem['validator'];

// export const regex = {
//   phone: /^1[3-9]\d{9}$/,
//   cname: /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/,
//   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//   name: /^[\w\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/,
//   title: /^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{1,10}$/,
//   username: /^[a-zA-Z0-9_-]+$/,
//   subnetMask: /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
//   mac: /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i,
//   nameType2: /^\w+$/, // 数字、字母、下划线
// };

// // 判断是否是 JSON 字符串
// export function isJson(str: any) {
//   if (typeof str !== 'string') return false;
//   try {
//     const result = JSON.parse(str);
//     const type = Reflect.toString.call(result).slice(8, -1).toLowerCase();
//     return ['object', 'array'].includes(type);
//   } catch (err) {
//     return false;
//   }
// }

// // 校验规则: 输入不为空
// export const validateEmpty: ValidatorFn = (rule, value, callback) => void) => {
//   if (_.isNil(value) || (_.isString(value) && (_.isEmpty(value) || _.trim(value) === ''))) {
//     callback(new Error($t('form.inputNotEmpty')));
//   } else {
//     callback();
//   }
// };

// // 校验规则: 邮箱地址
// export const validateEmail: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.email.test(value)) {
//     callback(new Error($t('form.email') + $t('form.formatError')));
//   } else {
//     callback();
//   }
// };

// // 校验规则: 手机号码
// export const validatePhone: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.phone.test(value)) {
//     callback(new Error($t('form.phone') + $t('form.formatError')));
//   } else {
//     callback();
//   }
// };

// // 校验规则: IP地址
// export const validateIp: ValidatorFn = (rule, value, callback) => {
//   const pass = ipRegex.v4({ exact: true }).test(value) || ipRegex.v6({ exact: true }).test(value);
//   if (!value) {
//     callback();
//   } else if (!pass) {
//     callback(new Error(`IP ${$t('form.formatError')}`));
//   } else {
//     callback();
//   }
// };

// // 校验规则: IPV4地址
// export const validateIpv4: ValidatorFn = (rule, value, callback) => {
//   const pass = ipRegex.v4({ exact: true }).test(value);
//   if (!value) {
//     callback();
//   } else if (!pass) {
//     callback(new Error(`IP ${$t('form.formatError')}`));
//   } else {
//     callback();
//   }
// };

// // 校验规则: IPV6地址
// export const validateIpv6: ValidatorFn = (rule, value, callback) => {
//   const pass = ipRegex.v6({ exact: true }).test(value);
//   if (!pass) {
//     callback(new Error(`IP ${$t('form.formatError')}`));
//   } else {
//     callback();
//   }
// };

// // 校验规则: IP地址范围
// export const validateIpRange: ValidatorFn = (rule, value, callback) => {
//   let pass = false;
//   if (_.isString(value)) {
//     const [ip, range] = value.split('/');
//     const isIp = ipRegex.v4({ exact: true }).test(ip);
//     const isRange = +range > 0 && +range < 32;
//     if (isIp && isRange) pass = true;
//   }
//   if (!pass) {
//     callback(new Error('IP范围格式错误, 格式形如: 192.168.1.1/24'));
//   } else {
//     callback();
//   }
// };

// // 校验规则: IP地址范围/单个IP
// export const validateIpOrIpRange: ValidatorFn = (rule, value, callback) => {
//   let pass = false;
//   if (_.isString(value)) {
//     if (_.includes(value, '/')) {
//       const [ip, range] = value.split('/');
//       const isIp = ipRegex.v4({ exact: true }).test(ip);
//       const isRange = +range > 0 && +range < 32;
//       if (isIp && isRange) pass = true;
//     } else {
//       const isIp = ipRegex.v4({ exact: true }).test(value);
//       if (isIp) pass = true;
//     }
//   }
//   if (!pass && value) {
//     callback(new Error('IP格式错误, 格式形如: 192.168.1.1 或 192.168.1.1/24'));
//   } else {
//     callback();
//   }
// };
// function checkIPSection(ip: string) {
//   const reg1 =
//     /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
//   const reg2 =
//     /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}((\/(3[0-2]|[1-2][0-9]|[1-9]))|(-(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2}))){0,1}$/;
//   if (ip.includes(',')) {
//     const valdata = ip.split(',');
//     let count = 0;
//     _.forEach(valdata, (_val) => {
//       if (!reg1.test(_val)) {
//         count++;
//       }
//     });
//     if (count === 0) {
//       return true;
//     }
//   } else if (reg2.test(ip)) {
//     return true;
//   }
//   return false;
// }
// // 校验ip段
// export const validateIPSection: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('请输入 IP 地址'));
//   }
//   const pass = checkIPSection(value);
//   if (!pass) {
//     return callback(new Error('IP 地址格式不正确'));
//   }
//   callback();
// };
// // 校验规则: 合法端口
// export const validatePort: ValidatorFn = (rule, value, callback) => {
//   const _val = +value;
//   const [PORT_START, PORT_END] = [1, 65535];
//   const notPass = _.isNaN(_val) || !_.isInteger(_val) || _val < PORT_START || _val > PORT_END;
//   if (notPass) {
//     callback(new Error($t('form.portRangeError')));
//   } else {
//     callback();
//   }
// };
// /**
//  * 检测数字 n 是否在一定范围内, 包含结尾值
//  * @param {number} n 检测数字
//  * @param {number} start 起始位置
//  * @param {number | null} end 结束位置
//  * @return {boolean} 是否在其范围内
//  */
// const inRange = (n: number, start: number, end?: number | null) => {
//   if (end && start > end) [end, start] = [start, end];
//   return end == null ? n >= 0 && n <= start : n >= start && n <= end;
// };

// /**
//  * 检测密码强度是否合格, 包含大写字母、小写字母、数字、特殊字符中的三种且长度至少为8位
//  * @param {string} pwd 密码
//  * @return {boolean} 是否合格
//  */
// export const pwdStrong = (pwd: string) => {
//   let flag = false;
//   if (!pwd) return flag;
//   const arr = pwd.split('');
//   const strong = {
//     lowerCase: false,
//     upperCase: false,
//     number: false,
//     special: false,
//   };
//   arr.forEach((char: string) => {
//     const code = char.charCodeAt(0);
//     if (inRange(code, 48, 57)) {
//       // 数字
//       strong.number = true;
//     } else if (inRange(code, 65, 90)) {
//       // 大写
//       strong.upperCase = true;
//     } else if (inRange(code, 97, 122)) {
//       // 小写
//       strong.lowerCase = true;
//     } else {
//       // 其它字符
//       strong.special = true;
//     }
//   });
//   const { length: strongLength } = Object.values(strong).filter((val) => val);
//   const { length: pwdLength } = arr;
//   flag = strongLength >= 3 && pwdLength >= 8;
//   return flag;
// };

// export const validatePasswordStrong: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback(new Error($t('form.inputNotEmpty')));
//   } else if (!pwdStrong(value)) {
//     callback(new Error($t('form.pwdNotStrong')));
//   } else {
//     callback();
//   }
// };

// export const validatePlainPassword =
//   (formRef: Ref<FormInstance> | any, formData: { confirmPassword: string }, strong = true) =>
//   (rule: any, value: any, callback: any) => {
//     if (!value) {
//       callback(new Error($t('form.inputNotEmpty')));
//     } else if (formData.confirmPassword !== '') {
//       formRef.value?.validateField('confirmPassword');
//       callback();
//     } else if (strong && !pwdStrong(value)) {
//       callback(new Error($t('form.pwdNotStrong')));
//     } else {
//       callback();
//     }
//   };

// export const validateConfirmPassword =
//   (formRef: Ref<FormInstance> | any, formData: { plainPassword: string }, strong = true) =>
//   (rule: any, value: any, callback: any) => {
//     if (!value) {
//       callback(new Error($t('form.inputNotEmpty')));
//     } else if (value !== formData.plainPassword) {
//       callback(new Error($t('form.pwdTwoInputNotEq')));
//     } else if (strong && !pwdStrong(value)) {
//       callback(new Error($t('form.pwdNotStrong')));
//     } else {
//       callback();
//     }
//   };

// // 校验规则: 字符串长度
// export const validateStrLength =
//   (min: number, max: number) => (rule: any, value: any, callback: any) => {
//     if (_.isNil(value) || (_.isString(value) && (_.isEmpty(value) || _.trim(value) === ''))) {
//       callback(new Error($t('form.inputNotEmpty')));
//     } else if (value.length < min || value.length > max) {
//       let msg = `输入字符串长度不低于${min}位`;
//       if (max && max > min) msg += `, 且不超过${max}位`;
//       callback(new Error(msg));
//     } else {
//       callback();
//     }
//   };

// // 校验规则: 数字大小范围
// export const validateNumRange =
//   (min: number, max: number) => (rule: any, value: any, callback: any) => {
//     if (_.isNil(value) || (_.isString(value) && (_.isEmpty(value) || _.trim(value) === ''))) {
//       callback(new Error($t('form.inputNotEmpty')));
//     } else if (!inRange(value, min, max)) {
//       let msg = `输入值区间 ${min} ~ ${max}`;
//       if (_.isNil(min) && !_.isNil(max)) {
//         msg = `最大输入值 ${max}`;
//       }
//       if (!_.isNil(min) && _.isNil(max)) {
//         msg = `最小输入值 ${min}`;
//       }
//       callback(new Error(msg));
//     } else {
//       callback();
//     }
//   };

// // 校验规则: 字母,数字,下划线,减号

// export const validateName: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.username.test(value)) {
//     callback(new Error('只允许输入字母、数字、下划线和减号'));
//   } else {
//     callback();
//   }
// };
// // 校验规则: 数字、字母、下划线
// export const validateNameType2: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.nameType2.test(value)) {
//     callback(new Error('只允许输入英文字母、数字、下划线'));
//   } else {
//     callback();
//   }
// };
// // 校验规则: 子网掩码
// export const validateSubnetMask: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.subnetMask.test(value)) {
//     callback(new Error('子网掩码格式不正确'));
//   } else {
//     callback();
//   }
// };

// export const validateLetterAndNumber: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
//     callback(new Error('只允许输入字母和数字(大写字母、小写字母和数字)'));
//   } else {
//     callback();
//   }
// };

// export const validateMac: ValidatorFn = (rule, value, callback) => {
//   if (!value) {
//     callback();
//   } else if (!regex.mac.test(value)) {
//     callback(new Error(`MAC ${$t('form.formatError')}`));
//   } else {
//     callback();
//   }
// };

// export const validateUrl: ValidatorFn = (rule, value, callback) => {
//   const url =
//     /^(http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:\d{0,5})?(\/.*)?$/;
//   const ipAndPort = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(:\d{1,5})?\/?$/;
//   if (!value) {
//     callback();
//   } else if (!url.test(value) && !ipAndPort.test(value)) {
//     callback(new Error('网址格式不正确, 请输入以 http:// 或 https:// 开头的网址'));
//   } else {
//     callback();
//   }
// };

// // 校验规则: JSON 格式
// export const validateJson: ValidatorFn = (rule, value, callback) => {
//   if (!isJson(value)) {
//     callback(new Error('JSON 格式不正确'));
//   } else {
//     callback();
//   }
// };

// // 校验规则：域名
// export const validateDomain: ValidatorFn = (rule, value, callback) => {
//   const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
//   if (!value) {
//     callback();
//   } else if (!reg.test(value)) {
//     callback(new Error('域名格式不正确'));
//   } else {
//     callback();
//   }
// };

// // 校验规则：正整数和0
// export const validateNonnegative: ValidatorFn = (rule, value, callback) => {
//   if (/^([0]|[1-9][0-9]*)$/.test(value) === false) {
//     callback(new Error('请输入一个正确的数值'));
//   } else {
//     callback();
//   }
// };

// // 校验规则：整数和浮点数
// export const validateInterAndFloat: ValidatorFn = (rule, value, callback) => {
//   const reg = /^(-?\d+)(\.\d+)?$/;// ^[1-9]\d*$
//   if (!value) {
//     callback();
//   } else if (!reg.test(value)) {
//     callback(new Error('匹配数值类型，包括整数和浮点数'));
//   } else {
//     callback();
//   }
// };
// // 校验规则：非零数字
// export const validateNonZeroDigit: ValidatorFn = (rule, value, callback) => {
//   const reg = /^[1-9]\d*\.?\d*$/;
//   if (!value) {
//     callback();
//   } else if (!reg.test(value)) {
//     callback(new Error('请输入一个正确的数值'));
//   } else {
//     callback();
//   }
// };
// // 判断是否为IP字段
// export function isFieldIP(ip: string) {
//   ip = _.escape(ip);
//   let _ip = ip;
//   if (_ip?.includes(')')) {
//     const reg = /(?<=\()(.+?)(?=\))/g;
//     _ip = _ip?.match(reg)?.[0] ?? '';
//   }
//   if (_ip?.includes(':')) {
//     _ip = _ip.substr(0, _ip.indexOf(':'));
//   }

//   const reg =
//     /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
//   return reg.test(_ip);
// }
