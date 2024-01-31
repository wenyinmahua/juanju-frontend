<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import request from "/src/plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})
const onSubmit = async(values) => {
  const res = await request.post("/user/update",{

    [editUser.value.editKey] : editUser.value.currentValue,
  })
  if(res.code == 0 && res.data > 0){
    showSuccessToast("修改成功")
    router.back();
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
</template>

<style scoped>

</style>