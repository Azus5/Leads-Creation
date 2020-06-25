import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Leads from "../views/Leads.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/leads/create",
    name: "Leads",
    component: Leads,
    meta: {
      title: "Create lead",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
