<script setup lang="ts">

import {onMounted, ref} from "vue";
import request from '../plugins/myAxios.js'
import {showFailToast, showSuccessToast, showToast} from "vant";
const userList = ref([]);
const pageSize = ref(8);
const total = ref(1);
const currentPage = ref(1);
const skeletonLoading = ref(false);
const allowLoad = ref(true);
onMounted(async () => {
  // setCurrentUserState(JSON.parse(localStorage.getItem("JuanJuUserLoginStatus")));
  await change()
  skeletonLoading.value = false;
})
const change = async () =>{
  allowLoad.value = true;
  const userListData = await request.get('/user/recommend', {
    params: {
      pageSize : pageSize.value,
      pageNum: currentPage.value,
    },
  }).then(function (response){
    // showSuccessToast("请求成功");
    total.value = response.data.total ;
    console.log(total.value)
    console.log(111)
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
  allowLoad.value = false;
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
  <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
    <a href="http://139.199.168.219:81/" target="_blank">点此访问用户中心</a>
  </van-notice-bar>
  <div>
    <van-swipe v-if="currentPage == 1" class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image src="https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/img/Snipaste_2024-09-08_19-41-48.png"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/img/image-20240908203236354.png"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/img/image-20240908195208394.png"/>
      </van-swipe-item>
    </van-swipe>
  </div>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" >

    <van-cell center title="匹配模式（24小时更新一次）" v-if="currentPage == 1">
      <template #right-icon>
        <van-switch v-model="isMatchModel" @click="loadData()" />
      </template>
    </van-cell>
  <user-card-list :user-list="userList" :skeleton-loading="skeletonLoading" :total="total" :allow-load="allowLoad"></user-card-list>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="数据为空" />
  <van-back-top immediate />


  </van-pull-refresh>
  <div style="height: 60px;"></div>

</template>

<style scoped>
.van-swipe {
  margin: 0px 5px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
</style>