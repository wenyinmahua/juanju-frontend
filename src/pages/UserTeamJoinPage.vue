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
  category:'',
  join:true,
});
const total = ref(0);

const teamList = ref([]);
import {showFailToast} from "vant";

import request from "../plugins/myAxios.js";
onMounted(async ()=>{
  const result = await request.get('/team/list/my/join')
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
  <div class="content">
    <span style="color: #a8a8a8;font-size: 17px;font-weight: bold;">我加入的队伍</span>
    <team-card-list :team-list="teamList"/>
    <span style="color: #a8a8a8;font-size: 17px;font-weight: bold;display: block;text-align: center; ">已加入{{teamList.length}}个队伍</span>
  </div>
</template>

<style scoped>
.content {
  height: 125vh;
  background-color: #f7f7f7;
}
</style>