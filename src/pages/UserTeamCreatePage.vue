<script setup>
import {onMounted, ref} from "vue";

const TeamRequest = ref({
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

const offset = ref({ x: 298, y: 560 });
const addTeam =  () => {
  router.push('/team/add');
}
import request from "../plugins/myAxios.js";
const count = ref(0);
const loading = ref(false);
onMounted(async ()=>{
  const result = await request.get('/team/list/my/create')
  teamList.value = result.data.records;
  total.value = result.data.total;
  console.log(teamList)
  if (result?.code === 0){
    // teamList.value = result.records;
  }else {
    showFailToast("加载队伍失败");
  }
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
const searchTeamList = ref([]);
const onSearch = async (searchText) =>{
  console.log(searchText);
  const result = await request.get('/team/list',{
    params: {
      searchText : searchText,
      pageSize : 8,
      pageNum : 1,
    }
  });
  searchTeamList.value = result.data.records;
  console.log(result.data.records);
}

const change = async () =>{
   const teamListData = await request.get('/team/list', {
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
  teamList.value = teamListData;
}

</script>

<template>
  <div>
    <span style="color: #a8a8a8;font-size: 17px;font-weight: bold;">我创建的队伍</span>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="searchText === ''">

    <team-card-list :team-list="teamList"/>
    <van-pagination v-if="total > 5" v-model="currentPage" :total-items="total" :items-per-page="pageSize" @change="change" force-ellipses/>

  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" icon="plus" @click="addTeam()" />

    <div style="height:700px;"></div>
  </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>