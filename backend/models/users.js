//Models Serve to the DB and get from the DB
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'users';

exports.get = (id, callback) => {
    mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
        callback(err, result);
    });
};

exports.add = (data, callback) => {
    mongo.getDb().collection(collectionName).insertOne({
        username: data.username,
        password: data.password,
        listIDs : [],
    }, function(err, res) {
        if (err) throw err;
    });
};

// The lists object will contain all the lists on this user's account
exports.update = (id, data, callback) => {
    mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
        username: data.username,
        password: data.password,
        listIDs : [],
    }}, (err) => {
        callback(err);
    });
};

exports.delete = (id, callback) => {
    mongo.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
        callback(err);
    });
};

exports.all = (callback) => {
    mongo.getDb().collection(collectionName).find().toArray((err, result) => {
        callback(err, result);
    });
};