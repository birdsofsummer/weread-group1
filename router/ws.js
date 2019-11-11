const post=superagent.post
const CONFIG=process.env

async function close(connectionId) {
    let retmsg = {
        "websocket":{
            "action":"closing",
            "secConnectionID":connectionId,
        }
    };
    log(retmsg)
    return await post(CONFIG.sendbackHost,retmsg).text
}


const close_all=(ids=[])=>Promise.all(ids.map(close))

async function send(secConnectionID, data="") {
      let retmsg = {
            websocket:{
                "action": "data send",
                "secConnectionID": secConnectionID,
                "dataType": "text",
                 data,
            }
        }
      return post(CONFIG.sendbackHost,retmsg)
}

const send_all=(ids=[],data)=>Promise.all(ids.map(x=>send(x,data)))
const broadcast=async (data)=>send_all((await getConnectionIdList()),data)


//{websocket: { action: 'connecting', secConnectionID: 'CQ1RaJAf4vzaVAkNUdHLZA==', secWebSocketExtensions: 'permessage-deflate' } }
const ws_in=async ({websocket:{secConnectionID},requestContext} , context, callback) => {
     if (!secConnectionID){
          return { errNo: 102, errMsg: "not found web socket" };
      }
      await record_connectionID(secConnectionID);
      log(secConnectionID);
      log("Finish DB Request");
      return {
            "errNo":0,
            "errMsg":"ok",
            "websocket":{ action: "connecting", secConnectionID},
      }
};

//{"websocket":{"action":"data send","data":"ccc","dataType":"text","secConnectionID":"CQ1RaJAftPzaVAknk1DEVw=="}}
const ws_trans=async (e, context, callback) => {
      console.log(e)
 //     let connectionIdList = await getConnectionIdList();
      let {websocket:{secConnectionID,data}}=e
      if (!secConnectionID) {
          return { errNo: 102, errMsg: "not found web socket" }
      }
      try {
            let result={ok:true,data:{}}
            let d= data ? {ok:true,data:await router1(to_json(data))} : result
            log('ddddddddd',d)
            let r=await send(secConnectionID, d);
            log("[[[" + r+ "]]]")
      }catch(err){
            log('???',err,"???")
      }
      return e;
};

//  { websocket: { action: 'closing', secConnectionID: 'CSeTUpAf5QhUOAkNUdG5mQ==' } }
const ws_end=async ({websocket:{secConnectionID:connectionID}}, context, callback) => {
      if (!connectionID) {
        return { errNo: 102, errMsg: "not found web socket" };
      }
      log("connecting: connection id", connectionID);
      await deleteConnectionId(connectionID);
      // 如果是主动断开连接
      // await close(connectionID)
      log("Finish DB Request");
      return "send success";
};

module.exports= {
    send,
    close,
    ws_in,
    ws_trans,
    ws_end,
}

const {
    send,
    close,
    ws_in,
    ws_trans,
    ws_end,
}=require("./ws")
