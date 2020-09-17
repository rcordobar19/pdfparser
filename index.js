const fs = require('fs');
const pdf = require('pdf-parse');
const util = require('util');
// TODO: Auto Detect pdf files and loop over them.
let dataBuffer = fs.readFileSync('./pdf/dummy.pdf');

pdf(dataBuffer).then(function (data) {
    var info = data.text;
    var email = info.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

    // exclutions
    // TODO: Make exclutions an array.
    var arr = [];
    // arr = email.filter(e => e !== 'dap@mybusinessmatches.com');
    // arr = arr.filter(e => e !== 'michal@mybusinessmatches.com');
    // arr = arr.filter(e => e !== 'no-reply@amazonaws.com');
    // arr = arr.filter(e => e !== 'no-reply@sns.amazonaws.com');

    const uniqueSet = new Set(arr);
    const emails = [...uniqueSet];

    fs.appendFileSync("emails.txt", emails, "UTF-8", { 'flags': 'a+' });
});
