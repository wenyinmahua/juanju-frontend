<script setup lang="ts">
import {UserType} from "../models/user";
import {ref} from "vue";

interface UserCardListProps{
  skeletonLoading: boolean;
  userList: UserType[];
}
const show = ref(false)
const props = withDefaults( defineProps<UserCardListProps>(),{
      skeletonLoading : true,
      //@ts-ignore
      userList : [] as UserType[],
});
const username = ref();
const phone = ref();
const showMessage = (username1,phone1) =>{
  show.value = true;
  username.value = username1;
  phone.value = phone1;
}
</script>

<template>
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
      <van-contact-card type="edit" :name="username" :tel="phone" :editable="false" />
    </van-dialog>
  </van-skeleton>
</template>

<style scoped>

</style>