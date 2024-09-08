<script setup >
import {onMounted, ref} from "vue";
import request from "../plugins/myAxios.js";
const updateTeam = ref({
  'id' : 0,
  'name':'',
  'description':'',
  'status': -1,
  'teamPassword':'',
  'expireTime':null,
  'userId':'',
});
const teamData = ref();
const route = useRoute();
const id = ref(route.query.teamId);
const updateTeamData = ref(updateTeam);
onMounted(async ()=>{
  teamData.value = await getTeamById(id.value);
  updateTeamData.value = teamData.value.data;
})

const showPicker = ref(false);
const minDate= new Date();
const maxDate = new Date(2028, 5, 30);
const onConfirm = ({ selectedValues }) => {
  updateTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};
const currentDate = ref(['2024', '01', '01']);
import {useRoute, useRouter} from "vue-router";
const router = useRouter();

import {getTeamById, updateTeamService} from "../api/team.js";
import {showFailToast, showSuccessToast} from "vant";
const onSubmit = async () => {
  const result = await updateTeamService(updateTeamData.value);
  if(result.code === 0){
    showSuccessToast(result.message);
     setTimeout(()=>{
       router.push({
       path: '/team',
       replace: true,
     })
     },2000);
  }else if (result.code === 40100 ){
    showFailToast(result.message);
    setTimeout(()=>{
      router.push("/login")
    },2000)
  }else {
    showFailToast(result.message);
  }
}

const fileList = ref([]);
import {uploadImage} from "../api/team.js";

const afterRead =  async (file) =>{
    const result = await uploadImage(file);
    if (result.code === 0){
      updateTeamData.value.avatarUrl = result.data;
    }
}

</script>

<template>
  <div class="container">
  <van-form @submit="onSubmit">

    <van-cell-group inset>
      <van-field
          v-model="updateTeamData.name"
          :border= false
          name="name"
          label="队伍名"
          placeholder="请填写队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <hr/>
      <van-field
          v-model="updateTeamData.description"
          :border= false
          rows="3"
          autosize
          label="队伍描述"
          name="description"
          type="textarea"
          maxlength="512"
          placeholder="请填写队伍描述"
          show-word-limit
      />
      <hr/>
      <van-field
          v-model="updateTeamData.expireTime"
          is-link
          readonly
          name="expireTime"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            v-model="currentDate"
            title="请选择过期时间"
            :min-date ="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>
      <hr/>
      <van-field name="status" label="队伍状态" >
        <template #input>
          <van-radio-group v-model="updateTeamData.status" direction="horizontal">
            <van-radio :name=0>公开</van-radio>
            <van-radio :name=1>私有</van-radio>
            <van-radio :name=2>加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <hr/>
      <van-field
          v-model="updateTeamData.teamPassword"
          v-if ="Number(updateTeamData.status) === 2"
          type="password"
          name="teamPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  </div>
</template>

<style scoped>
.container{
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #ededed;
  padding-top: 10%;
}
hr{
  width: 90%;
}
</style>