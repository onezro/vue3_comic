<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Api } from "../api";
import { useRouter } from "vue-router";
import type { Comic_info, ufo, Topic_info, Comics } from "../typing";
import { useRecordStore } from "@/stores/record";
import { showConfirmDialog } from "vant";

const router = useRouter();
const props = defineProps<{
  id: string;
}>();
const comic_info = ref<Comic_info>({});
const topic_info = ref<Topic_info>({});
const previous_comic_info = ref<ufo | null>({});
const next_comic_info = ref<ufo | null>({});
const browserWidth = ref<number>();
const comic_unfold = ref<Comics[]>([]);
const comic_id = ref<string | number>();
const imgWidth = ref(0);
const imgHeight = ref(0);
const page = ref(1);
const reset = ref(null);
const showUtils = ref(false);
const showBottom = ref(false);
const loading = ref(true);
const sort = ref(false);
const showTop = ref(false);
const store = useRecordStore();
const { setAlready, updateBook, alread, setHistory } = store;

const goBack = () => {
  router.go(-1);
};
const goHome = () => {
  router.push("/");
};
const goToDetail = (a: number) => {
  router.push(`/detil/${a}`);
};
const getReadData = async (id: string | number) => {
  let { data } = await Api.getRead(id);
  comic_id.value = id;
  topic_info.value = data.topic_info;
  comic_info.value = data.comic_info;
  previous_comic_info.value = data.previous_comic_info;
  next_comic_info.value = data.next_comic_info;
  comic_unfold.value = data.topic_info.comics.reverse();
  imgWidth.value = data.comic_info.comic_images[0].width;
  imgHeight.value = data.comic_info.comic_images[0].height;
  loading.value = false;
  showUtils.value = true;
  setAlready(id);
  recording(id);
};
const recordTop = (e) => {
  showUtils.value = false;
  let h = Math.ceil((imgHeight.value * browserWidth.value) / imgWidth.value);
  page.value = Math.ceil(e.target.scrollTop / h) + 2;
  // console.log(h);
};
const prevPage = () => {
  comic_info.value = [];
  loading.value = true;
  getReadData(previous_comic_info.value.id);
};
const nextPage = () => {
  comic_info.value = [];
  loading.value = true;
  getReadData(next_comic_info.value.id);
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
const goToRead = (a: number, b: boolean) => {
  console.log(a, b);
  if (b == true) {
    comic_info.value = [];
    loading.value = true;
    showBottom.value = false;
    getReadData(a);
  } else {
    showConfirmDialog({
      message: "疯狂漫画V我50",
    })
      .then(() => {})
      .catch(() => {});
  }
};
const recording = (a: number | string) => {
  let comicRead = {
    id: topic_info.value.id,
    comic_id: a,
    timeId: new Date().getTime(),
    title: topic_info.value.title,
    lookTitle: comic_info.value.title,
    cover_image_url: comic_info.value.cover_image_url,
    latest: comic_unfold.value[comic_unfold.value.length - 1].title,
    author: topic_info.value.user.nickname,
  };
  console.log(comicRead);

  setHistory(comicRead);
  updateBook(comicRead);
};

const changeSort = () => {
  comic_unfold.value = comic_unfold.value.reverse();
};
onMounted(() => {
  browserWidth.value = document.body.clientWidth;
  getReadData(props.id);
});
</script>
<script lang="ts">
export default {
  name: "read",
};
</script>
<template>
  <div class="read" @scroll="recordTop">
    <van-dialog> </van-dialog>
    <div v-show="loading" class="load">
      <van-loading size="24px" color="#1989fa" vertical>加载中...</van-loading>
    </div>
    <div class="box" v-for="(c, i) in comic_info.comic_images" :key="i">
      <img v-lazy="c.url" @click="showUtils = !showUtils" />
    </div>
    <van-popup
      v-model:show="showUtils"
      z-index="1999"
      :overlay="false"
      position="top"
      :style="{ height: '40px' }"
    >
      <div class="head">
        <div class="left">
          <van-icon name="arrow-left" size="22px" @click="goBack" />
          <p>{{ comic_info.title }}</p>
        </div>

        <div class="left">
          <van-icon name="wap-home-o" size="25px" @click="goHome" />
          <p class="delit" @click="goToDetail(topic_info.id)">详</p>
        </div>
      </div>
    </van-popup>
    <div class="bottom">
      <div class="zhan" v-if="previous_comic_info == null"></div>
      <img
        src="../assets/img/k7T1.png"
        @click="prevPage"
        v-if="previous_comic_info != null"
      />
      <div class="moom" @click="showBottom = !showBottom">目录</div>
      <img src="../assets/img/k7T.png" @click="nextPage" />
    </div>
    <div class="pages" v-if="comic_info.comic_images">
      <p>{{ comic_info.title }}</p>
      <p>{{ page }}/{{ comic_info.comic_images.length }}</p>
    </div>
    <van-popup
      v-model:show="showBottom"
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
        </div>
        <div class="catalog">
          <div class="box">
            <div
              class="assemble"
              v-for="c in comic_unfold"
              :key="c.id"
              :class="{ active: alread(c.id) }"
              @click="goToRead(c.id, c.is_free)"
            >
              <img :src="c.cover_image_url" />
              <div class="assemble-text">
                <div class="title">{{ c.title }}</div>
                <div class="update">
                  <span>{{ c.created_at }}</span>
                  <span>{{ c.likes_count }}</span>
                </div>
                <view class="gou" v-if="comic_id == c.id"></view>
                <div class="pay" v-if="c.is_pay_comic">付费</div>
              </div>
            </div>
          </div>
          <div class="top" v-if="showTop" @click="goTop">Top</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
.read {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
  z-index: 14;
  &::-webkit-scrollbar {
    display: none;
  }
  .box {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .head {
    display: flex;
    padding: 0 2.5vw;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    .delit {
      border-radius: 999px;
      padding: 2px 2px;
      border: 2px solid #757575;
      font-size: 13px;
      // line-height: 15px;
      color: #757575;
    }
    .left {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding: 5px 10px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);

    img {
      width: 25px;
      height: 25px;
    }
    .zhan {
      width: 25px;
      height: 25px;
    }
  }
  .pages {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    gap: 8px;
    border-top-right-radius: 10px;
    padding: 6px 10px;
    font-size: 12px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
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
            left: 15px;
            top: 10px;
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
}
</style>