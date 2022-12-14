<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  topics: any;
}>();
const goTodetail=(a:number|string)=>{
   router.push(`/detil/${a}`)
}
</script>
<template>
  <div class="catalog-sets">
    <div
      class="analecta-box"
      v-for="r in topics"
      :key="r.id"
      @click="goTodetail(r.id)"
    >
      <img v-lazy="r.vertical_image_url" />
      <div class="tags">
        <p>{{ r.title }}</p>
        <span v-for="(b, i) in r.tags" :key="b">{{ i > 1 ? "" : b }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.catalog-sets {
  display: flex;
  gap: 8px;
  margin-left: 3.5vw;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .analecta-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 115px;
    // height: 200px;
    img {
      border-radius: 5px;
      width: 115px;
    }

    .tags {
      p {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 12px;
        color: goldenrod;
      }
    }
  }
}
</style>