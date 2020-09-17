import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../firebase";
import store from "../store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/Logout.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/update",
    name: "Update",
    props: true,
    component: () =>
      import(/* webpackChunkName: "update" */ "../views/Update.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "Calendar",
    props: true,
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/entry",
    name: "Entry",
    component: () =>
      import(/* webpackChunkName: "entry" */ "../views/Entry.vue"),
  },
  {
    path: "/list",
    name: "List",
    props: true,
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && (!auth.currentUser || !store.state.userProfile.token)) {
    next("/login");
  } else {
    next();
  }
});

export default router;
