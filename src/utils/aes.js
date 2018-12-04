var CryptoJS = require("crypto-js");


/*AES加密*/
export function encrypt(word) {
    // console.log(word);
    var key = CryptoJS.enc.Utf8.parse('AZB_AES_PASSWORD');
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    // console.log(encrypted.toString())
    return encrypted.toString();
}
