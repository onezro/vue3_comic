import http from "@/http";
import axios from "axios";
export const Api = {
  getHome: () => {
    return http.request({
        url: 'v2/pweb/home',
        method: 'get'
    })
  },
  getTheme:(a:number,b:number)=>{
    return axios.get(`/api/v1/search/by_tag?since=${a}&count=30&f=3&tag=${b}&sort=1&query_category={"update_status":1}`)
  },
  getBoard:(a:number)=>{
    return axios.get(`/api/v2/pweb/rank/topics?rank_id=${a}`)
  },
  getHot:(a:number)=>{
    return axios.get(`/api/v2/pweb/daily/topics?pos=${a}`)
  },
  getDetil:(a:number|string)=>{
    return axios.get(`/api/v2/pweb/topic/${a}`).then((res)=>res.data)
  },
  getRead:(a:string|number)=>{
    // return axios.get(`http://127.0.0.1:5173/${a}.json`).then((res)=>res.data)
     return axios.get(`/api/v2/pweb/comic/${a}`).then((res)=>res.data)
  },
  getHotwordList:(text:string)=>{
    return axios.get(`/api/v1/search/suggestion_topic_author?q=${text}&type=2&f=2`).then((res)=>res.data)
  },
  getSearch:(text:string)=>{
    return axios.get(`/api/v1/search/topic?q=${text}&f=3&size=30`).then((res)=>res.data)
  }
}