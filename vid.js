const moment=require("moment")
const now=()=>moment().format('YYYYMMDD')
const today=()=> moment().format('YYYYMMDD')
const today_w=()=>moment().weekday()
const weekday=(n=-1)=> today_w() == 6  ? today() : moment().add(-moment().weekday(),"days").add(n,"days").format('YYYYMMDD')

const [saturday,thursday,tuesday]=[-1,4,2].map(weekday)
const vid2zudui=(vid=VID)=>`https://weread.qq.com/wrpage/huodong/abtest/zudui?collageId=${vid}_${saturday}&shareVid=${vid}&from=timeline&wrRefCgi=`
const vid2zan=(vid=VID)=>`https://weread.qq.com/wrpage/huodong/abtest/jizan?isAnimateNavBarBackground=1&senderVid=${vid}&vol=${thursday}&designId=${thursday}_0&from=timeline&wrRefCgi=`
const vid2fan=(vid=VID)=>`https://weread.qq.com/wrpage/huodong/abtest/fan?vol=${tuesday}&inviteVid=${vid}&wrRefCgi=`


const Default_vid_info={
        "vid":"0",
		"name": "0",
		"value": 1,
        "full":false,
        "click":0,
		"cat": "library",
		"icon":"https://image.flaticon.com/icons/png/512/346/346167.png",
		"desc": "",
}

const add_vid_detail=(x=0)=>({
         ...Default_vid_info,
        "vid":`${x}`,
		"name":`${x}`,
})

const add_info=(vids=[])=>vids.map(add_vid_detail)

const extend_vid_detail=(x={})=>({
     ...Default_vid_info,
     ...x
})

module.exports= {
    vid2zudui,
    add_info,
}
