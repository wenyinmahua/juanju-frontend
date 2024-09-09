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

import 'vant/es/dialog/style'
import {useRouter} from "vue-router";
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

      <van-button size="small" plain type="primary" @click="getTeamInfo(team.id)">查看队伍</van-button>

    </template>
  </van-card>

</template>

<style scoped>
.van-card{
  margin: 5px 10px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
}
</style>