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
  const result = await request.get('/team/list')
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

</script>

<template>
  <div style="height: 110vh">
  <van-pull-refresh v-model="loading" @refresh="onRefresh" >
  <van-tabs v-model:active="active" style="height: 100vh">
    <van-tab title="竞赛" name="0">
      <van-tabs v-model:active="competition" type="card" >
        <van-tab title="蓝桥杯" name="蓝桥杯">
          <team-card-list :team-list="teamList"/>
          <van-pagination v-if="total > 5" v-model="currentPage" :total-items="total" :items-per-page="pageSize" @change="change" force-ellipses/>
        </van-tab>
        <van-tab title="互联网+" name="互联网+">内容 2</van-tab>
      </van-tabs>
    </van-tab>
    <van-tab title="放假拼车">
      <van-tabs v-model:active="holiday" type="card"  :ellipsis=false >
        <van-tab title="明向->南站" name="明向->太原南站">明向->太原南站</van-tab>
        <van-tab title="明向->武宿" name="明向->武宿机场">明向->武宿机场</van-tab>
        <van-tab title="明向->晋中" name="明向->晋中站">明向->晋中站</van-tab>
        <van-tab title="迎西->南站" name="迎西->太原南站">迎西->太原南站</van-tab>
        <van-tab title="迎西->武宿" name="迎西->武宿机场">迎西->武宿机场</van-tab>
        <van-tab title="迎西->太原站" name="迎西->太原站">迎西->太原站</van-tab>
        <van-tab title="虎峪->南站" name="虎峪->太原南站">虎峪->太原南站</van-tab>
        <van-tab title="虎峪->武宿" name="虎峪->武宿机场">虎峪->武宿机场</van-tab>
        <van-tab title="虎峪->太原站" name="虎峪->太原站">虎峪->太原站</van-tab>
        <van-tab title="其他" name="放假拼车其他">放假拼车其他</van-tab>
      </van-tabs>
    </van-tab>
    <van-tab title="返校拼车">
      <van-tabs v-model:active="school" type="card"  :ellipsis=false >
        <van-tab title="晋中->明向" name="晋中站->明向">晋中站->明向</van-tab>
        <van-tab title="南站->明向" name="太原南站->明向">太原南站->明向</van-tab>
        <van-tab title="南站->迎西" name="太原南站->迎西">太原南站->迎西</van-tab>
        <van-tab title="南站->虎峪" name="太原南站->虎峪">太原南站->虎峪</van-tab>
        <van-tab title="武宿->明向" name="武宿机场->明向">武宿机场->明向</van-tab>
        <van-tab title="武宿->迎西" name="武宿机场->迎西">武宿机场->迎西</van-tab>
        <van-tab title="武宿->虎峪" name="武宿机场->虎峪">武宿机场->虎峪</van-tab>
        <van-tab title="太原站->迎西" name="太原站->迎西">太原站->迎西</van-tab>
        <van-tab title="太原站->虎峪" name="太原站->虎峪">太原站->虎峪</van-tab>
        <van-tab title="其他" name="放假拼车其他">放假拼车其他</van-tab>
      </van-tabs>
    </van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
  </van-tabs>
<!--    <team-card-list :team-list="teamList"/>-->
  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" icon="add" @click="addTeam()" />

    <div style="height: 700px;"></div>
  </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>