const fs = require('fs');
const qrcode = require('qrcode');

function main(args) {
  return qrcode.toDataURL(args.text).then(res => ({
    headers:  { 'content-type': 'text/html; charset=UTF-8' },
    body: args.img == undefined ? res : `<img src="${res}">`
  }))
}

if (process.env.TEST) main({text:"hello"}).then(console.log)

exports.main = main
