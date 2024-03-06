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
const updateTeamPage= (teamId:number) =>{
  router.push({
        path: "/team/update",
        query: {teamId},
      }
  );
}
import {deleteTeamService} from '../api/team'
const deleteTeamPage = async (id) =>{
  console.log(id)
  const result = await deleteTeamService(id);
  if (result.code === 0){
    showSuccessToast("删除队伍成功")
  }
}



</script>

<template>
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
      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="success" @click="updateTeamPage(team.id)">更新队伍</van-button>
      <van-button size="small" v-if="currentUser?.id === team.userId" plain type="danger" @click="deleteTeamPage(team.id)">解散队伍</van-button>

      <van-button size="small" v-if="currentUser?.id !== team.userId"v-model="teamId" plain type="primary" @click="joinTeamDialog(team.id)">加入队伍</van-button>

    </template>
  </van-card>
</template>

<style scoped>

</style>