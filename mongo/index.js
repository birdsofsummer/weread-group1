//'use strict';
const MongoClient = require("mongodb").MongoClient;

const {Router,compose}=require("../router")
const CONFIG=process.env

class Db{
    constructor({client,db,col}){
        this.client=client
        this.db=client.db(db)
        this.collection=this.db.collection(col)
    }
    insert(d={}){
        return this.collection.insertOne(d)
    }
    list(){
        return this.collection.find().toArray()
    }
}

const conn=async (config)=>{
    const client = await MongoClient.connect(config.url,{useNewUrlParser: true})
    return new Db({client,...config})
}


const list=async()=>{
    let coll=await conn(CONFIG)
    return await coll.list()
}

exports.main_handler = async (event, context, callback) => {
    // "accept,content-length,content-type,host,user-agent,x-anonymous-consumer,x-qualifier"
  const {body,
         headerParameters,
         headers,
         httpMethod,
         path,
         pathParameters,
         queryString,
         queryStringParameters,
         requestContext
    }=event;
    const r=new Router()

    let ctx={body,path,httpMethod,queryString}
    const trim=(ctx,next)=>{
         path=ctx.path.replace("/mongo","")
         ctx.path=path||"/"
         next();
    }
    r.use(trim)
    r.get('/',list)
    r.post("/",add)
    r.put("/",update)
    r.delete("/",del)
}

  //return await  test()
}



/*

    curl https://service-d6p7no2y-1252957949.ap-hongkong.apigateway.myqcloud.com/release/mongo
 */

