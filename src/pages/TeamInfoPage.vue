<script setup lang="ts">

import {useRoute} from "vue-router";

const team = ref({
  id: -1,
  userId:-1,
  name: '',
  maxNum:0,
  createUser:'',
  description:'',
  expireTime:new Date(),
  teamPassword:'',
  category:'',
  hasJoin:false,
  hasJoinNum:'',
  createTime: new Date(),
  avatarUrl: null,
  status:-1,
});
import request from "../plugins/myAxios.js";
import {onMounted, ref} from "vue";
const route = useRoute();
onMounted(async()=> {
  const id = ref(route.query.id as string);
  const result = await request.get("/team/info",{
    params:{
      id: id.value,
    }
  })
  console.log(team.value)
  team.value = result.data;
})
const currentUser = ref();
import {getCurrentUserService} from '../api/user'
import {showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";
import {joinTeamService, quitTeamService} from "../api/team";
import router from "../router";
onMounted(async()=> {
  currentUser.value = await getCurrentUserService();
})

const quitTeamDialog = (teamId) =>{
  showConfirmDialog({
    message:
        '是否退出该队伍？',
  }).then(() => {
        quitTeam(teamId);
      }
  ).catch(() => {});
}

const quitTeam = async(id) =>{
  const result = await quitTeamService(id);
  if (result?.code === 0){
    showSuccessToast("退出队伍成功");
    router.push("/team");

  }else {
    showFailToast("退出队伍失败")
  }
}

const joinTeamDialog = (teamId) =>{
  if (team.value.status=== 0){
    showConfirmDialog({
      message:
          '是否加入该队伍？',
    }).then(() => {
          joinTeam(teamId);
        }
    ).catch(() => {});
  }else {
    joinEncryptTeamDialog(teamId)
  }
}
const showPassDialog = ref(false);
const teamPassword = ref('');
const joinEncryptTeamDialog = async (teamId)=>{
  showPassDialog.value = true;
}
const joinEncryptTeam = async (teamPassword:string) =>{
  const result = await request.post('/team/join',{teamId:team.value.id,teamPassword});
  if (result?.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
    team.value.hasJoin = true;
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}

const joinTeam = async (teamId:Number) =>{
  const result = await joinTeamService(teamId);
  if (result.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
    team.value.hasJoin = true;
    // 重新获取队伍列表
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}
const updateTeam= (teamId:number) =>{
  router.push({
        path: "/team/update",
        query: {teamId},
      }
  );
}

import {deleteTeamService} from '../api/team'
const deleteTeam = async (id) =>{
  const result = await deleteTeamService(id);
  if (result.code === 0){
    showSuccessToast("删除队伍成功")
  }
}

const deleteTeamDialog = (teamId) =>{
  showConfirmDialog({
    message:
        '是否解散该队伍？',
  }).then(() => {
        deleteTeam(teamId);
      }
  ).catch(() => {});
}


</script>

<template>

  <div class="content">

    <template v-if="team">
      <div class="image">
        <van-image
            round
            width="8rem"
            height="8rem"
            :src="team.avatarUrl ? team.avatarUrl: 'https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/49e9401e-c6e0-4f38-bb18-588a750ebd4b.png'"
        />
      </div>
      <van-cell  icon="team-o">
        <template #title>
          <span  style="color: #a8a8a8;font-size: large">{{team.name}}</span>的队伍信息
        </template>
      </van-cell>
      <van-cell title="队伍id" :value="team.id" icon="manager-o" />
      <van-cell title="队伍昵称" :value="team.name ? team.name : '查询失败'" icon="contact-o" />
      <van-cell title="队长昵称" :value="team.createUser ? team.createUser : '查询失败'" icon="contact-o" />
      <van-cell title="队伍简介" :value="team.description ? team.description : '查询失败'" icon="notes-o" />
      <van-cell title="队伍人数" :value="team.hasJoinNum ? team.hasJoinNum +'/'+team.maxNum : '查询失败'" icon="phone-o" />
      <van-cell title="队伍分类"  icon="envelop-o" >
        <van-tag color="#7232dd" style="margin-right: 8px;margin-top: 8px;">
          {{team.category}}
        </van-tag>
      </van-cell>
      <van-cell v-if="team.expireTime !==null " title="到期时间" :value="team.expireTime.toLocaleString()" icon="envelop-o" />
      <van-cell title="创建时间" :value="team.createTime.toLocaleString()" icon="envelop-o" />

    </template>
    <van-button v-if="!team.hasJoin" type="primary" block  @click="joinTeamDialog(team.id)" >加入队伍</van-button>
    <van-button v-if="team.hasJoin" type="warning" block @click="quitTeamDialog(team.id)">退出队伍</van-button>
    <van-dialog v-model:show="showPassDialog" title="加入队伍" show-cancel-button @confirm="joinEncryptTeam(teamPassword)">
      <van-field v-model="teamPassword" label="密码：" type="password" placeholder="请输入密码"></van-field>
    </van-dialog>
    <van-button v-if="currentUser?.id === team.userId" block type="success" @click="updateTeam(team.id)">更新队伍</van-button>
    <van-button v-if="currentUser?.id === team.userId" block type="danger" @click="deleteTeamDialog(team.id)">解散队伍</van-button>
  </div>
  <div style="height: 80px">

  </div>
</template>


<style scoped>
.content {
  height: 100vh;
}
.image{
  padding: 20px;
  text-align: center;
}
.van-button{
  margin: 0px auto;
  width: 95%;
}
</style>
