<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <van-tabbar route active-color="#f0ac24" z-index="12">
    <van-tabbar-item replace to="/" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/book" icon="bookmark-o">书架</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  
   <RouterView v-slot="{ Component,route }">
    <transition :name="route.meta.transitionName">
      <keep-alive :exclude="['list','hot','detail','read','user']">
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .5s;
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}

.slide-right-enter-from.home,
.slide-right-leave-to.home {
  transform: translateX(-35%);
}


.slide-right-leave-active.home {
  transition: all .5s linear;
}

.slide-right-enter-active.home {
  transition: all .3s;
}


.slide-right-enter-to.home,
.slide-right-leave-from.home {
  transform: translateX(0);
}
</style>
