//  https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI#.E5.BE.AE.E5.8D.9A
const {client_id,client_secret,grant_type,redirect_uri}=process.env

const weibo=({code,access_token})=>({
    //https://open.weibo.com/wiki/OAuth2/access_token
    "token":{
        method:"post",
        url:"https://api.weibo.com/oauth2/access_token",
        data:{
            code,
            client_id,
            client_secret,
            grant_type,
            redirect_uri,
        },
    },
    logout:{
        method:"get",
        params:{access_token},
        url:"https://api.weibo.com/oauth2/revokeoauth2",
        res:{"result":"true"},
    },
    email:{
        method:"get",
        params:{access_token},
        url:"https://api.weibo.com/2/account/profile/email.json",
        error:{"error":"access_denied","error_code":21330,"request":"/2/account/profile/email.json"},
    },
   get_uid:{
       method:"get",
       url:"https://api.weibo.com/2/account/get_uid.json",
       data:{access_token},
       res:{"uid":2328694317},
   },
   "get_token_info":{
        method:"post",
        params:{
            access_token,
        },
        url:"https://api.weibo.com/oauth2/get_token_info",
        res:{"uid":2328694317,"appkey":"4043688639","scope":"follow_app_official_microblog","create_at":1564132886,"expire_in":157675024},
        data:{},
   },
   show:{
        method:"get",
        params:{
            access_token ,
            uid:"2328694317",
            //screen_name:"zaku",
        },
        url:"https://api.weibo.com/2/users/show.json",
   },
   domain_show:{
        method:"get",
        params:{
            access_token ,
            domain:"xbaitu",
        },
        url:"https://api.weibo.com/2/users/domain_show.json",
   },
   counts:{
        method:"get",
        params:{
            access_token ,
            uids:"2328694317,2328694317"
        },
        url:"https://api.weibo.com/2/users/counts.json",
   },
   friends:{
        method:"get",
        params:{
            access_token ,
            uid:"2328694317",
            "cursor":0, //a=[],a[cursor,cursor+5]
        },
       url:"https://api.weibo.com/2/friendships/friends.json",
   },
   friends_ids:{
        method:"get",
        params:{
            access_token ,
            uid:"2328694317",
            "next_cursor":0, //a=[],a[cursor,cursor+5]
        },
       url:"https://api.weibo.com/2/friendships/friends/ids.json",
   },
   follower_ids:{
        method:"get",
        params:{
            access_token ,
            uid:"2328694317",
            "next_cursor":0, //a=[],a[cursor,cursor+5]
      },
      url:"https://api.weibo.com/2/friendships/followers/ids.json",
   },

    home_timeline:{
        method:"get",
        params:{
            access_token,
            count:100,
        },
        url:"https://api.weibo.com/2/statuses/home_timeline.json",
    },
    user_timeline:{
        method:"get",
        params:{
            access_token,
            count:100,
        },
        url:"https://api.weibo.com/2/statuses/user_timeline.json",
    },
    repost_timeline:{
        method:"get",
        params:{
            access_token,
            id:4109566138996438,
        },
        "url":"https://api.weibo.com/2/statuses/repost_timeline.json",

    },

   "relationship":{
        method:"get",
        params:{
            access_token ,
            source_id:11418348195,
            target_id:2328694317,
      }, //screen_name
      url:"https://api.weibo.com/2/friendships/show.json",
   },
   pulic_weibo:{
        method:"get",
        url:"https://api.weibo.com/2/statuses/public_timeline.json", //?access_token=2.00llxaXCVIue6E1aa75fb2d70_gHjk",
        data:{access_token},
   },
   api_rate_limits:{
        method:"get",
        url:"https://api.weibo.com/2/account/rate_limit_status.json",
        data:{access_token},
   },
   "short_url/expand":{
       method:"get",
       url:"https://api.weibo.com/2/short_url/expand.json",
       data:{ access_token,url_short:[]},
       //url_short=aaa&url_short=bbb
   },
   "short_url/shorten":{
       method:"get",
       url:"https://api.weibo.com/2/short_url/shorten.json",
       data:{ access_token,url_long:[]},
   },
   pulic_country:{
        method:"get",
        url:"https://api.weibo.com/2/common/get_country.json",
        data:{access_token},
   },
   pulic_province:{
        method:"get",
        url:"https://api.weibo.com/2/common/get_province.json",
        data:{access_token,country:"001"},
   },
   pulic_city:{
        method:"get",
        url:"https://api.weibo.com/2/common/get_city.json",
        data:{access_token,province:"001043"},
   },
   code_to_location:{
        method:"get",
        url:"https://api.weibo.com/2/common/code_to_location.json",
        data:{access_token,codes:"001043"}, //codes=1,2,3,4,
   },
   emotion:{
        url:"https://api.weibo.com/2/emotions.json",
   },
   write_weibo:{
        method:"post",
        url:"https://api.weibo.com/2/statuses/update.json",
        data:{access_token,status:"sss","visible":"0"},
   },
   share:{
        method:"post",
        url:"https://api.weibo.com/2/statuses/share.json",
        data:{access_token,status:"test%20weibo%20@@@%20https://weread.qing.workers.dev","visible":"0"},
   },

   topics:{
        method:"get",
        params:{access_token,q:"ccc"},
        url:"https://api.weibo.com/2/search/topics.json",
        error:{"request":"/2/search/topics.json","error_code":"10014","error":"Insufficient app permissions!"},
   }
})


module.exports=weibo
