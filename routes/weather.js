let express = require('express');
const { MongoClient } = require("mongodb");
const {connect} = require("mongodb/lib/operations/connect");
const {mongoS} = require("./private");
let router = express.Router();
const connectionString = mongoS;


/* GET users listing. */
router.get('/', function(req, res, next) {
    let state = req.query.state;
    MongoClient.connect(connectionString , function (err, client) {
        if (err) throw err
        let db = client.db('weather')
        db.collection(state).find()
        .toArray(function (err, result) {
            res.header('Access-Control-Allow-Origin', ['*']);
            if (err) throw err

            console.log(result)
            res.send(result);
        })
    })
});

module.exports = router;
