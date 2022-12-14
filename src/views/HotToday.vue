<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Api } from "../api";
import type { Topic } from "../typing";
import CardList from "@/components/CardList.vue";
import { useCounterStore } from "@/stores/counter";

const router = useRouter();
const pos = ref<number>(0);
const hotList = ref<Topic[]>([]);
const loading = ref<boolean>(true);
const store = useCounterStore();
const { week_days } = store;

onMounted(() => {
  getHotData();
});
const goBack = () => {
  router.go(-1);
};
const goTodetail=(a:number|string)=>{
   router.push(`/detil/${a}`)
}
const getHotData = async () => {
  let { data } = await Api.getHot(pos.value);
  hotList.value = data.data.topics;
  loading.value = false;
};
const chooseTag = ({ name }) => {
  pos.value = name;
  loading.value = true;
  hotList.value = [];
  console.log(name);
  getHotData();
};
</script>
<script lang="ts">
export default {
    name:'hot'
}
</script>
<template>
  <div class="hot-list">
    <div class="head">
      <van-icon name="arrow-left" size="20px" @click="goBack" />
      <p>每日更新</p>
    </div>
    <van-tabs
      sticky
      color="#f0ac24"
      line-width="20px"
      title-active-color="#343434"
      @click-tab="chooseTag"
    >
      <van-tab v-for="(w, i) in week_days" :title="w" :name="i" :key="i">
        <div v-show="loading">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <div class="topics">
          <div
            class="card"
            v-for="r in hotList"
            :key="r.id"
            @click="goTodetail(r.id)"
          >
            <img v-lazy="r.vertical_image_url" />
            <div class="comci-text">{{ r.title }}</div>
            <div class="update-text" v-for="(t,i) in r.tags" :key="i"><span>{{t}} </span></div>
          </div>
         </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.hot-list {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 12;
  .head {
    position: sticky;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 0 2vw;
    // border-bottom: 2px solid #eee;
    width: 100%;
    height: 40px;
    p {
      margin: auto;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .topics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px 3.5vw 0 3.5vw;
  width: 100%;
  height: calc(100vh - 84px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
      line-height: 15px;
      color: #939090;
       white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card:nth-child(n + 4) {
    margin-top: 10px;
  }
}
}
</style>