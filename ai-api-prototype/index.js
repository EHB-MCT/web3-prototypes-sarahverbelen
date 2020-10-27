'use strict';

const Hapi = require('@hapi/hapi');

let deepai = require('./deepai');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
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
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

async function getResults(text) {
    let res = {
        text: text,
        deepai: await deepai.result(text)
    };

    return res;
}


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();