<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import request from '../plugins/myAxios.js'
import qs from 'qs';
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute()
const { tags } = route.query;
const userList = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const pageNum = ref(1);
const total = ref(0);
const skeletonLoading = ref(true);
onMounted(async () => {
  const userListData = await request.get('/user/search/tags', {
    params: {
      pageSize : pageSize.value,
      pageNum: pageNum.value,
      tagNameList: tags,
    },
    //参数序列化
    paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  }).then(function (response){
    console.log('/user/search/tags succeed',response)
    total.value = response.data.total;
    return response.data.records;
  }).catch(function (err){
    console.error('/user/search/tags failed',err)
  })
  if(userListData){
    userListData.forEach(user =>{
      if(user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
    skeletonLoading.value = false;
  }
})

const change = async () =>{
  const userListData = await request.get('/user/search/tags', {
    params: {
      pageSize : pageSize.value,
      pageNum: currentPage.value,
      tagNameList: tags,
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  }).then(function (response){
    // showSuccessToast("请求成功");
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




</script>

<template>

  <user-card-list :user-list="userList" :skeleton-loading="skeletonLoading"></user-card-list>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="搜索结果为空" />
  <van-back-top immediate />
  <van-pagination v-if="total > 5" v-model="currentPage" :total-items="total" :items-per-page="pageSize" @change="change" force-ellipses/>

  <div style="height: 60px;"></div>
</template>

<style scoped>

</style>