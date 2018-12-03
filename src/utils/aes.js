import * as CryptoJS from 'crypto-js';

/*AES加密*/
export function encrypt(data) {
    let AES_KEY = CryptoJS.enc.Utf8.parse("AZB_AES_PASSWORD");
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let encrypted = CryptoJS.AES.encrypt(sendData, AES_KEY,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
