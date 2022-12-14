<script setup lang="ts">
import { useRouter } from "vue-router";
import { useRecordStore } from "@/stores/record";
const store = useRecordStore();
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
const getData = (time: number) => {
  let date = new Date(time);
  let y = date.getFullYear(); //获取年份
  let m = date.getMonth() + 1; //获取月份
  m = m < 10 ? "0" + m : m; //月份不满10天显示前加0
  let d = date.getDate(); //获取日期
  d = d < 10 ? "0" + d : d; //日期不满10天显示前加0
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let min = date.getMinutes();
  min = min < 10 ? "0" + min : min;
  return y + "-" + m + "-" + d + " " + h + ":" + min;
};
const goToRead = (id: string) => {
  router.push(`/read/${id}`);
};
</script>
<template>
  <div class="history">
    <div class="head">
      <van-icon name="arrow-left" size="22px" @click="goBack" />
      <span>阅读历史</span>
    </div>
    <div
      class="card"
      v-for="h in store.historyComic"
      :key="h.id"
      @click="goToRead(h.comic_id)"
    >
      <div
        class="img"
        :style="{ backgroundImage: 'url(' + h.cover_image_url + ')' }"
      ></div>
      <div class="info">
        <p class="title">{{ h.title }}</p>
        <div class="last">阅读至：{{ h.lookTitle }}</div>
        <p class="time">{{ getData(h.timeId) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 15;
  .head {
    position: sticky;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 0 3vw;
    width: 100%;
    height: 45px;
    background-color: #fff;
    span {
      margin: auto;
    }
  }
  .card {
    display: flex;
    gap: 10px;
    padding: 0 3vw;
    padding-bottom: 10px;

    .img {
      border-radius: 5px;
      width: 80px;
      height: 106px;
      background-repeat: no-repeat;
      background-size: 185px 106px;
      background-position: center;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .last {
        font-size: 14px;
        //  overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
      }

      .time {
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>