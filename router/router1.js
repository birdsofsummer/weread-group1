const {
    send,
    close,
    ws_in,
    ws_trans,
    ws_end,
}=require("./ws")

const {
    conn,
    getConnectionIdList,
    record_connectionID,
    deleteConnectionId,
    del_all_cid,
}=require('./mongo/db')

const {router1,to_json}=require("./api")
const superagent = require('superagent');
const now=()=>moment().unix()
const log=console.log
const post=superagent.post

const router=async (...arg)=>{
    let fn={
        "closing":ws_end,
        "data send":ws_trans,
        "connecting":ws_in,
    }
    let [e, context, callback]=arg

    const action=e.websocket.action
    let f=fn[action]
    let r=f ?  await f(...arg) : {}

    console.log({e, context, callback})
    console.log(r)
    return r
}


module.exports= {
    log,
    router,
}

exports.main_handler=router
