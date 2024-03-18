<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import request from "/src/plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserService} from "../api/user.js";
const router = useRouter();

const userUpdatePasswordRequest = ref({
  oldPassword:'',
  newPassword:'',
  checkPassword:''
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
    showSuccessToast( "修改密码成功")
    router.back();
  }else {
    showFailToast(res?.description !== '' ? res?.description :"修改失败")
  }
};

</script>

<template>


  <van-form @submit="onSubmit">
    <van-cell-group inset>
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
</template>

<style scoped>

</style>