let express = require('express');
const { MongoClient } = require("mongodb");
const {connect} = require("mongodb/lib/operations/connect");
const {mongoS} = require("./private");
let router = express.Router();
const connectionString = mongoS;

//'State' Means location of airport.
/* GET users listing. */
router.get('/:state', function(req, res, next) {
    let state = req.params.state;
    let queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, rOperator => `$${rOperator}`);

    //act
    MongoClient.connect(connectionString , function (err, client) {
        if (err) throw err
        let db = client.db('weather')
//{"actual_max_temp":{"$eq":"104"}}
        db.collection(state).find(JSON.parse(queryStr))
        .toArray(function (err, result) {
            res.header('Access-Control-Allow-Origin', ['*']);
            if (err) throw err

            console.log(result)
            res.send(result);
            console.log(queryStr)
        })
    })
});

module.exports = router;
