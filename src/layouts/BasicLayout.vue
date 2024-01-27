<script setup>
import { showToast } from 'vant';
import 'vant/es/toast/style'
import {useRouter} from "vue-router";
// import { ref } from "vue";
// const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);
const router = useRouter()
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
</script>

<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

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
    <van-tabbar-item icon="search" to="/team" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/user" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>