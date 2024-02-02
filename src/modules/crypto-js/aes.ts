// 加解密
import CryptoJS from 'crypto-js';

/* 
AES密钥的长度可以是128位（16字节）、192位（24字节）或256位（32字节），
分别对应AES-128、AES-192和AES-256三种加密级别。
在实际应用中，AES-128已足够满足大多数安全需求。, 一般为16字节
 */

// 十六位十六进制数作为 密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('abcde12345sdfgva');
// 十六位十六进制数作为 偏移量
const iv = CryptoJS.enc.Utf8.parse('1213aabcdef12345678');

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
export const encrypt = (data: string) => {
  // 将字符串转换为Utf8编码
  const srcs = CryptoJS.enc.Utf8.parse(data);
  // 使用AES加密，使用SECRET_KEY作为秘钥，iv作为初始向量，CBC模式，Pkcs7填充
  const encrypted = CryptoJS.AES.encrypt(srcs, SECRET_KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 返回加密后的字符串
  return encrypted.ciphertext.toString();
};

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export const decrypt = (data: string) => {
  // 将data转换为16进制字符串
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  // 将16进制字符串转换为base64字符串
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  // 使用AES解密
  const decrypted = CryptoJS.AES.decrypt(srcs, SECRET_KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 将解密后的字符串转换为Utf8编码
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  // 返回解密后的字符串
  return decryptedStr.toString();
}

/* 

import {encrypt ,decrypt} from '@/modules/crypto-js/aes'
const encryptText  = encrypt('123')
console.log(encryptText,'加密')
const decryptText = decrypt(encryptText)
console.log(decryptText,'解密')
*/


