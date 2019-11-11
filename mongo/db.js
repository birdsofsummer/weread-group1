const moment=require('moment')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const CONFIG=process.env

const conn=async ({db_url,db,table}=CONFIG)=>{
    const mc = await mongoClient.connect(db_url,{useNewUrlParser: true})
    return mc.db(db).collection(table)
}

async function getConnectionIdList() {
    let c=await conn()
    let d=await c.find().toArray()
    return d;
}

async function record_connectionID(connectionID) {
      log(connectionID);
      let d={ connectionID,"Date":now()}
      let c=await conn()
      return c.insertOne(d)
}

async function deleteConnectionId(connectionID) {
      let c=await conn()
      return c.deleteOne({connectionID})
}

const del_all_cid=async ()=>{
      let c=await conn()
      return c.deleteMany()
}


module.exports= {
    conn,
    getConnectionIdList,
    record_connectionID,
    deleteConnectionId,
    del_all_cid,
}


