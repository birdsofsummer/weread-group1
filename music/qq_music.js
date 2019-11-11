const R=require("ramda")
const {
    to_json,
    to_qs,
    isArray
}=require("../fp")

const {
    get_jsonp,
    get_blob2json,
    gets,
}=require("../ajax")

const {
    top_lists,
    api,
    SONG_TYPES,
}=require("./config")


const search_song=async (w="张信哲")=>{
    let {url,params}=api.search_song
    let ps=R.range(0,16).map(p=>([url,{...params,p,w}]))
    let r=await gets(ps)
    let t=r
        .map(x=>x.body.toString())
        .map(parse_jsonp)
        .filter(x=>x.code==0)
        .map(x=>x.data.song.list)
        //.flat()
    return R.flatten(t)
}


const songid2name1=(
    songmid,
    oo={vkey:"","guid":"","uin":"",fromtag:53,},
)=>r.mapObjIndexed((v,k,o)=>"http://dl.stream.qqmusic.qq.com/" + k +songmid+"." +v +"?" +new URLSearchParams(oo) )(SONG_TYPES)

const songid2name=(songmid)=>"C400"+songmid+".m4a"
const id2url=(songmids=[])=> {
      let {url,params}=api.get_token
      let ps={...params,songmid:songmids,filename:songmids.map(songid2name)}
      uu=url+"?"+to_qs(ps)
      return uu
}

const song_list_format=(r)=>{
      let r1=r
          .filter(x=>x.code==0)
          .map(x=>x.data.items)
          //.flat()
      let r2= R.flatten(r1)
      return R.indexBy(x=>x.songmid,r2)
}

const get_song=async (songmids=[])=>{
        if (songmids.length>100){
            uu=R.splitEvery(100,songmids)
            r=await Promise.all(uu.map(id2url).map(get_blob2json))
           return song_list_format(r)
       }else{
          let uu=id2url(songmids)
          return song_list_format([await get_blob2json(uu)])
    }
}
const get_song_real_url=({subcode,songmid,filename,vkey}={subcode:"",songmid:"",filename:"",vkey:""})=>{
    if (!vkey) return ""
    let d={
        url:"http://ws.stream.qqmusic.qq.com/",
        params:{
              "fromtag": "0",
              "guid": "126548448",
              vkey
        },
    }
    return d.url +filename + "?" + to_qs(d.params)
}
const SONG=require("./jeff")

const save_music=async (r=[])=>{
    const {upload_s}=require("../cos")
    k="/music/jeff1.json",
    upload_s(r,k)
}

const get_song1=async (songs=SONG)=>{
        let ids=songs
                .map(x=>x.songmid)
                .filter(x=>x)
        let r=await get_song(ids)
        return songs
        .map(x=>({
            ...x,
            urls:r[x.songmid],
            url:get_song_real_url(r[x.songmid])
        }))
        .filter(x=>x.url)
}

const get_song2=async ()=>{
    r=await get_song1()
    console.log(r)
    if (r.length) {
        await save_music(r)
    }
    return r

}

module.exports={
    get_song1,
    get_song2,
    save_music,
}


