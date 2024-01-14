<script setup>
import { showToast } from 'vant';
import { ref } from "vue";
const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);
const onClickLeft = () =>alert("左")
const onClickRight = () => alert("右");
// import 'vant/es/notify/style'
import 'vant/es/toast/style'

import Index from "../pages/Index.vue";
import User from "../pages/User.vue";
import Team from "../pages/Team.vue";
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
    <template v-if="active === 'index'">
      <Index/>
    </template>
    <template v-if="active === 'team'">
      <Team/>
    </template>
    <template v-if="active === 'user'">
      <User/>
    </template>
  </div>


  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>