<script setup>

import {ref} from "vue";
import {userLoginService, userRegisterService} from "../api/user.js";

const UserRegister = ref({
  userAccount:'',
  userPassword:'',
  checkPassword:'',
  stuId:'',
})
const registerDataClear = () => {
  UserRegister.value.userAccount = '';
  UserRegister.value.stuId = '';
  UserRegister.value.userPassword = '';
  UserRegister.value.checkPassword = '';
}
const onSubmit = (values) => {
  console.log('submit', values);
};
const isRegister = ref(true);

import {useRouter} from "vue-router";
import {showSuccessToast} from "vant";
const router = useRouter();

const validatorAccount = () => {
  if (UserRegister.value.userAccount.length < 4) {
    return "账号长度不能小于4"
  }
  if(UserRegister.value.userAccount.length >10){
    return "账号长度不能大于9"
  }
}
const validatorLoginAccount = () => {
  if (UserRegister.value.userAccount.length < 4) {
    return "账号长度不能小于4"
  }
  if(UserRegister.value.userAccount.length >11){
    return "账号长度不能大于10"
  }
}
const validatorStuId = () => {
  if (UserRegister.value.stuId.length != 10){
    return "学号长度必须为10"
  }
}
const validatorPassword = () => {
  if(UserRegister.value.userPassword.length < 8){
    return "密码长度不能小于8"
  }
}
const validator = () => {
  if(UserRegister.value.userPassword !== UserRegister.value.checkPassword){
    return "两次输入密码不一致";
  }
}
const userLogin = async (UserRegister) => {
  let result = await userLoginService(UserRegister);
  if(result.code === 0) {
    showSuccessToast(result.message);
    await router.replace("/");
  }
}
const userRegister = async (UserRegister) => {
  let result = await userLoginService(UserRegister);
  if(result.code === 0){
    showSuccessToast(result.message);
  }

}

</script>

<template >
  <div class="container" >
    <div style="text-align: center;">
      <van-image src="src/assets/logo.png" width="200px" />
    </div>
    <van-form @submit="onSubmit" v-if="isRegister" :model="UserRegister">
      <h2 style="margin-left: 45%; color: #535bf2" >注册</h2>
      <van-cell-group inset>
        <van-field
            v-model="UserRegister.userAccount"
            name="账号"
            label="账号"
            placeholder="账号长度为 4-9 位"
            :rules="[{ validator: validatorAccount, required: true, message: '请填写账号' }]"
        />
        <van-field
            v-model="UserRegister.stuId"
            name="学号"
            label="学号"
            placeholder="学号长度为 10 位"
            :rules="[{ validator: validatorStuId, required: true, message: '请填写学号'}]"
        />
        <van-field
            v-model="UserRegister.userPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码长度不能小于8"
            :rules="[{validator: validatorPassword, required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="UserRegister.checkPassword"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="请填写确认密码"
            :rules="[{ required: true, message: '请确认密码',validator }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block  native-type="submit" color="#7f5feb" @click="userRegister(UserRegister)">
          注册
        </van-button>
        <br>
        <a style="text-decoration: none;margin-left: 5%" @click="isRegister = false;registerDataClear()" >⬅ 登录</a>
      </div>
    </van-form>
    <van-form @submit="onSubmit" v-if="!isRegister">
      <h2 style="margin-left: 45%; color: #535bf2" >登录</h2>
      <van-cell-group inset>
        <van-field
            v-model="UserRegister.userAccount"
            name="账号"
            label="账号"
            placeholder="账号或学号"
            :rules="[{ validator: validatorLoginAccount, required: true, message: '请填写账号' }]"
        />
        <van-field
            v-model="UserRegister.userPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ validator: validatorPassword, required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block  native-type="submit" color="#7f5feb" @click="userLogin(UserRegister)">
          登录
        </van-button>
        <br/>
        <a style="text-decoration: none;margin-left: 5%" @click="isRegister = true;registerDataClear()" >➡ 注册</a>
      </div>
    </van-form>
  </div>

</template>

<style scoped>
.container{
  height: 100vh;
  background-image: linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1,
  #8aa7ec, #79b3f4, #69bff8, #52cffe,
  #41dfff, #46eefa, #5ffbf1);
  padding-top: 10%;
}

</style>