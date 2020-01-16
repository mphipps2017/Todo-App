/*
    This model is for handling HTTP requests that deal with Flash Notes
    Similar to Sticky Notes they are designed around being quick reminders posted
    to your 'wall'
*/
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'flashNotes';

/*
  Input (id, callback)
  Output (The object stored in the database with the given ID)
*/
exports.get = (id, callback) => {
    mongo.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
      callback(err, result);
    });
};

/*
  This function adds a new note to the MDB collection

  @Inputs
    userID           = ID of at least one list this todo is stored on (can add more than one later)
    data             = The content stored on this list
*/
exports.add = (userId, data, callback) => {
  const date = new Date().getTime();
  insertData = {
    name  : data.name,
    note  : [],
    labels: [],
  }
  // This part puts the ID of the list into the user's account
  mongo.getDb().collection(collectionName).insertOne(insertData, (err, res) => {
    mongo.getDb().collection('users').updateOne({ _id: ObjectId(userId) }, {$push:{
        fNoteIDs: insertData._id,
    }});
  });
};

/*
  Updates the flash note with the given ID
  @Params
    id = The ID of the object we are editing
    data = The content we are trying to edit
  
  Need to upload entire document to db otherwise data could get written over. (e.g. if
  data.name = 'undefined' then it will overwrite the data currently being stored)
*/
exports.update = (id, data, callback) => {
mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
        name  : data.name,
        note  : data.note,
        labels: data.labels,
    }}, (err) => {
        callback(err);
    });
};

//Decide what to do with todo children of this list
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