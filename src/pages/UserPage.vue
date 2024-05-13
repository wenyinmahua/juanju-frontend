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
  userAccount:11,
  createTime: new Date(),
  phone:'',
  email: '',
  gender:null,
  major:'',
  stuId:'',
  avatarUrl: null,
});
import request from "../plugins/myAxios.js";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import { setCurrentUserState} from '../store/user'
import {isImageFile} from "vant/es/uploader/utils";
import myAxios from "../plugins/myAxios.js";
import router from "../router";
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
const logout = async() =>{
  await request.post('/user/logout');
  window.localStorage.removeItem("token")
  await router.push('/login');
}
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
const onOversize = (file) => {
  console.log(file);
  showFailToast('文件大小不能超过 500kb');
};
</script>

<template>

<div class="content">

  <template v-if="user">
    <div class="image">
      <van-uploader :v-model="fileList"  multiple :max-count="1" :after-read="afterRead" reupload :max-size="500 * 1024" @oversize="onOversize" >
        <van-image height="6rem" width ="6rem" :src="user.avatarUrl ? user.avatarUrl: 'https://web-tlias-mmh.oss-cn-beijing.aliyuncs.com/c3149768-abd4-46d3-82d9-b804bac9105a.png'" round />
      </van-uploader>
    </div>
    <van-cell  is-link to="/user/update" icon="user-o">
      <template #title>
<span  style="color: #a8a8a8;font-size: large">{{user.username}}</span>的个人信息
      </template>
    </van-cell>
    <van-cell title="我创建的队伍" is-link to="/user/team/create" icon="friends-o"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join" icon="friends-o"/>
  </template>
  <div style="margin: 16px">
    <van-button  block @click="logout" type="primary" icon="contact-o">退出登录</van-button>
  </div>

</div>
</template>


<style scoped>
.content {
  height: 100vh;
}
.image{
  padding: 20px;
  background-image: radial-gradient(circle, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  text-align: center;
}
</style>