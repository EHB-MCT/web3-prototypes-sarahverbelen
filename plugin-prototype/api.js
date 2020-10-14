let restify = require('restify');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:prototypeAdmin@prototype.igxsj.gcp.mongodb.net/prototype?retryWrites=true&w=majority";
//const client = new MongoClient(uri);

// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




function save(req, res, next) {
    MongoClient.connect(uri, function(err, client) {
        const collection = client.db("prototype").collection("worldnews");
        // perform actions on the collection object
        collection.insertOne(req.body, function () {
            console.log(req.body);
            client.close();
            res.send({
                saved: req.body
            });
            next();
        });
        
        client.close();
      });

   
};

function getAll(req, res, next) {
    MongoClient.connect(uri, function(err, client) {
        const collection = client.db("prototype").collection("worldnews");
        collection.find().toArray().then(items => {
            res.send(items);
            client.close();
            next();
        }).catch(err => {
            console.error(`Failed to find documents: ${err}`);
            next()
        });
        client.close();
    });
}

let server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

server.post('/save', save);
server.get('/all', getAll);


server.listen(8000, function () {
    console.log('%s listening at %s', server.name, server.url);
});