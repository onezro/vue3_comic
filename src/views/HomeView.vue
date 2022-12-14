<script setup lang="ts">
import { Api } from "../api";
import { ref, onMounted } from "vue";
import type { Banner, Categories, Topic, discoveryModules } from "../typing";
import { useCounterStore } from "@/stores/counter.ts";
import RecomMend from "../components/RecomMend.vue";
import { useRouter } from "vue-router";

const homeData = ref<T>("");
const banners = ref<Banner[]>([]);
const categories = ref<Categories[]>([]);
const dailyList = ref<Topic[]>([]);
const discovery = ref<discoveryModules>({});
const popularity = ref<Topic[]>([]);
const suspense = ref<discoveryModules>({});
const themeList = ref<Topic[]>([]);
const since = ref(0);
const tag = ref(0);
const loading = ref(false);
const finished = ref(false);
const showTheme = ref(false);
const store = useCounterStore();
const { getWeekdays, getTags, moreTheme, removeTheme, addTheme } = store;
const router = useRouter();

onMounted(() => {
  getData();
});
const getData = async () => {
  let { data } = await Api.getHome();
  homeData.value = data.data;
  banners.value = data.data.banners;
  discovery.value = data.data.discovery_modules[0];
  suspense.value = data.data.discovery_modules[2];
  popularity.value = data.data.popularity_topics;
  getTags(data.data.categories);
  getWeekdays(data.data.daily_topics.week_days);
  randomDaily();
};
const getThemeData = async () => {
  let { data } = await Api.getTheme(since.value, tag.value);
  themeList.value = [...themeList.value, ...data.data.topics];
  loading.value = false;
  if (since.value > data.total - 30) {
    finished.value = true;
  }
};
const randomDaily = () => {
  let { topics } = homeData.value.daily_topics;
  let count = [];
  while (count.length != 6) {
    let a = Math.ceil(Math.random() * 29);
    let b = count.findIndex((t) => t == a);
    if (b == -1) {
      // console.log(a);
      count.push(a);
      let c = topics.filter((f, i) => i == a);
      dailyList.value.push(...c);
    }
  }
  // console.log(dailyList);
};
const clickChange = () => {
  dailyList.value = [];
  randomDaily();
};
const changeTag = ({ name }) => {
  tag.value = name;
  if (name != 0) {
    themeList.value = [];
    since.value = -30;
    finished.value = false;
  }
};
const onLoad = () => {
  setTimeout(() => {
    since.value += 30;
    getThemeData();
    // console.log(since.value);
  }, 1000);
};
const goTodetail = (a: number) => {
  router.push(`/detil/${a}`);
};
const goToSearch = () => {
  router.push(`/search`);
};
const chooseTheme = () => {
  moreTheme();
  showTheme.value = true;
};
</script>

<template>
  <div class="home">
    <div class="head">
      <div class="box">
        <van-tabs
          animated
          background="transparent"
          sticky
          color="#343434"
          line-width="20px"
          title-active-color="#343434"
          @click-tab="changeTag"
        >
          <van-tab title="推荐" :key="-1"
            ><RecomMend
              @clickChange="clickChange"
              :discovery="discovery"
              :banners="banners"
              :dailyList="dailyList"
              :popularity="popularity"
              :suspense="suspense"
          /></van-tab>
          <van-tab
            v-for="f in store.myTheme"
            :name="f.tagId"
            :title="f.title"
            :key="f.tagId"
          >
            <van-list
              v-model:loading="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              style="height: calc(100vh - 100px); overflow: scroll"
            >
              <div class="topics">
                <div
                  class="card"
                  v-for="r in themeList"
                  :key="r.id"
                  @click="goTodetail(r.id)"
                >
                  <img v-lazy="r.vertical_image_url" />
                  <div class="comci-text">{{ r.title }}</div>
                  <div class="update-text">{{ r.corner_text }}</div>
                </div>
              </div>
            </van-list>
          </van-tab>
          <template v-slot:nav-right>
            <div
              :style="{ width: '20px', height: '20px', padding: '22px 26px' }"
            ></div>
          </template>
        </van-tabs>
        <div class="right">
          <img src="../assets/img/nf6.png" @click="goToSearch" />
        </div>
        <div class="left">
          <img src="../assets/img/bt.png" @click="chooseTheme" />
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="showTheme"
      position="right"
      :style="{ width: '65%', height: '100%' }"
    >
      <div class="theme">
        <div class="my-theme">
          <div class="my-text">
            <span>我的主题</span>
            <span @click="showTheme=false" class="finsh">完成</span>
          </div>
          <div class="item">
            <div
              class="list"
              v-for="f in store.myTheme"
              :key="f.tagId"
              @click="removeTheme(f)"
            >
              {{ f.title }}
              <div class="jia">x</div>
            </div>
          </div>
        </div>
        <div class="optional-theme">
          <div class="my-text">
            <span>更多主题</span>
          </div>
          <div class="item">
            <div
              class="list2"
              v-for="f in store.theme"
              :key="f.tagId"
              @click="addTheme(f)"
            >
              {{ f.title }}
              <div class="jia">+</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
