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
  id:'',
  username: '',
  userAccount:'',
  createTime: new Date(),
  phone:'',
  email: '',
  gender:null,
  major:'',
  stuId:'',
  avatarUrl: null,
  password:''
});
import request from "../plugins/myAxios.js";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import { setCurrentUserState} from '../store/user'
import {isImageFile} from "vant/es/uploader/utils";
const fileList = ref([]);
onMounted(async()=> {
  const result = await request.get("/user/current")
  setCurrentUserState(result.data);
  if(result?.code === 0){
    user.value = result.data;
    fileList.value = result.data.avatarUrl;
    if (user.value.gender === 0){
      user.value.gender = '男'
    }else if(user.value.gender === 1){
      user.value.gender = '女'
    }else{
      user.value.gender = '保密'
    }
    // showSuccessToast("获取用户信息成功")
  }else{
    showFailToast(result?.message)
  }
})
fileList.value = user.value.avatarUrl;
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) =>{
  // 路由带着参数跳转
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
const toEditGender = (editKey: string, editName: string, currentValue: string)=>{
  router.push({
    path:'/user/editGender',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
const onOversize = (file) => {
  console.log(file);
  showFailToast('文件大小不能超过 500kb');
};
import {uploadImage} from "../api/team.js";
const afterRead =  async (file) =>{
  const result = await uploadImage(file);
  if (result.code === 0){
    user.value.avatarUrl = result.data;
    await request.post("/user/update",{
      id:user.value.id,
      avatarUrl : user.value.avatarUrl,
    })
  }
}
const toEditPassword = (editKey: string, editName: string, currentValue: string) =>{
  router.push({
    path:'/user/update/password',
    query: {
      editKey,
      editName,
      currentValue,
    }
  });
}

</script>

<template>

<div class="content">
<div class="image">
<!--  <van-image-->
<!--      round-->
<!--      width="5rem"-->
<!--      height="5rem"-->
<!--      fit="cover"-->
<!--      position="center"-->
<!--      :src="user.avatarUrl"-->
<!--  />-->
</div>
  <van-cell title="头像">
<!--    <van-icon :name="user.avatarUrl" size="40px" />-->
    <van-uploader :v-model="fileList" multiple :max-count="1" :after-read="afterRead" reupload :max-size="500 * 1024" @oversize="onOversize" >
      <van-image :src="user.avatarUrl" round width="40px"/>
    </van-uploader>
<!--    <van-uploader multiple v-model="file" :max-size="500 * 1024" @oversize="onOversize"  :max-count="1" />-->
<!--    <van-image :src="user.avatarUrl" width="40px"/>-->
  </van-cell>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)"/>
  <van-cell title="账号" :value="user.userAccount" />

  <van-cell title="性别" is-link to="/user/edit"  :value="user.gender" @click="toEditGender('gender', '性别', user.gender)" />
  <van-cell title="电话" is-link to="/user/edit"  :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit"  :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
  <van-cell title="专业" is-link to="/user/edit"  :value="user.major" @click="toEdit('major', '专业', user.major)"/>
  <van-cell title="密码" is-link to="/user/edit"  @click="toEditPassword('userAccount', '账号', user.userAccount)"/>

  <van-cell title="学号" :value="user.stuId" />
  <!--  <van-cell title="标签" is-link to="/user/edit"  :value="user.tags" />-->
  <van-cell title="注册日期" :value="user.createTime.toLocaleString()" />
  <!---->

</div>
</template>


<style scoped>
.content {
  height: 100vh;
  background-color: #f7f7f7;
}
.image{
  background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  text-align: center;
}
</style>