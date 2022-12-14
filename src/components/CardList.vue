<script lang="ts" setup>
import { defineEmits } from "vue";
import type { Topic } from "../typing";
import {useRouter} from "vue-router"
const router=useRouter()
const props = defineProps<{ boardList: Array<Topic> }>();
const goTodetail=(a:number)=>{
   router.push(`/detil/${a}`)
}
</script>
<template>
  <div class="topics">
    <div
      class="card"
      v-for="r in boardList"
      :key="r.id"
      @click="goTodetail(r.id)"
    >
      <img v-lazy="r.vertical_image_url" />
      <div class="comci-text">{{ r.title }}</div>
      <div class="update-text">{{ r.latest_comic.title }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.topics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 3.5vw;
  padding-top: 5px;
  width: 100%;
  height: 100vh;
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
</style>