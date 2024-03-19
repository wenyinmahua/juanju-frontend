<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import request from "/src/plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserService} from "../api/user.js";
const router = useRouter();
const loading = ref(false);
const userUpdatePasswordRequest = ref({
  oldPassword:'',
  newPassword:'',
  checkPassword:''
})
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})
const validatorOldPassword = () => {
  if(userUpdatePasswordRequest.value.oldPassword.length < 8){
    return "密码长度不能小于8"
  }
}
const validatorNewPassword = () => {
  if(userUpdatePasswordRequest.value.newPassword.length < 8){
    return "密码长度不能小于8"
  }
}
const validator = () => {
  if(userUpdatePasswordRequest.value.newPassword !== userUpdatePasswordRequest.value.checkPassword){
    return "两次输入密码不一致";
  }
}

const onSubmit = async() => {
  const currentUser =await getCurrentUserService();
  if(!currentUser){
    showFailToast("用户未登录");
    return;
  }
  const res = await request.post("/user/update/password", userUpdatePasswordRequest.value)
  if(res.code === 0){
    loading.value = true;
    setTimeout(()=>{
      router.back();
    },2000)
  }else {
    showFailToast(res?.description !== '' ? res?.description :"修改失败")
  }
};
const text = '请设置密码。你可以用“账号 + 密码”登录，也可以用“学号 + 密码”登录';
const keywords = ['账号', '学号'];
</script>

<template>
  <div style="margin: 25px;color: #a7a6aa"><van-highlight :keywords="keywords" :source-string="text" /></div>

  <van-cell-group inset >
    <van-field label="账号" v-model="editUser.currentValue" disabled />
  </van-cell-group>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-divider content-position="left">修改密码</van-divider>
      <van-field
          v-model="userUpdatePasswordRequest.oldPassword"
          type="password"
          name="原密码"
          label="原密码"
          placeholder="填写原密码"
          :rules="[{validator: validatorOldPassword, required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="userUpdatePasswordRequest.newPassword"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="填写新密码"
          :rules="[{validator: validatorNewPassword, required: true, message: '请填写新密码' }]"
      />
      <van-field
          v-model="userUpdatePasswordRequest.checkPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="再次填写确认密码"
          :rules="[{ required: true, message: '再次填写确认密码',validator }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-overlay :show="loading">
    <div class="wrapper">
      <div class="block">
        <van-loading size="50px" vertical>保存中...</van-loading>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 100px;
  padding-top: 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>