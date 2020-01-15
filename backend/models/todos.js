//Models Serve to the DB and get from the DB
const ObjectId = require('mongodb').ObjectId;

const mongo = require('../helpers/mongoUtil.js');

const collectionName = 'todos';

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
  This function adds a new todo to the db as well puts the ID of the todo on the
  list it is being added to. 

  @Inputs
    listId           = ID of at least one list this todo is stored on (can add more than one later)
    data             = The content stored on this todo
    parentCollection = the collection where the parent document is located
  
*/
exports.add = (listId, data, callback) => {
    const date = new Date().getTime();
    insertData = {
        content: data.content,
        complete: false,
        completionDate: null,
        creationDate: date,
        todoIds: [], // These are sub todos for this todo (like a sub list)
    }
    // This part puts the ID of the Todo on the specified list
    mongo.getDb().collection(collectionName).insertOne(insertData, (err, res) => {
        mongo.getDb().collection(data.parentCollection).updateOne({ _id: ObjectId(listId) }, {$push:{
            todoIds: insertData._id,
        }});
    });
};

/*
  Updates the todo with the given id, and inputs the data (not complete)
  @Params
    id = The ID of the object we are editing
    data = The content we are trying to edit
  
  If data.complete != undefined (updates it based on if it == 'true')
  otherwise the function updates data.content (even if data.content == 'undefined')
*/
exports.update = (id, data, callback) => {
  if(data.complete != undefined){
    mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
        complete: data.complete == 'true',
      }}, (err) => {
        callback(err);
      });
    }
  else{
    mongo.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {$set:{
        content: data.content,
      }}, (err) => {
        callback(err);
    });
  }
};

//TODO Update use mdb $pull
// https://docs.mongodb.com/manual/reference/operator/update/pull/
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