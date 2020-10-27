const deepai = require('deepai');

deepai.setApiKey('b77f1d21-18a3-4c93-afe6-6b967ecb9517');

async function result(text) {
    let res = await deepai.callStandardApi("sentiment-analysis", {
        text: text,
    });

    return res;
}

// exports.result = text => {
//     let res = deepai.callStandardApi("sentiment-analysis", {
//         text: text,
//     });

//     return res;
// }

exports.result = result;