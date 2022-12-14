<script setup lang="ts">
import { onUpdated } from "vue";
import { useRouter } from "vue-router";
import { useRecordStore } from "@/stores/record";
const router = useRouter();
const store = useRecordStore();
const { cancellation } = store;
const goToLogin = () => {
  router.push("/login");
};
const goToHistory = () => {
  router.push("/history");
};
</script>
<script lang='ts'>
export default {
  name: "user",
};
</script>
<template>
  <div class="user">
    <div class="bg">
      <div class="user-info">
        <img src="../assets/img/md.png" />
        <p>{{ store.loginInfo.username }}</p>
        <div
          @click="goToLogin"
          class="login"
          v-show="!store.loginInfo.username"
        >
          登录
        </div>
      </div>
    </div>
    <div
      class="cancellation"
      v-show="store.loginInfo.username"
      @click="cancellation"
    >
      注消
    </div>
    <div class="box">
      <div class="history" @click="goToHistory">
        <img src="../assets/img/l2.png" />
        <p>阅读历史</p>
      </div>
      <div class="history">
        <img src="../assets/img/l3.png" />
        <p>我的评书</p>
      </div>
      <div class="history">
        <img src="../assets/img/l4.png" />
        <p>我的消息</p>
      </div>
      <div class="history">
        <img src="../assets/img/l1.png" />
        <p>缓存管理</p>
      </div>
    </div>
    <!-- <div class="reatly">
      <div class="top"><p>最近阅读</p></div>
      <div class="card">
        <div class="img" v-for="h in store.historyComic" :key="h.id" :style="{ backgroundImage: 'url(' + h.cover_image_url + ')' }"></div>
      </div>
    </div> -->
    <div class="other">
      <p class="text">其他功能</p>
      <div class="like">
        <div class="like-text">
          <img src="../assets/img/bl.png" />
          <p>阅读喜好</p>
        </div>
        <img src="../assets/img/c2.png" />
      </div>
      <div class="like">
        <div class="like-text">
          <img src="../assets/img/bm.png" />
          <p>换肤样式</p>
        </div>
        <img src="../assets/img/c2.png" />
      </div>
      <div class="like">
        <div class="like-text">
          <img src="../assets/img/bj.png" />
          <p>反馈找书</p>
        </div>
        <img src="../assets/img/c2.png" />
      </div>
      <div class="like">
        <div class="like-text">
          <img src="../assets/img/bk.png" />
          <p>反馈帮助</p>
        </div>
        <img src="../assets/img/c2.png" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user {
  position: relative;
  padding-bottom: 50px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .bg {
    display: flex;
    width: 100%;
    height: 45vh;
    background-image: url(../assets/img/no.png);
    background-size: 100% 45vh;
    background-repeat: no-repeat;

    .user-info {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      img {
        border-radius: 999px;
        width: 60px;
        height: 60px;
      }

      p {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }
      .login {
        padding: 5px 10px;
        border-radius: 999px;
        color: orange;
        background-color: #fff;
      }
    }
  }
  .cancellation {
    position: absolute;
    right: 10px;
    top: 20px;
    color: #fff;
  }
  .box {
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 8px;
    left: 15px;
    top: 40%;
    width: calc(100% - 30px);
    // height: 150px;
    background-color: #fff;
    box-shadow: 0px 2px 5px #d6d6d6;

    .history {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;

      img {
        width: 28px;
        height: 28px;
      }

      text {
        font-size: 13px;
      }
    }
  }
  .other {
    margin-top: 60px;
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    .text {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .like {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      .like-text {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 25px;
          height: 25px;
        }
        text {
          font-size: 13px;
        }
      }
      img {
        width: 9px;
        height: 12px;
      }
    }
  }
  .reatly {
    margin-top: 60px;
   
    .top {
       padding: 0 15px;
      font-size: 16px;
      font-weight: bold;
    }
    .card {
      display: flex;
      margin-top: 10px;
      gap: 10px;
      margin-left: 3.5vw;
      overflow: hidden;
      .img {
        border-radius: 5px;
        width: 80px;
        height: 106px;
        background-repeat: no-repeat;
        background-size: 185px 106px;
        background-position: center;
      }
    }
  }
}
</style>
