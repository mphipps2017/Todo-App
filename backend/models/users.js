//Models Serve to the DB and get from the DB
// https://codeforgeek.com/password-hashing-nodejs/ Password hashing guide
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'users';
const listsmodel = require('./lists.js');

exports.get = (id, callback) => {
    mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
        callback(err, result);
    });
};

exports.add = (data, callback) => {
    bcrypt.hash(data.password, 10, function(err, hash){
        mongo.getDb().collection(collectionName).insertOne({
            username : data.username,
            password : hash,
            listIDs  : [],
            fNoteIDs : [],
            labels   : [],
        }, function(err, res) {
            if (err) throw err;
        });
    });
};

// The lists object will contain all the lists on this user's account
exports.update = (id, data, callback) => {
    if(data.password != 'undefined'){
        bcrypt.hash(data.password, 10, function(err, hash){
            mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
                password : hash,
            }}, (err) => {
                callback(err);
            });
        });
    }
    else{
        mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
            username : data.username,
            password : data.password,
            listIDs  : [],
            fNoteIDs : [],
            labels   : [],
        }}, (err) => {
            callback(err);
        });
    }
};

// Should delete all lists and todos that are involved with this user
exports.delete = (id, data, callback) => {
    // Delets the user
    mongo.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
        callback(err);
    });

    // Deletes all Flash notes associated with this user
    var i;
    for(i = 0; i < data.fNoteIDs.length; i++){
        mongo.getDb().collection('flashNotes').deleteOne({ _id: ObjectId(data.fNoteIDs[i])}, (err) => {
          callback(err);
        });
    }

    // Deletes all todos and todo lists associated with this user
    var j;
    for(j = 0; j < data.listIDs.length; j++){
        mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
            // Todo get todos of every list and delete those as well
            listsmodel.delete(data.listIDs[j], result, (err) => {
                if (err) return next(err);
                res.json({ success: true });
            });
            callback(err, result);
        });
    }

};

exports.all = (callback) => {
    mongo.getDb().collection(collectionName).find().toArray((err, result) => {
        callback(err, result);
    });
};