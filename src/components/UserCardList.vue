<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps{
  skeletonLoading: boolean;
  userList: UserType[];
}
const props = withDefaults( defineProps<UserCardListProps>(),{
  skeletonLoading : true,
  //@ts-ignore
  userList : [] as UserType[],
});
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.skeletonLoading" v-for="user in props.userList" avatar-shape="square" avatar-size="88px">
  <van-card
      :desc="`${user.profile}`"
      :title="`${user.username}(${user.major})`"
      :thumb='user.avatarUrl'
  >
    <template #tags >
      <van-tag plain type="primary" v-for="tag in  user.tags" style="margin-right: 8px;margin-top: 8px;">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<style scoped>

</style>