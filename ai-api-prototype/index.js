'use strict';

const axios = require('axios');
const Hapi = require('@hapi/hapi');

let deepai = require('./deepai');
let toxicity = require('./toxicity');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    //ROUTES

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'POST',
        path: '/result',
        handler: async function (request, h) {
            let result = await getResults(request.payload.text);
            return result;
        },
        options: {
            payload: {
                multipart: true
            },
            cors: {
                    origin: ['*']
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// this is the function that uses two other api's to get results for english texts.
// async function getOldResults(text) {
//     let res = {
//         text: text,
//         deepai: await deepai.result(text),
//         toxicity: await toxicity.result(text)
//     };

//     return res;
// }


// this function uses my own python api & model to get results for dutch texts.
async function getResults(txt) {

        let result = {
            output: '',
            text: txt
        };

        await axios.post('http://127.0.0.1:5000/getResult', {
            text: txt
        }).then(function (res) {
            result.output = res.data;
        });

    return result;
}


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();