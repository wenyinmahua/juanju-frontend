<script setup lang="ts">
import {TeamType} from "../models/team";
import {TeamStatusEnum} from "../constants/team";

interface TeamCardListProps {
  teamList: TeamType[];
}
const props = withDefaults( defineProps<TeamCardListProps>(),{
  teamList : [] as TeamType[],
});
import 'vant/es/notify/style'
import request from '../plugins/myAxios'
import {showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
const teamId = ref();
const joinTeam = async (teamId:Number) =>{
  const result = await request.post('/team/join',{teamId});
  if (result.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
  }else{
    showNotify({ type: 'warning', message:( (result.description) ?`${result.description}`:'')});
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



</script>

<template>
  <van-empty v-if="!teamList" description="描述文字" />
  <van-card
      v-for="team in props.teamList"
      :desc="`${team.description}`"
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
      <div>{{'最大人数:' + team.maxNum}}</div>
    </template>
    <template #footer>
      {{currentUser?.id}}
      {{team.userId}}

      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="success" @click="updateTeam(team.id)">更新队伍</van-button>
      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="danger" @click="deleteTeamDialog(team.id)">解散队伍</van-button>
      <van-button size="small" v-if="team.join || currentUser?.id == team.userId" plain type="warning" @click="quitTeamDialog(team.id)">退出队伍</van-button>
      <van-button size="small" v-if="currentUser?.id !== team.userId && !team.join"v-model="teamId" plain type="primary" @click="joinTeamDialog(team.id)">加入队伍</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>