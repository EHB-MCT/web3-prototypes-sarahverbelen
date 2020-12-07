'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:prototypeAdmin@prototype.igxsj.gcp.mongodb.net/prototype?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const init = async () => {

    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/multiply', 
        handler: (request, h) => {
            let nr = request.query.number;
            return {result: nr * nr};
        }
    });

    server.route({
        method: 'GET',
        path: '/index',
        handler: (request, h) => {
            return h.file('index.html');
        }
    });

    server.route({
        method: 'POST',
        path: '/save',
        handler: (request, h) => {
            client.connect(err => {
                const collection = client.db("prototype").collection("test");
                collection.insertOne(request.payload, function() {
                    client.close();
                    return {saved: request.payload};
                });
                
              });
        }
    });

    await server.start();
    console.log('server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();