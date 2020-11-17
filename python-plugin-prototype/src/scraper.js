const axios = require('axios');

console.log("scraper running!");

axios.post('http://127.0.0.1:5000/getH3', {
    text: json(document.documentElement.innerHTML)
}).then(function (res) {
    console.log(res.data);
});