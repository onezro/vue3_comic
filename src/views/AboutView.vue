<script setup lang="ts">
import { ref } from "vue";
import { useRecordStore } from "@/stores/record";
import { useRouter } from "vue-router";
import type { Bookself } from "@/typing";
import { showConfirmDialog } from "vant";

const longTouch = ref(false);
let timeOutEvent: number = 0;
const router = useRouter();
const store = useRecordStore();
const { setBookself } = store;

const goToRead = (id: string) => {
  clearTimeout(timeOutEvent);
  if (!longTouch.value) {
    router.push(`/read/${id}`);
  }
};
const longpress = (delBook: Bookself) => {
  clearTimeout(timeOutEvent);
  longTouch.value = false;
  timeOutEvent = setTimeout(() => {
    longTouch.value = true;
    if (longTouch.value) {
      showConfirmDialog({
        message: "是否删除取消关注",
      })
        .then(() => {
          setBookself(delBook);
        })
        .catch(() => {});
    }
  }, 500);
  return false;
};
</script>

<template>
  <div class="book">
      <van-dialog title="标题" show-cancel-button> </van-dialog>
    <div class="head-book">
      <span>书架</span>
    </div>
    <div class="book-box">
      <div
        class="card"
        v-for="b in store.bookself"
        :key="b.id"
        @touchstart.prevent="longpress(b)"
        @touchend="goToRead(b.comic_id)"
      >
        <img v-lazy="b.image" />
        <div class="text">
          <span class="title">{{ b.title }}</span>
          <span class="last-look">{{ b.lookTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  .head-book {
    position: sticky;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
    span {
      margin: auto;
      font-size: 16px;
      font-weight: 500;
      color: #777;
    }
  }
  .book-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 3vw;
    .card {
      display: flex;
      flex-direction: column;
      width: 110px;
      gap: 5px;

      img {
        border-radius: 5px;
        width: 100%;
        height: 146px;
      }

      .text {
        display: flex;
        flex-direction: column;
        width: 100%;
        .title {
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          /*禁止换行显示*/
          white-space: nowrap;
        }

        .last-look {
          margin-top: 3px;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          /*禁止换行显示*/
          white-space: nowrap;
        }
      }
    }
  }
}
</style>