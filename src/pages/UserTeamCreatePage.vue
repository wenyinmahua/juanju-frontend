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
  for (let i = 0; i < teamList.value.length; i++) {
    teamList.value[i].join = true;
  }
  total.value = result.data.total;
  console.log(teamList)
  if (result?.code === 0){
    // teamList.value = result.records;
  }else {
    showFailToast("加载队伍失败");
  }
})


</script>

<template>
  <div>
    <span style="color: #a8a8a8;font-size: 17px;font-weight: bold;">我创建的队伍</span>

    <team-card-list :team-list="teamList"/>
    <van-pagination v-if="total > 5" v-model="currentPage" :total-items="total" :items-per-page="pageSize" force-ellipses/>

  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" icon="plus" @click="addTeam()" />
  </div>
</template>

<style scoped>

</style>