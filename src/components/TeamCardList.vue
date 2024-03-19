<script setup lang="ts">
import {TeamType} from "../models/team";
import {TeamStatusEnum} from "../constants/team";

interface TeamCardListProps {
  teamList: TeamType[];
}
const props = withDefaults( defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList : [] as TeamType[],
});
import 'vant/es/notify/style'
import request from '../plugins/myAxios'
import {joinTeamService} from '../api/team'
import {showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
const teamId = ref();
const joinTeam = async (teamId:Number) =>{
  const result = await joinTeamService(teamId);
  if (result.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
    window.location.reload();
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}
const currentUser = ref();
import {getCurrentUserService} from '../api/user'
onMounted(async()=> {
  currentUser.value = await getCurrentUserService();
})

// const userCurrentId = ref(currentUser.userId);
// const updateTeamDialog = (userCurrentId) => {
//   console.log(userCurrentId);
// }
import 'vant/es/dialog/style'
import {useRouter} from "vue-router";
const joinTeamDialog = (teamId) =>{
  showConfirmDialog({
    message:
        '是否加入该队伍？',
  }).then(() => {
        joinTeam(teamId);
      }
  ).catch(() => {});
}

const router = useRouter();
const updateTeam= (teamId:number) =>{
  router.push({
        path: "/team/update",
        query: {teamId},
      }
  );
}
import {deleteTeamService, quitTeamService} from '../api/team'
const deleteTeam = async (id) =>{
  const result = await deleteTeamService(id);
  window.location.reload();
  if (result.code === 0){
    showSuccessToast("删除队伍成功")
  }
}
const quitTeam = async(id) =>{
  const result = await quitTeamService(id);
  if (result?.code === 0){
    showSuccessToast("退出队伍成功");
  }else {
    showFailToast("退出队伍失败")
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

const quitTeamDialog = (teamId) =>{
  showConfirmDialog({
    message:
        '是否退出该队伍？',
  }).then(() => {
    quitTeam(teamId);
    window.location.reload();
      }
  ).catch(() => {});
}
const showPassDialog = ref(false);
const teamPassword = ref('');
const currentTeamId = ref();
const joinEncryptTeamDialog = async (teamId)=>{
  showPassDialog.value = true;
  currentTeamId.value = teamId;
}
const joinEncryptTeam = async (teamPassword:string) =>{
  const result = await request.post('/team/join',{teamId:currentTeamId.value,teamPassword});
  if (result?.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
    window.location.reload();
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}

</script>

<template>
  <van-empty v-if="teamList.length === 0" description="暂无队伍"/>
  <van-card
      v-for="team in props.teamList"
      :desc="`简介：${team.description}`"
      :title="team.name"
      :thumb='team.avatarUrl'
  >
    <template #tags >
      <van-tag plain type="primary"  style="margin-right: 8px;margin-top: 8px;">
        {{team.category}}
      </van-tag>
      <van-tag plain type="primary"  style="margin-right: 8px;margin-top: 8px;">
        {{TeamStatusEnum[team.status]}}
      </van-tag>

    </template>
    <template #bottom>
      <div style="color: #ff0000">{{'已加入队伍人数:' + team.hasJoinNum + "/"+team.maxNum}}</div>
    </template>
    <template #footer>
      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="success" @click="updateTeam(team.id)">更新队伍</van-button>
      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="danger" @click="deleteTeamDialog(team.id)">解散队伍</van-button>
      <van-button size="small" v-if="team.hasJoin " plain type="warning" @click="quitTeamDialog(team.id)">退出队伍</van-button>
      <van-button size="small" v-if="!team.hasJoin && team.status === 0" v-model="teamId" plain type="primary" @click="joinTeamDialog(team.id)">加入队伍</van-button>
      <van-button size="small" v-if="!team.hasJoin && team.status === 2" v-model="teamId" plain type="primary" @click="joinEncryptTeamDialog(team.id)">加入队伍</van-button>

    </template>
  </van-card>
  <van-dialog v-model:show="showPassDialog" title="加入队伍" show-cancel-button @confirm="joinEncryptTeam(teamPassword)">
    <van-field v-model="teamPassword" label="密码：" type="password" placeholder="请输入密码"></van-field>
  </van-dialog>
</template>

<style scoped>
</style>