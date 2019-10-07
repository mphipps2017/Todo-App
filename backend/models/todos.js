//Models Serve to the DB and get from the DB
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'todos';

exports.get = (id, callback) => {
    mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
      callback(err, result);
    });
};

// This function will add a todo to the database
exports.add = (listId, data, callback) => {
    const date = new Date().getTime();
    insertData = {
        content: data.content,
        complete: false,
        completionDate: null,
        creationDate: date
    }
    // This part puts the ID of the Todo on the specified list
    mongo.getDb().collection(collectionName).insertOne(insertData, (err, res) => {
        mongo.getDb().collection('lists').updateOne({ _id: ObjectId(listId) }, {$push:{
            todoIds: insertData._id,
        }});
    });
};

exports.update = (id, data, callback) => {
  mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
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