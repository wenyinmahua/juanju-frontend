<script setup lang="ts">
import {UserType} from "../models/user";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import request from '../plugins/myAxios.js'

interface UserCardListProps{
  skeletonLoading: boolean;
  userList: UserType[];
  total: number;
  allowLoad: boolean;
}

const show = ref(false)
const props = withDefaults( defineProps<UserCardListProps>(),{
      skeletonLoading : true,
      //@ts-ignore
      userList : [] as UserType[],
      allowLoad: false,
});
const username = ref();
const phone = ref();
const showMessage = (username1,phone1) =>{
  show.value = true;
  username.value = username1;
  phone.value = phone1 || '无联系方式';
}
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(0);
const onLoad = async () => {
  if (props.allowLoad === false){
    finished.value = true;
    return;
  }
  setTimeout(async () => {
    loading.value = false;
    const userListData = await request.get('/user/recommend', {
      params: {
        // pageSize: 8,
        pageNum: pageNum.value++,
      },
    }).then(function (response) {
      // showSuccessToast("请求成功");

      return response.data.records;
    }).catch(function (err) {
      showFailToast("请求失败");
    })
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags)
        }
        props.userList.push(user);
      })
    }
  },1000)};
</script>

<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
  >
    <van-skeleton title avatar :row="3" :loading="props.skeletonLoading" v-for="user in props.userList" avatar-shape="square" avatar-size="88px">
      <van-card
          :desc="`简介：${user.profile}`"
          :title="`${user.username}(${user.major})`"
          :thumb='user.avatarUrl'
      >
        <template #tags >
          <van-tag color="#7232dd"  v-for="tag in  user.tags" style="margin-right: 8px;margin-top: 8px;">
            {{tag}}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="mini" @click="showMessage(user.username,user.phone)">查看联系方式</van-button>
        </template>
      </van-card>
      <van-dialog v-model:show="show"  :overlay=false>
        <van-contact-card type="edit" :name="username" :tel="phone"  :editable="false" />
      </van-dialog>
    </van-skeleton>
  </van-list>

</template>

<style scoped>

</style>