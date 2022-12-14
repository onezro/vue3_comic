<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted ,computed} from "vue";
import { Api } from "../api";
import type {
  Topic_info,
  Comics,
  Recommend_topics,
  Bottom_recommend,
} from "../typing";
import Recently from "@/components/Recently.vue";
import { useRecordStore } from "@/stores/record";
import { showConfirmDialog } from "vant";

const router = useRouter();
const props = defineProps<{
  id: string;
}>();
const topic_info = ref<Topic_info>({});
const bottom_recommend = ref<Bottom_recommend>({});
const recommend_topics = ref<Recommend_topics[]>([]);
const comics = ref<Comics[]>([]);
const tags = ref<string[]>([]);
const iconColor = ref("#fff");
const scrollTop = ref(0);
const showHead = ref(false);
const showUnfold = ref(false);
const loading = ref(false);
const sort = ref(false);
const showTop = ref(false);
const reset = ref(null);
const isCom = ref(0);
const store = useRecordStore();
const { setBookself, isConcern,alread } = store;

const goBack = () => {
  router.go(-1);
};
const getDetilComic = async () => {
  let { data } = await Api.getDetil(props.id);
  topic_info.value =data.topic_info;
  bottom_recommend.value = data.bottom_recommend;
  recommend_topics.value =data.recommend_topics;
  comics.value =data.topic_info.comics;
  tags.value = topic_info.value.tags.filter((t, i) => i < 6);
  loading.value = false;
};
const getScroll = (e) => {
  // scrollTop.value = ;
  if (parseInt(e.target.scrollTop) >= 200) {
    showHead.value = true;
  } else {
    showHead.value = false;
  }
};
const changeSort = () => {
  sort.value = !sort.value;
  comics.value = comics.value.reverse();
};

const resetScroll = (e) => {
  if (parseInt(e.target.scrollTop) >= 200) {
    showTop.value = true;
  } else {
    showTop.value = false;
  }
};

const goTop = () => {
  reset.value.scrollTop = 0;
};

const alreadyBook = () => {
  let a = bookself.findIndex((h) => h.id == props.id);
  isCom.value = a;
};
const concernComic = () => {
  let a=readTo.value.length!=0?readTo.value[0].lookTitle:topic_info.value.comics[0].title
  let b=readTo.value.length!=0?readTo.value[0].comic_id:topic_info.value.comics[0].id
  let concern = {
    id: props.id,
    image: topic_info.value.vertical_image_url,
    title: topic_info.value.title,
    latest: topic_info.value.comics.pop().title,
    lookTitle: a,
    comic_id: b,
    timeId: new Date().getTime(),
  };
  setBookself(concern);
};
const goToRead = (a:string|number, b:boolean) => {
  if(b==true){
    router.push(`/read/${a}`);
  }else{
     showConfirmDialog({
        message: "疯狂漫画V我50",
      })
        .then(() => {
          
        })
        .catch(() => {});
  }
  
};   
const readTo=computed(()=>{
  return store.historyComic.filter(h => h.id == props.id)
})
const goToredw=()=>{
  let b=readTo.value.length!=0?readTo.value[0].comic_id:topic_info.value.comics[0].id
  router.push(`/read/${b}`);
}

