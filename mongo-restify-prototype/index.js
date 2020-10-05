let restify = require('restify');
let fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:prototypeAdmin@prototype.igxsj.gcp.mongodb.net/prototype?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



function multiply(req, res, next) {
    let query = req.query;
    let nr = query.number;
    let result = {result: nr * nr};
    res.send(result);
    next();
}

function returnIndex(req, res, next) {
   fs.readFile('./public/index.html', 'utf8', function (err, file) {
        if(err) { // if there is an error with reading the file, return an errorcode
            res.send(500);
            next();
        }

        // if there is no error
        res.writeHead(200, { // write the head: so that it knows that it has to send html
            'Content-Length': Buffer.byteLength(file),
            'Content-Type': 'text/html'
          });
          res.write(file); // then write the html
          res.end(); // and end the response

   });
}

function save(req, res, next) {
    client.connect(err => {
        const collection = client.db("prototype").collection("test");
        collection.insertOne(req.body, function() {
            client.close();
            res.send({saved: req.body});
            next();
        });
        
      });
};

let server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.get('/index', returnIndex);
server.get('/multiply', multiply);

server.post('/save', save);


server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});