.home {
  .head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
    z-index: 10;
    background-image: linear-gradient(180deg, #f0ac24, #f0ac24c9, #e1ac1570);
    .box {
      position: relative;
      width: 100%;
      height: 45px;
      .left {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 12px 7px;
        background-image: linear-gradient(
          180deg,
          rgb(240 172 36 / 68%),
          rgb(241 193 97),
          transparent
        );
        img {
          width: 20px;
        }
      }
      .right {
        position: absolute;
        right: 34px;
        top: 0px;
        padding: 10px 6px 8px 3px;
        background-image: linear-gradient(
          180deg,
          rgb(240 172 36 / 68%),
          rgb(241 193 97),
          transparent
        );
        img {
          width: 25px;
        }
      }
      .van-list {
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .topics {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 3.5vw;
        padding-top: 5px;
        .card {
          width: 110px;
          height: 177px;
          img {
            border-radius: 5px;
            width: 100%;
            height: 145px;
          }

          .comci-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            line-height: 18px;
          }
          .update-text {
            font-size: 1vw;
            color: #949494;
          }
        }

        .card:nth-child(n + 4) {
          margin-top: 10px;
        }
      }
    }
  }
  .theme {
    display: flex;
    flex-direction: column;
    gap: 30px;
    box-sizing: border-box;
    padding: 0 10px;

    .my-theme,
    .optional-theme {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .my-text {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 16px;
        font-weight: bold;
        .finsh {
          color: #fe7d06;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .item {
        display: flex;
        flex-wrap: wrap;
        gap: 15px 20px;

        .list {
          position: relative;
          border-radius: 999px;
          width: 60px;
          font-size: 13px;
          padding: 8px 0;
          text-align: center;
          background-color: #f0f0f0;
          animation: move 0.5s linear infinite;
          .jia {
            position: absolute;
            border-radius: 999px;
            top: -5px;
            right: -5px;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            color: #fff;
            background-color: #dcdcdc;
          }
        }
        .list2 {
          position: relative;
          box-sizing: border-box;
          border: 1px solid #fe7d06;
          border-radius: 999px;
          width: 60px;
          font-size: 14px;
          padding: 8px 0;
          text-align: center;
          background-color: #fff0e3;
          .jia {
            position: absolute;
            border-radius: 999px;
            top: -7px;
            right: -4px;
            width: 15px;
            height: 15px;
            text-align: center;
            line-height: 15px;
            color: #fff;
            background-color: #fe7d06;
          }
        }
      }
    }
  }
  @keyframes move {
    0% {
      transform: rotateZ(0deg);
    }

    25% {
      transform: rotateZ(3deg);
    }

    75% {
      transform: rotateZ(-3deg);
    }

    100% {
      transform: rotateZ(0deg);
    }
  }
}
</style>