onMounted(() => {
  loading.value = true;
  getDetilComic();
});
</script>
<script lang="ts">
export default {
  name: "detail",
};
</script>
<template>
  <div class="detil" @scroll="getScroll">
     <van-dialog> </van-dialog>
    <div class="head" :class="{ bg: showHead }">
      <van-icon
        name="arrow-left"
        size="22px"
        :color="showHead ? 'black' : '#fff'"
        @click="goBack"
      />
      <p v-show="showHead">{{ topic_info.title }}</p>
      <div
        v-show="showHead"
        class="concern"
        @click="concernComic"
        :class="{ followed: isConcern(props.id) != -1 }"
      >
        {{ isConcern(props.id) != -1 ? "已关注" : "+关注" }}
      </div>
    </div>
    <div class="comic">
      <img :src="topic_info.cover_image_url" />
      <div class="comic-info">
        <div class="title">
          <p>{{ topic_info.title }}</p>
          <div
            class="concern"
            :class="{ followed: isConcern(props.id) != -1 }"
            @click="concernComic"
          >
            {{ isConcern(props.id) != -1 ? "已关注" : "+关注" }}
          </div>
        </div>
        <div class="popularity">
          <p class="p">{{ topic_info.popularity_info }}人气值</p>
          <p class="l">|</p>
          <p class="p">{{ topic_info.comments_count }}总评论</p>
          <p class="l">|</p>
          <p class="p">{{ topic_info.fav_count }}人关注</p>
        </div>
      </div>
    </div>
    <div class="comic-box">
      <div class="introduction">
        <div class="label">
          <p v-for="t in tags" :key="t">{{ t }}</p>
        </div>
        <div class="text">{{ topic_info.description }}</div>
        <div class="author" v-if="topic_info.user">
          <img :src="topic_info.user.avatar" />
          <p>{{ topic_info.user.nickname }}</p>
        </div>
      </div>
      <div class="directory">
        <div class="dirtext">
          <div class="analecta">漫画选集</div>
        </div>
        <div class="theme-list">
          <div class="catalog-sets">
            <div
              class="analecta-box"
              v-for="c in topic_info.comics"
              :key="c.id"
              :class="{read:alread(c.id)}"
              @click="goToRead(c.id, c.is_free)"
            >
              <img v-lazy="c.cover_image_url" />
              <p>{{ c.title }}</p>
              <div v-for="(r,i) in readTo" :key="i"><div class="gou" v-if="r.comic_id==c.id"></div></div>
              
              <div class="pay" v-if="c.is_pay_comic">付费</div>
            </div>
          </div>
        </div>
        <div class="unfold" @click="showUnfold = !showUnfold">展开目录</div>
      </div>
    </div>
    <div class="recommend">
      <div class="recomtext">相关推荐</div>
      <Recently :topics="recommend_topics" />
    </div>
    <div class="recently">
      <div class="recomtext">最近更新</div>
      <Recently :topics="bottom_recommend.topic_list" />
    </div>
    <van-popup
      v-model:show="showUnfold"
      round
      position="bottom"
      :style="{ height: '75%' }"
    >
      <div class="list" @scroll="resetScroll" ref="reset">
        <div class="head-list">
          <div class="title">
            <div class="xz">漫画选集</div>
            <div class="sort" @click="changeSort">
              <van-icon name="ascending" size="20px" v-if="sort" />
              <van-icon name="descending" size="20px" v-if="!sort" />
            </div>
          </div>
          <div class="time">
            <span>{{ topic_info.update_status }}</span>
            <span class="l">|</span>
            <span>已更{{ topic_info.comics_count }}个内容</span>
            <span class="l">|</span>
            <span>{{ topic_info.comic_body_count }}篇正文</span>
          </div>
        </div>
        <div class="catalog">
          <div class="box">
            <div
              class="assemble"
              v-for="c in comics"
              :key="c.id"
              :class="{ active: alread(c.id) }"
              @click="goToRead(c.id, c.is_free)"
            >
              <img :src="c.cover_image_url" />
              <div class="assemble-text">
                <div class="">{{ c.title }}</div>
                <div class="update">
                  <span>{{ c.created_at }}</span>
                  <span>{{ c.likes_count }}</span>
                </div>
               <div v-for="(r,i) in readTo" :key="i"><div class="gou" v-if="r.comic_id==c.id"></div></div>
                <div class="pay" v-if="c.is_pay_comic">付费</div>
              </div>
            </div>
          </div>
          <div class="top" v-if="showTop" @click="goTop">Top</div>
        </div>
      </div>
    </van-popup>
    <div class="read-box" v-if="topic_info.comics">
      <div class="add">{{ readTo.length!=0?readTo[0].lookTitle:topic_info.comics[0].title }}</div>
      <div class="start" @click="goToredw">开始阅读</div>
    </div>
    <div v-show="loading" class="load">
      <van-loading size="24px" color="#fff" vertical>加载中...</van-loading>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detil {
  position: fixed;
  left: 0;
  top: 0;
  padding-bottom: 50px;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 14;
  .head {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2vw;
    width: 100%;
    height: 40px;
    z-index: 14;
    p {
      // margin: auto;
      font-size: 16px;
      font-weight: bold;
    }
    .concern {
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 12px;
      color: #000;
      background-color: #f0ac24;
    }
    .followed {
      color: #000;
      background-color: #dcdcdc;
    }
  }
  .comic {
    position: relative;
    width: 100%;
    height: 235px;

    img {
      width: 100%;
    }

    .comic-info {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 10px 3.5vw;
      gap: 10px;
      left: 0;
      bottom: 0;
      color: #fff;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        letter-spacing: 1px;
        font-size: 18px;
        font-weight: bold;

        .concern {
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 13px;
          color: #000;
          background-color: #f0ac24;
        }

        .followed {
          color: #000;
          background-color: #dcdcdc;
        }
      }

      .popularity {
        display: flex;
        align-items: center;
        gap: 6px;

        .p {
          font-size: 12px;
          // font-weight: 600;
        }

        .l {
          font-size: 12px;
          transform: scale(0.5);
        }
      }
    }
  }
  .comic-box {
    .introduction {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 0 3.5vw;

      .label {
        margin-top: 5px;
        display: flex;
        gap: 10px;

        p {
          border-radius: 999px;
          font-size: 12px;
          padding: 5px 10px;
          background-color: #f0f0f0;
        }
      }

      .text {
        font-size: 14px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }

      .author {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          border-radius: 999px;
          width: 25px;
          height: 25px;
        }

        p {
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .directory {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 15px;

      .dirtext {
        padding: 0 3.5vw;
      }

      .catalog-sets {
        display: flex;
        gap: 10px;
        margin-left: 3.5vw;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }

        .analecta-box {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 150px;

          img {
            border-radius: 5px;
            width: 150px;
            height: 84px;
          }

          p {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .gou {
            position: absolute;
            right: 6px;
            top: 6px;
            width: 20px;
            height: 20px;
            background-image: url(../assets/img/8-b.png);
            background-size: cover;
            background-repeat: no-repeat;
          }

          .pay {
            position: absolute;
            border-radius: 5px;
            left: 6px;
            top: 6px;
            padding: 3px 5px;
            font-size: 14px;
            color: #fff;
            background-color: #f0ac24;
          }
        }

        .read {
          img {
            opacity: 0.5;
          }
        }
      }

      .unfold {
        border-radius: 999px;
        border: 1px solid #dcdcdc;
        margin: auto;
        font-size: 14px;
        padding: 5px 10px;
      }
    }
  }
  .recommend,
  .recently {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;

    .recomtext {
      padding: 0 3.5vw;
      font-weight: bold;
    }
  }
  .bg {
    // background-color: #fff;
    backdrop-filter: saturate(50%) blur(2px);
    background: rgba(255, 255, 255, 0.7);
  }
  .read-box {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 45px;
    background-color: #f7f7f7;
    z-index: 14;
    .add {
      flex: 1;
      text-align: center;
      line-height: 50px;
    }

    .start {
      // border-top-left-radius: 30px;
      width: 120px;
      text-align: center;
      line-height: 50px;
      color: #9a4e06;
      font-weight: bold;
      background-color: #f0ac24;
    }
  }
 .list {
    width: 100%;
    height: 75vh;

    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .head-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: sticky;
      left: 0;
      top: 0;
      padding: 0 3vw;
      padding-top: 5px;
      width: 100%;
      height: 48px;
      background-color: #fff;
      z-index: 14;
      .title {
        display: flex;
        justify-content: space-between;

        .xz {
          font-size: 16px;
          font-weight: bold;
        }
      }

      .time {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #999;

        .l {
          font-size: 13px;
          transform: scale(0.5);
        }
      }
    }

    .catalog {
      width: 100%;

      .top {
        position: fixed;
        border-radius: 999px;
        bottom: 20px;
        right: 20px;
        width: 35px;
        height: 35px;
        font-size: 15px;
        text-align: center;
        line-height: 35px;
        color: #fff;
        background-color: #f0ac24;
      }

      .box {
        .assemble {
          position: relative;
          display: flex;
          gap: 15px;
          width: 100%;
          height: 94px;
          padding: 5px 3vw;

          img {
            border-radius: 5px;
            width: 150px;
            height: 84px;
          }

          .assemble-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title {
              font-size: 14px;
            }
            .update {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
            }
          }

          .gou {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 20px;
            height: 20px;
            background-image: url(../assets/img/8-b.png);
            background-size: cover;
            background-repeat: no-repeat;
          }

          .pay {
            position: absolute;
            border-radius: 5px;
            left: 6px;
            top: 6px;
            padding: 3px 8px;
            font-size: 13px;
            color: #fff;
            background-color: #f0ac24bb;
          }
        }

        .active {
          background-color: #f7f7f7;

          img {
            opacity: 0.5;
          }
        }
      }
    }
  }
  .load {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 15;
    .van-loading {
      margin: auto;
    }
  }
}
</style>
