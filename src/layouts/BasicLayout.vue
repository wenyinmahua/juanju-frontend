<script setup>
import 'vant/es/toast/style'
import { useRouter} from "vue-router";
import {ref} from "vue";
import {routes} from "../router/index.js"
const title = ref("匹配");
const router = useRouter()
const DEFAULT_TITLE = "匹配";

router.beforeEach((to, from) => {
  const toPath = to.path;
  routes.find((parentRoute) => {
    if (toPath === parentRoute.path) {
      return parentRoute;
    }
    if (parentRoute.children && parentRoute.children.length > 0) {
      const childRoute = parentRoute.children.find((routeChild) => toPath === routeChild.path);
      if (childRoute) {
        title.value = childRoute.title ?? DEFAULT_TITLE;
        return childRoute;
      }
    }
    return false;
  });
})

const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push('/search')
};
</script>

<template>
  <van-sticky>
  <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>

  </van-nav-bar>
  </van-sticky>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="flag-o" to="/team" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="contact-o" to="/user" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.van-nav-bar {
  position: relative;
  z-index: var(--van-nav-bar-z-index);
  line-height: var(--van-line-height-lg);
  text-align: center;
  background: #ffffff;
  -webkit-user-select: none;
  user-select: none;
}
</style>
