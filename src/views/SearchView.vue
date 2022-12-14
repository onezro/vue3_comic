<script setup lang="ts">
import { ref } from "vue";
import { Api } from "../api";
import { useRouter } from "vue-router";
import type { Text_info, Hit_info } from "@/typing";
import { useRecordStore } from "@/stores/record";
import { showConfirmDialog } from "vant";

const searchText = ref("");
const keyWord = ref<Text_info[]>([]);
const initial = ref<Text_info[]>([]);
const hit = ref<Hit_info>({});
const showKeyWord = ref(true);
const showBox = ref(false);
const loading = ref(false);
const longTouch = ref(false);
let timeOutEvent: number = 0;
const router = useRouter();
const store = useRecordStore();
const { setSearchText, delSearchText, removeSearchText } = store;

const getHotword = async (text: string) => {
  let { data } = await Api.getHotwordList(text);
  initial.value = data.info;
  addLight(data.info);
};

const getSearchData = async (text: string) => {
  let { data } = await Api.getSearch(text);
  hit.value = data.hit;
  loading.value = false;
};

const inputText = (text) => {
  if (text) {
    showKeyWord.value = false;
    getHotword(text);
  } else {
    showKeyWord.value = true;
    keyWord.value = [];
  }
};

const confirm = (text) => {
  showBox.value = true;
  loading.value = true;
  let recordText = {
    text: searchText.value,
    id: new Date().getTime(),
  };
  setSearchText(recordText);
  getSearchData(searchText.value);
};

const focus = () => {
  showBox.value = false;
  hit.value = {};
  searchText.value = "";
  showKeyWord.value = true;
};

const cancel = () => {
  router.go(-1);
  searchText.value=''
};

const choose = (index: number) => {
  searchText.value = initial.value[index].title;
  keyWord.value = [];
  let recordText = {
    text: initial.value[index].title,
    id: new Date().getTime(),
  };
  setSearchText(recordText);
  showBox.value = true;
  loading.value = true;
  getSearchData(searchText.value);
};

const goBack = () => {
  showBox.value = false;
  hit.value = {};
  searchText.value = "";
  showKeyWord.value = true;
};

const goTodetail = (a: number | string) => {
  router.push(`/detil/${a}`);
};

const addLight = (textArr: Array<Text_info>) => {
  let reg = new RegExp(searchText.value, "ig");
  let rep = [];
  textArr.forEach(({ title }) => {
    let b = title.replace(
      reg,
      (val) => `<span style="color: #e2b221">${val}</span>`
    );
    rep.push(b);
  });
  keyWord.value = rep;
};

const onSearch = (text: string) => {
  clearTimeout(timeOutEvent);
  if (!longTouch.value) {
    showBox.value = true;
    loading.value = true;
    searchText.value = text;
    let recordText = {
      text: searchText.value,
      id: new Date().getTime(),
    };
    setSearchText(recordText);
    getSearchData(searchText.value);
  }
};
const gtouchstart = (id: string) => {
  clearTimeout(timeOutEvent);
  longTouch.value = false;
  timeOutEvent = setTimeout(() => {
    longTouch.value = true;
    if (longTouch.value) {
      showConfirmDialog({
        message: "是否删除该条历史记录",
      })
        .then(() => {
           delSearchText(id);
        })
        .catch(() => {});
    }
  }, 500);
  return false;
};
</script>


<template>
  <div class="search">
    <van-dialog title="标题" show-cancel-button> </van-dialog>
    <div class="head">
      <van-icon
        name="arrow-left"
        size="24px"
        v-show="showBox"
        @click="goBack"
      />
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @update:model-value="inputText"
        @search="confirm"
        @cancel="cancel"
        @focus="focus"
      />
    </div>
    <div class="box-history" v-show="!showBox">
      <div class="history" v-show="showKeyWord">
        <div class="title">
          <div>历史</div>
          <div @click="removeSearchText">X</div>
        </div>
        <div class="text">
          <span
            v-for="s in store.searchTitle"
            :key="s.id"
            @touchstart.prevent="gtouchstart(s.id)"
            @touchend="onSearch(s.text)"
            >{{ s.text }}</span
          >
        </div>
      </div>
      <div class="keyword" v-show="!showKeyWord">
        <div class="word" v-for="(k, i) in keyWord" :key="i">
          <div v-html="k" @click="choose(i)"></div>
        </div>
      </div>
    </div>
    <div class="box" v-show="showBox">
      <div v-show="loading">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
      <div class="card" v-for="h in hit" :key="h.id" @click="goTodetail(h.id)">
        <img v-lazy="h.vertical_image_url" />
        <div class="card-meg">
          <div class="card-head">
            <div class="title">{{ h.title }}</div>
            <div class="tags">
              <p v-for="c in h.category" :key="c">{{ c }}</p>
            </div>
            <div class="des">{{ h.description }}</div>
          </div>
          <div class="card-bottom">
            <div class="news">最新：{{ h.latest_comic_title }}</div>
            <div class="author">作者：{{ h.user.nickname }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
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
  .head {
    position: sticky;
    left: 0;
    top: 0;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    width: 100%;
    height: 54px;
    background-color: white;
    .van-search {
      flex: 1;
    }
  }
  .box-history {
    padding: 0 3vw;
    width: 100%;
    // margin-top: 5px;
    .history {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .title {
        display: flex;
        justify-content: space-between;
      }
      .text {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        span {
          border-radius: 999px;
          font-size: 14px;
          padding: 6px 10px;
          background-color: #f0f0f0;
        }
      }
    }
    .keyword {
      .word {
        padding: 10px 0;
        font-weight: bold;
      }
    }
  }
  .box {
    padding: 0 3vw;
    .card {
      display: flex;
      gap: 10px;
      width: 100%;
      height: 133px;
      margin-bottom: 10px;

      img {
        border-radius: 5px;
        width: 100px;
        height: 133px;
      }

      .card-meg {
        padding: 5px 0;
        width: 480px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        .card-head {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .title {
            font-size: 16px;
            font-weight: bold;
            color: #e2b221;
          }

          .tags {
            display: flex;
            gap: 7px;

            p {
              box-sizing: border-box;
              padding: 0 8px;
              border: 1px solid #f0ac24;
              border-radius: 8px;
              font-size: 12px;
              font-weight: bold;
              color: #f0ac24;
            }
          }

          .des {
            font-size: 12px;
            color: #888;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .card-bottom {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
          .author {
            font-size: 13px;
            color: #5a5a5a;
          }
        }
      }
    }
  }
}
</style>