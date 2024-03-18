<script setup>
import { showToast } from 'vant';
import 'vant/es/toast/style'
import { useRouter} from "vue-router";
import {ref} from "vue";
import {routes} from "../router/index.js"
// import { ref } from "vue";
// const active = ref("index");
const title = ref("伙伴匹配");
// const onChange = (index) => showToast(`标签 ${index}`);
const router = useRouter()
const DEFAULT_TITLE = "伙伴匹配";

router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((parentRoute) => {
    if (toPath === parentRoute.path) {
      return parentRoute;
    }

    if (parentRoute.children && parentRoute.children.length > 0) {
      const childRoute = parentRoute.children.find((routeChild) => toPath === routeChild.path);

      // 如果找到了子路由，将标题修改为恰当内容，则返回该子路由？？返回没有用，不会写，所以你懂的，目的只是为了  ：：title.value = childRoute.title ?? DEFAULT_TITLE;
      if (childRoute) {
        title.value = childRoute.title ?? DEFAULT_TITLE;
        return childRoute;
      }
    }
    // 没有找到匹配项则继续查找下一个顶级路由
    return false;
  });
})

const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push('/search')
};
// import 'vant/es/notify/style'
// import Index from "../pages/IndexPage.vue";
// import User from "../pages/UserPage.vue";
// import Team from "../pages/TeamPage.vue";

// const theme = ref('light');
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
<!--  <van-config-provider :theme="theme"><van-icon name="eye" @click="theme= 'dark'"/></van-config-provider>-->
<!--  <van-config-provider theme="dark"></van-config-provider>-->
  <div id="content">
    <router-view />
<!--    <template v-if="active === 'index'">-->
<!--      <Index/>-->
<!--    </template>-->
<!--    <template v-if="active === 'team'">-->
<!--      <Team/>-->
<!--    </template>-->
<!--    <template v-if="active === 'user'">-->
<!--      <User/>-->
<!--    </template>-->
  </div>


<!--  <van-tabbar v-model="active" @change="onChange" route>-->
  <van-tabbar  @change="onChange" route>
    <van-tabbar-item icon="home-o" to="/" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/team" name="team">队伍</van-tabbar-item>
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