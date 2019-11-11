'use strict';
const MongoClient = require("mongodb").MongoClient;
const {db_url}=process.env

exports.main_handler = async (event, context, callback) => {
    const mc = await MongoClient.connect(url,{useNewUrlParser: true})
    const db = mc.db('test')
    const collection = db.collection('test')
    await collection.insertOne({a:1,something:'123'})
    const as = await collection.find().toArray()
    console.log(as)
    mc.close()
    return as
}

/*
  c._findAndModify
  c.aggregate
  c.bulkWrite
  c.collectionName
  c.count
  c.countDocuments
  c.createIndex
  c.createIndexes
  c.dbName
  c.deleteMany
  c.deleteOne
  c.distinct
  c.drop
  c.dropAllIndexes
  c.dropIndex
  c.dropIndexes
  c.ensureIndex
  c.estimatedDocumentCount
  c.find
  c.findAndModify
  c.findAndRemove
  c.findOne
  c.findOneAndDelete
  c.findOneAndReplace
  c.findOneAndUpdate
  c.geoHaystackSearch
  c.getLogger
  c.group
  c.hint
  c.indexExists
  c.indexInformation
  c.indexes
  c.initializeOrderedBulkOp
  c.initializeUnorderedBulkOp
  c.insert
  c.insertMany
  c.insertOne
  c.isCapped
  c.listIndexes
  c.mapReduce
  c.namespace
  c.options
  c.parallelCollectionScan
  c.reIndex
  c.readConcern
  c.remove
  c.removeMany
  c.removeOne
  c.rename
  c.replaceOne
  c.save
  c.stats
  c.update
  c.updateMany
  c.updateOne
  c.watch
  c.writeConcern
*/
