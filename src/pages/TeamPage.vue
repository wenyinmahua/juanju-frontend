<script setup>
import {onMounted, ref} from "vue";

const TeamRequest = ref({
  id:'',
  name:'',
  description:'',
  avatarUrl:'',
  maxNum:'',
  status:'',
  teamPassword:'',
  expireTime:'',
  userId:'',
  category:''
});
const currentPage = ref(1);
const pageSize = ref(5);
const pageNum = ref(1);
const total = ref(0);

const teamList = ref([]);

import {useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const addTeam =  () => {
  router.push('/team/add');
}
import request from "../plugins/myAxios.js";
const count = ref(0);
const loading = ref(false);
onMounted(async ()=>{
  await onSearch('',0)
})
const onRefresh = () => {
  setTimeout(() => {
    showSuccessToast('刷新成功');
    loading.value = false;
    count.value++;
  }, 1000);
};
const active = ref(0);
const searchText = ref('');
// const searchTeamList = ref([]);
const onSearch = async (searchText, status) =>{
  const result = await request.get('/team/list',{
    params: {
      searchText : searchText,
      status : status,
      pageSize : 8,
      pageNum : 1,
    }
  });
  if (result?.code !== 0){
    showFailToast("加载队伍失败")
  }
  teamList.value = result.data?.records;

}

const change = async () =>{
   const teamListData = await request.get('/team/list', {
    params: {
      pageSize : pageSize.value,
      pageNum: currentPage.value,
    },
  }).then(function (response){
    // showSuccessToast("请求成功");
    total.value = response.data.total ;
    return response.data.records;
  }).catch(function (err){
    showFailToast("请求失败");
  })
  teamList.value = teamListData;
}


const onTabChange = async (name) =>{
  if (name === 'public'){
    await onSearch(searchText.value,0);
  }else {
    await onSearch(searchText.value,2);
  }
}

</script>

<template>
  <div>
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <div v-if="searchText !== ''" style="height: 110vh">
      <van-tabs v-model:active="active" @change="onTabChange">
        <van-tab title="公开" name="public" />
        <van-tab title="加密" name="private" />
      </van-tabs>
      <team-card-list :team-list="teamList"/>
      <van-pagination v-if="total > 5" v-model="currentPage" :total-items="total" :items-per-page="pageSize" @change="change" force-ellipses/>
    </div>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="searchText === ''">
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <team-card-list :team-list="teamList"/>
  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" icon="plus" @click="addTeam()" />

    <div style="height:60px;"></div>
  </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>