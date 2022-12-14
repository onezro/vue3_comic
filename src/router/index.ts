import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/book",
      name: "book",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserInfo.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("../views/ComicList.vue"),
    },
    {
      path: "/hot",
      name: "hot",
      component: () => import("../views/HotToday.vue"),
    },
    {
      path: "/detil/:id",
      name: "detil",
      props: true,
      component: () => import("../views/DetilComic.vue"),
    },
    {
      path: "/read/:id",
      name: "read",
      props: true,
      component: () => import("../views/ReadView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/history",
      name: "history",
      component: () => import("../views/HistoryView.vue"),
    },
  ],
});

export default router;
