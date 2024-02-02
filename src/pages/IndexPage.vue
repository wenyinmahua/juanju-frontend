<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
const route = useRoute()
const { tags } = route.query;
import request from '../plugins/myAxios.js'
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs';
const userList = ref([]);

onMounted(async () => {
  const userListData = await request.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  }).then(function (response){
    console.log('/user/search/tags succeed',response)
    return response.data;
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
  }
})





</script>

<template>

  <van-card
      v-for="user in userList"
      :desc="`${user.profile}`"
      :title="`${user.username}(${user.stuId})`"
      :thumb='user.avatarUrl'
  >
    <template #tags >
      <van-tag plain type="primary" v-for="tag in  user.tags" style="margin-right: 8px;margin-top: 8px;">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="搜索结果为空" />
  <van-back-top immediate />
  <div style="height: 60px;"></div>
</template>

<style scoped>

</style>