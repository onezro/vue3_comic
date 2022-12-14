<script setup lang="ts">
import {computed} from "vue"
import type { Banner, Topic, discoveryModules } from "../typing";
import { defineEmits } from "vue";
import {useRouter} from "vue-router"
import { useRecordStore } from "@/stores/record";

const props =
  defineProps<{
    banners: Array<Banner>;
    dailyList: Array<Topic>;
    discovery: Object<discoveryModules>;
    suspense:Object<discoveryModules>;
    popularity: Array<Topic>;
  }>();
const router=useRouter()
const store = useRecordStore();

const emit = defineEmits(["clickChange"]);
const clickChange = () => {
  emit("clickChange");
};
const goToLeader=()=>{
  router.push('/list')
}
const goToDaily=()=>{
  router.push('/hot')
}
const goTodetail=(a:number)=>{
   router.push(`/detil/${a}`)
}
const firstHistory=computed(()=>{
  return store.historyComic.filter((t, i) => i == 0)
})
const goToRead = (a:string|number) => {
  router.push(`/read/${a}`);
};
</script>
<template>
  <div class="recommend">
    <div class="banner">
      <van-swipe :autoplay="4000" duration="1000" :show-indicators="false">
        <van-swipe-item v-for="b in props.banners" :key="b.target_id" >
          <div
            class="swipe"
            :style="{ backgroundImage: 'url(' + b.image_url + ')' }"
            @click="goToRead(b.target_id)"
          ></div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="box">
      <div class="middle">
        <div class="list" @click="goToLeader">
          <div class="img"></div>
          <div class="history-text">
            <p class="title">排行榜</p>
            <p class="li">海量精品漫画</p>
            <p class="li">立即去看看</p>
          </div>
        </div>
        <div class="history" v-for="f in firstHistory" :key="f.comic_id" @click="goToRead(f.comic_id)">
          <div class="h-img" :style="{'backgroundImage':'url('+f.cover_image_url+')'}"></div>
          <div class="history-text">
            <p class="title">{{ f.title }}</p>
            <p class="li">{{ f.lookTitle }}</p>
            <p class="li">{{ f.author }}</p>
          </div>
        </div>
      </div>
      <div class="daily_topics">
        <div class="title">
          <p class="">今日热门速递</p>
          <p class="more" @click="goToDaily">更多</p>
        </div>
        <div class="topics">
          <div
            class="card"
            v-for="r in dailyList"
            :key="r.id"
            @click="goTodetail(r.id)"
          >
            <img v-lazy="r.vertical_image_url" />
            <div class="comci-text">{{ r.title }}</div>
          </div>
        </div>
        <div class="change" @click="clickChange">换一批</div>
      </div>
      <div class="popularity_topics">
        <div class="title">
          <p class="">新作飙升榜</p>
        </div>
        <div class="topics">
          <div
            class="card"
            v-for="r in discovery.topics"
            :key="r.id"
            @click="goTodetail(r.id)"
          >
            <img :lazy-load="true" :src="r.cover_image_url" />
            <div class="comci-text">{{ r.title }}</div>
          </div>
        </div>
      </div>
      <div class="popularity_topics">
        <div class="title">
          <p class="">最受欢迎</p>
        </div>
        <div class="topics">
          <div
            class="card"
            v-for="r in popularity"
            :key="r.id"
            @click="goTodetail(r.id)"
          >
            <img :lazy-load="true" :src="r.cover_image_url" />
            <div class="comci-text">{{ r.title }}</div>
          </div>
        </div>
      </div>
      <div class="popularity_topics">
        <div class="title">
          <p class="">眉头一皱，发现事情并不简单</p>
        </div>
        <div class="topics">
          <div
            class="card"
            v-for="r in suspense.topics"
            :key="r.id"
            @click="goTodetail(r.id)"
          >
            <img :lazy-load="true" :src="r.cover_image_url" />
            <div class="comci-text">{{ r.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.recommend {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .banner {
    .swipe {
      width: 100%;
      height: 30vh;
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: 0px -80px;
    }
  }
  .box {
    padding-bottom: 100px;
    .middle {
      width: 100%;
      display: flex;
      padding: 10px 3.5vw;
      justify-content: space-between;

      .list,
      .history {
        // box-sizing: border-box;
        border-radius: 5px;
        padding: 6px 5px;
        display: flex;
        width: 169px;
        gap: 10px;
        height: 80px;
        background-image: url(../assets/img/bg.jpg);
        background-size: 100% 100%;
      }

      .list {
        .img {
          width: 60px;
          height: 68px;
        }

        .history-text {
          padding: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            font-size: 15px;
            color: #9a4e06;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .li {
            font-size: 12px;
            color: #b05806;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .history {
        background-image: url(../assets/img/bg2.jpg);
        .h-img {
          border-radius: 5px;
          width: 60px;
          height: 68px;
          background-repeat: no-repeat;
          background-size: 119px 68px;
          background-position: center;
        }
        .history-text {
          padding: 5px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width:100px;
          .title {
            font-size: 15px;
            color: #9a4e06;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .li {
            font-size: 12px;
            color: #b05806;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .daily_topics {
      display: flex;
      flex-direction: column;
      gap: 15px;
      //   margin-top: 10px;
      padding: 0 3.5vw;
      .title {
        font-size: 16px;
        color: #343434;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .more {
          font-size: 14px;
          // color:  #9e9e9e;
        }
      }

      .topics {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .card {
          width: 29vw;
          img {
            border-radius: 7px;
            width: 100%;
            height: 150px;
          }

          .comci-text {
            margin-top: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
          }
        }

        .card:nth-child(n + 4) {
          margin-top: 10px;
        }
      }

      .change {
        width: 100%;
        box-sizing: border-box;
        border-radius: 999px;
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        color: #999;
        background-color: #f0f0f0;
      }
    }
    .popularity_topics {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 15px;
      padding: 0 3.5vw;
      .title {
        font-size: 16 px;
        color: #343434;
        font-weight: bold;
      }
      .topics {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        // gap: 15rpx;
        .card {
          width: 45vw;
          margin-bottom: 10px;

          img {
            border-radius: 5px;
            width: 100%;
            height: 100px;
          }

          .comci-text {
            margin-top: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
