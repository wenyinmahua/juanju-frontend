<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import request from "/src/plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserService} from "../api/user.js";
const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const loading = ref(false);
const onSubmit = async(values) => {
  const currentUser =await getCurrentUserService();
  if(!currentUser){
    showFailToast("用户未登录");
    return;
  }
  const res = await request.post("/user/update",{
    id:currentUser.id,
    [editUser.value.editKey] : editUser.value.currentValue,
  })
  if(res.code === 0 && res.data > 0){
    // showSuccessToast("修改成功")
    loading.value = true;
    setTimeout(()=>{
      router.back();
    },2000)

  }else {
    showFailToast("修改失败")
  }
};

</script>

<template>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder='`请输入${editUser.editName}`'
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-overlay :show="loading">
    <div class="wrapper" @click.stop>
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