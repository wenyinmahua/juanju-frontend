<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import request from '../plugins/myAxios.js'
import {showFailToast, showSuccessToast, showToast} from "vant";
const userList = ref([]);
const pageSize = ref(8);
const total = ref(1);
const currentPage = ref(1);
// import {setCurrentUserState} from "../store/user.js";
const skeletonLoading = ref(false);
onMounted(async () => {
  // setCurrentUserState(JSON.parse(localStorage.getItem("JuanJuUserLoginStatus")));
  await change()
  skeletonLoading.value = false;
})
const change = async () =>{
  const userListData = await request.get('/user/recommend', {
    params: {
      pageSize : pageSize.value,
      pageNum: currentPage.value,
    },
  }).then(function (response){
    showSuccessToast("请求成功");
    total.value = response.data.total ;
    return response.data.records;
  }).catch(function (err){
    showFailToast("请求失败");
  })
  if(userListData){
    userListData.forEach(user =>{
      if(user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
}

const loading = ref(false);
const onRefresh =  () => {
  setTimeout(async () => {
    showToast('刷新成功');
    loading.value = false;
    if (isMatchModel.value) {
      return;
    } else {
      await change();
    }

  }, 1000);
};
type ModeType = 'default' | 'match';
const mode = ref<ModeType>("default");
const isMatchModel = ref(<boolean>false);
const doMatch = async() =>{
  mode.value = "match";
  const num = 10;
  const userListData = await request.get('/user/match', {
    params: {
      num,
    },
  }).then(function (response){
    console.log('/user/match succeed',response)
    // showSuccessToast("请求成功");
    total.value = response.data.total;
    return response.data;
  }).catch(function (err){
    console.error('/user/match',err)
    showFailToast("请求失败，请确认你的标签不为空");
  })
  if(userListData){
    userListData.forEach(user =>{
      if(user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
}

const loadData = async () =>{
  skeletonLoading.value = true;
  if(isMatchModel.value){
    await doMatch();
  }else {
    await change();
  }
  skeletonLoading.value = false;
}

</script>


<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" >
  <van-swipe v-if="currentPage == 1" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>广告预留区</van-swipe-item>
    <van-swipe-item>通知预留区1</van-swipe-item>
    <van-swipe-item>通知预留区2</van-swipe-item>
    <van-swipe-item>通知预留区3</van-swipe-item>
  </van-swipe>

    <van-cell center title="匹配模式（24小时更新一次）" v-if="currentPage == 1">
      <template #right-icon>
        <van-switch v-model="isMatchModel" @click="loadData()" />
      </template>
    </van-cell>
  <user-card-list :user-list="userList" :skeleton-loading="skeletonLoading"></user-card-list>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="数据为空" />
  <van-back-top immediate />

  <van-pagination v-model="currentPage" v-if="total > 8" :total-items="total" :items-per-page="pageSize" @change="change" force-ellipses/>

  </van-pull-refresh>
  <div style="height: 60px;"></div>

</template>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  background-color: #39a9ed;
}
</style>