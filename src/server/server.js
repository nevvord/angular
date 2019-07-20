const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var cors = require('cors');

const   url = 'mongodb://localhost:27017',
        dbName = 'testWork';

let Server = express(), db;

Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({extended: true}));
Server.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
}));

Server.options('*', cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
  }));
  
Server.use(cors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200
  }));
  
Server.use(bodyParser.json({limit: '100mb',  parameterLimit:100000}));

Server.get('/', (req, res) => {
    res.send('Hello API');
});



Server.get('/users', (req, res) => {
    db.collection('users').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

Server.get('/user/:id', (req, res) => {
    db.collection('users').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

Server.post('/addNewUser', (req, res) => {
    var user = {
        name : req.body.name,
        lastName: req.body.lastName,
        date: req.body.date,
        phoneNum: req.body.phoneNum,
        mail: req.body.mail,
        postDate: new Date()
    };

    db.collection('users').insert(user, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result.ops);
        console.log(result.ops);
        
    });
});

Server.put('/work/:id', (req, res) => {
    db.collection('works').updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: { title: req.body.title, miniWork: req.body.miniWork } },
        { upsert: true },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(200);
        }
    );
});

Server.put('/userChange/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
      
    db.collection('users').updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set:  {name : req.body.name, lastName: req.body.lastName, date: req.body.date, phoneNum: req.body.phoneNum, mail: req.body.mail}  },
        { upsert: true },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(200);
        }
    );
});

Server.delete('/user/:id', (req, res) => {
    db.collection('users').deleteOne(
        { _id: new ObjectID(req.params.id) },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
});

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    db = client.db(dbName);
    
    Server.listen(3012, () => {
        console.log("API STARTED");
    });
});