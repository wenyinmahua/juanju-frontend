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
    const index = props.teamList.findIndex(t => t.id === teamId);
    if (index !== -1) {
      props.teamList[index].hasJoin = true;
      props.teamList[index].hasJoinNum += 1;
    }
    // 重新获取队伍列表
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}

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
    const index = props.teamList.findIndex(t => t.id === currentTeamId.value);
    if (index !== -1) {
      props.teamList[index].hasJoin = true;
      props.teamList[index].hasJoinNum += 1;
    }
  }else{
    showNotify({ type: 'warning', message:( (result?.description) ?`${result?.description}`:'')});
  }
}
const route = useRouter();
const getTeamInfo = (id:number)=>{
  route.push("/team/info?id="+id);
}

</script>

<template>
  <van-empty v-if="teamList.length === 0" description="暂无队伍"/>
  <van-card
      v-for="team in props.teamList"
      :desc="`简介：${team.description}`"
      :title="team.name"
      :thumb='team.avatarUrl'
      :key="team.id"
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

      <van-button size="small" v-model="teamId" plain type="primary" @click="getTeamInfo(team.id)">查看队伍</van-button>

    </template>
  </van-card>
  <van-dialog v-model:show="showPassDialog" title="加入队伍" show-cancel-button @confirm="joinEncryptTeam(teamPassword)">
    <van-field v-model="teamPassword" label="密码：" type="password" placeholder="请输入密码"></van-field>
  </van-dialog>
</template>

<style scoped>
.van-card{
  margin: 5px 10px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
}
</style>