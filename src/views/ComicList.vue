<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import type { List, Topic } from "../typing";
import { Api } from "../api";
import CardList from "@/components/CardList.vue";
const router = useRouter();
const list = ref<List[]>([
  {
    rank_id: 9,
    title: "人气榜",
  },
  {
    rank_id: 2,
    title: "新作榜",
  },
  {
    rank_id: 7,
    title: "飙升榜",
  },
  {
    rank_id: 11,
    title: "韩漫榜",
  },
  {
    rank_id: 28,
    title: "免费榜",
  },
  {
    rank_id: 12,
    title: "完结榜",
  },
]);
const boardList = ref<Topic[]>([]);
const tag = ref<number>(9);
const loading = ref<boolean>(true);
onMounted(() => {
  getBoardList();
});
const goBack = () => {
  router.go(-1);
};
const getBoardList = async () => {
  let { data } = await Api.getBoard(tag.value);
  boardList.value = data.data.rank_info.topics;
  loading.value = false;
};
const chooseTag = ({ name }) => {
  tag.value = name;
  loading.value = true;
  boardList.value = [];
  getBoardList();
};
</script>
<script lang="ts">
export default {
  name: "list",
};
</script>
<template>
  <div class="list">
    <div class="head">
      <van-icon name="arrow-left" size="20px" @click="goBack" />
      <p>排行榜</p>
    </div>
    <van-tabs
      sticky
      color="#f0ac24"
      line-width="20px"
      title-active-color="#343434"
      @click-tab="chooseTag"
    >
      <van-tab
        v-for="l in list"
        :title="l.title"
        :name="l.rank_id"
        :key="l.rank_id"
      >
        <div v-show="loading">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <CardList :boardList="boardList" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.list {
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
}
</style>