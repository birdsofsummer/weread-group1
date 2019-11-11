
const MongoClient = require("mongodb").MongoClient;

const {CONFIG}=process.env


class Db{
    constructor({client,db,table}){
        this.client=client
        this.db=client.db(db)
        this.collection=this.db.collection(table)
    }
    insert(d={}){
        return this.collection.insertOne(d)
    }
    list(){
        return this.collection.find().toArray()
    }
}

const conn=async (config)=>{
    const client = await MongoClient.connect(config.db_url,{useNewUrlParser: true})
    return new Db({client,...config})
}


const list=async()=>{
    let coll=await conn(CONFIG)
    return coll.list()
}

const insert=async(d)=>{
    let coll=await conn(CONFIG)
    return coll.insert(to_json(d))
}


exports.main_handler = {
    conn,
    list,

}
