//Models Serve to the DB and get from the DB
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'lists';

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
  This function adds a new list to the db as well puts the ID of the list on the
  user document for the user adding it. 

  @Inputs
    userID           = ID of at least one list this todo is stored on (can add more than one later)
    data             = The content stored on this list
*/
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

/*
  Updates the list with the given id, and inputs the data (not complete)
  @Params
    id = The ID of the object we are editing
    data = The content we are trying to edit
  
  Need to upload entire list to db otherwise data could get written over. (e.g. if
  data.name = 'undefined' then it will overwrite the data currently being stored)
*/
exports.update = (id, data, callback) => {
  mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
      name   : data.name,
      todoIDs: data.todoIDs,
      labels : data.labels,
  }}, (err) => {
    callback(err);
  });
};

/*
  This method deletes a list and a corresponding list of todos
  @Params
    id   = id of the list to delete'
    data = variable for store an array (data.todoIds) of all todos to delete.
  
  note that this function was designed so that the client would decide what todos to delete.
*/
exports.delete = (id, data, callback) => {
  mongo.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
    callback(err);
  });

  // Delets array of todos
  var i;
  for(i = 0; i < data.todoIDs.length; i++){
    mongo.getDb().collection('todos').deleteOne({ _id: ObjectId(data.todoIDs[i])}, (err) => {
      callback(err);
    });
  }
};

exports.all = (callback) => {
  mongo.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};