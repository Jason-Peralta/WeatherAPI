let express = require('express');
const { MongoClient } = require("mongodb");
const {connect} = require("mongodb/lib/operations/connect");
const {mongoS} = require("./private");
let router = express.Router();
const connectionString = mongoS;


/* GET users listing. */
router.get('/:state', function(req, res, next) {
    let state = req.params.state;
    let query = req.query;

    MongoClient.connect(connectionString , function (err, client) {
        if (err) throw err
        let db = client.db('weather')

        db.collection(state).find(query)
        .toArray(function (err, result) {
            res.header('Access-Control-Allow-Origin', ['*']);
            if (err) throw err

            console.log(result)
            res.send(result);
        })
    })
});

module.exports = router;
