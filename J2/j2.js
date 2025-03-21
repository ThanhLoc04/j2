const axios = require('axios');
const CryptoJS = require('crypto-js');

const J2DOWN_SECRET =
  'U2FsdGVkX18wVfoTqTpAQwAnu9WB9osIMSnldIhYg6rMvFJkhpT6eUM9YqgpTrk41mk8calhYvKyhGF0n26IDXNmtXqI8MjsXtsq0nnAQLROrsBuLnu4Mzu63mpJsGyw';

const headers = {
  'Content-Type': 'application/json',
  token: 'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJxxx',
};

async function getAioJ2(data) {
  const response = await axios.post(
    'https://api.zm.io.vn/v1/social/autolink',
    { data },
    { headers }
  );
  return response.data;
}

function randomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function secretKey() {
  const decrypted = CryptoJS.AES.decrypt(J2DOWN_SECRET, 'manhg-api');
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryptData(data) {
  const key = CryptoJS.enc.Hex.parse(secretKey());
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    k: randomString(11) + '8QXBNv5pHbzFt5QC',
    r: 'BRTsfMmf3CuN',
    encryptedData: encrypted.toString(),
  };
}
module.exports = { getAioJ2, encryptData };