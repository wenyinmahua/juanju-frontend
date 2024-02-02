<script setup lang="ts">
import {useRouter} from "vue-router";

// const user = {
//   id : 1,
//   username: '麻花',
//   userAccount: 'mahua',
//   avatarUrl: 'null',
//   gender: '男',
//   phone: '18835379271',
//   email: '501847822@qq.com',
//   major: '软件工程',
//   createTime: new Date(),
//   stuId: '2021005802',
//   tags: ['java','python','c++'],
// }
const user = ref({
  createTime: new Date()
});
import request from "../plugins/myAxios.js";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import { setCurrentUserState} from '../store/user'
onMounted(async()=> {
  const result = await request.get("/user/current")
  setCurrentUserState(result.data);
  if(result.code == 0){
    user.value = result.data;
    // showSuccessToast("获取用户信息成功")
  }else{
    showFailToast(result.message)
  }
})
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) =>{
  // 路由带着参数跳转
  router.push({
    path: 'user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)"/>
  <van-cell title="账号" :value="user.userAccount" />
  <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl', '头像', user.avatarUrl)" >
    <van-icon :name="user.avatarUrl" size="20px" />
<!--    <van-image :src="user.avatarUrl" width="40px"/>-->
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit"  :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
  <van-cell title="电话" is-link to="/user/edit"  :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit"  :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
  <van-cell title="专业" is-link to="/user/edit"  :value="user.major" @click="toEdit('major', '专业', user.major)"/>
  <van-cell title="学号" :value="user.stuId" />
<!--  <van-cell title="标签" is-link to="/user/edit"  :value="user.tags" />-->
  <van-cell title="注册日期" :value="user.createTime.toLocaleString()" />
  <!---->

</template>

<style scoped>

</style>