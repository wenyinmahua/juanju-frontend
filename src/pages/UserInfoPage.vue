<script setup lang="ts">
import {useRoute} from "vue-router";

const user = ref({
  id:'',
  username: '',
  userAccount:11,
  createTime: new Date(),
  phone:'',
  email: '',
  gender:null,
  major:'',
  profile: '',
  stuId:'',
  tags:[],
  avatarUrl: null,
});
import request from "../plugins/myAxios.js";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {stringify} from "qs";
const route = useRoute();
const fileList = ref([]);
onMounted(async()=> {
  const userAccount = ref(route.query.userAccount as string);
  const result = await request.get("/user/info",{
    params:{
      userAccount: userAccount.value,
    }
  })
  if(result?.code === 0){
    user.value = result.data;
    if(user.value.tags) {
      user.value.tags = JSON.parse(user.value.tags)
      console.log(user.value.tags)
    }else {
      user.value.tags={0:'暂无标签'};
    }
    fileList.value = result.data.avatarUrl;
    if (user.value.gender === 0){
      user.value.gender = '男'
    }else if(user.value.gender === 1){
      user.value.gender = '女'
    }else{
      user.value.gender = '保密'
    }
  }else{
    showFailToast(result?.message)
  }
})
</script>

<template>

  <div class="content">

    <template v-if="user">
      <div class="image">
        <van-image
            round
            width="8rem"
            height="8rem"
            :src="user.avatarUrl ? user.avatarUrl: 'https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/49e9401e-c6e0-4f38-bb18-588a750ebd4b.png'"
        />
      </div>
      <van-cell  icon="user-o">
        <template #title>
          <span  style="color: #a8a8a8;font-size: large">{{user.username}}</span>的个人信息
        </template>
      </van-cell>
      <van-cell title="昵称" :value="user.username ? user.username : '该用户很懒，未填写'" icon="contact-o" />
      <van-cell title="账号" :value="user.userAccount" icon="manager-o" />
      <van-cell title="简介" :value="user.profile ? user.profile : '该用户暂未填写简介'" icon="notes-o" />
      <van-cell title="标签" icon="notes-o" >
        <van-tag color="#7232dd"  v-for="tag in  user.tags" style="margin-right: 8px;margin-top: 8px;">
          {{tag}}
        </van-tag>
      </van-cell>
      <van-cell title="联系方式" :value="user.phone  ? user.phone : '该用户暂未填写手机号'" icon="phone-o" />
      <van-cell title="邮箱" :value="user.email  ? user.email : '该用户暂未填写邮箱'" icon="envelop-o" />
    </template>



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
</style>