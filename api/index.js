//'use strict';

const R=require("ramda")
const {
    to_json,
    res_json,
    res_proxy,
}=require("../fp")


const {
    vid2zudui,
    add_info,
} =require("../vid")

const {
    posts,
    post_form,
    proxy,
}=require("../ajax")


const {get_song1,get_song2} = require("../music/qq_music")
const jeff=require("../music/jeff1")

const {
    conn,
    list,
}=require("./mongo")

const get_token=async ({code})=>{
    const weibo=require("../weibo/api.js")
    if (!code) return {}
    const token=await post_form(weibo({code}).token)
    return token
}

const sync=async (d=[])=>{
   const url2req=(u)=>[
             {url: "http://africanchief.cn/weReader/addShareUrl", data:{"shareUrl":u,"activityType":"1"} },
             {url:"https://weread.qnmlgb.tech/submit", data: {"url":u}},
    ]
    let req=R.flatten(d.map(vid2zudui).map(url2req))
    console.log(req)
    let r=await posts(req)
    console.log(r)
    return r
}

const handler=async ({body,headers,httpMethod,queryString, path})=>{
    let path1=path.replace("/mongo","")
    let coll=await conn(CONFIG)
    let c=coll.collection
    let r={
        "/":{
              "POST":(d=[])=> c.insertMany(add_info(d)),
              "GET":(d={})=>c.find(d).toArray(),
              "PUT" :(d)=>c.updateMany({vid:d.vid},{ $set: d }),
              "DELETE":(d)=>c.removeMany(d)
            },
        "/reset":{
            "GET":()=>c.updateMany({},{ $set: {"full":false} }),
        },
        "/jeff":{
            "GET":()=>get_song2(),
        },
        "/jeff1":{
            "GET":()=>jeff,
        },
        "/sync":{
              "POST":sync,
        },
        "/full":{
             "PUT":(d=[])=>c.updateMany({vid:{$in: d}},{ $set: {full:true} }),
        },
        "/click":{
             "PUT" :(d)=>c.updateMany({vid:d.vid},{ $set: d }),
        },
        "/weibo_token":{
            "GET":get_token,
        },
        "/proxy":{
            "POST":proxy,
        },

    }
    let p=path1 in r ? path1 : "/"
    let m=httpMethod in r[p] ? httpMethod : "GET"
    let fn = r[p][m] || list
    let d= m=="GET" ?  queryString :  body ? to_json(body) :{}
    let w=new Set(['/proxy'])
    let r1=await fn(d)
    const format_res= w.has(p) ? res_proxy : res_json
    return format_res(r1)
}


const router=async (event, context, callback) => {
    console.log(event)
    let {Type} = event
    if (Type && Timer == "Timer" ){
        //{"Message":"","Time":"2019-08-22T12:54:00Z","TriggerName":"cc","Type":"Timer"}
        let r=await get_song2()
        let r1=res_json(r)
        return r1
    }
    let r=await handler(event)
    return r
}

const router1=async ({action,payload})=>{
     let r1=['/full','/add','/click',"/sync"]
     if (!r1.includes(action)) return {}
     let coll=await conn(CONFIG)
     let c=coll.collection
     let r={
          "/full":(d=[])=>c.insertMany(add_info(d)),
          "/add":(d=[])=>c.updateMany({vid:{$in: d}},{ $set: {full:true} }),
          "/click":(d={})=>c.updateMany({vid:d.vid},{ $set: d }),
          "/echo":(d={})=>d,
          "/sync":sync,
          "/test":(d={})=>({...d,ccc:"ddd"}),
     }
     return r[action](payload)
}

module.exports={
      conn,
      router1,
      router,
      to_json,
      handler,
}

exports.main_handler = router
