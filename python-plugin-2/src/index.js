// this is the background script that will need to be compiled in order to use npm packages.
const axios = require('axios');

console.log("scraper running!");

axios.post('http://127.0.0.1:5000/getH3', {
    html: document.documentElement.innerHTML
}).then(function (res) {
    console.log(res.data);
});