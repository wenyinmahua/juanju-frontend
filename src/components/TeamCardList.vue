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
import {showFailToast, showNotify, showSuccessToast} from "vant";
const joinTeam = async (teamId:Number) =>{
  const result = await request.post('/team/join',{teamId});
  if (result.code === 0){
    showNotify({ type: 'success', message:"加入队伍成功"});
  }else{
    showNotify({ type: 'warning', message:( (result.description) ?`${result.description}`:'')});
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
      <van-button size="small" plain type="primary" @click="joinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>

</template>

<style scoped>

</style>