//Models Serve to the DB and get from the DB
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'lists';

exports.get = (id, callback) => {
    mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
      callback(err, result);
    });
};

exports.add = (userId, data, callback) => {
  const date = new Date().getTime();
  insertData = {
  name   : data.name,
  todoIDs: [],
  labels : [],
}
  // This part puts the ID of the list into the user's account
  mongo.getDb().collection(collectionName).insertOne(insertData, (err, res) => {
    mongo.getDb().collection('users').updateOne({ _id: ObjectId(userId) }, {$push:{
      listIDs: insertData._id,
    }});
  });
};

exports.update = (id, data, callback) => {
  mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
      name   : data.name,
      todoIDs: [],
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