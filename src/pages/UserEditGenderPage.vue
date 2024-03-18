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
const genderTemp = ref();

const columns = [
  { text: '男', value: 0 },
  { text: '女', value: 1 },
  { text: '保密', value: 2 },
];
const selectedValues = ref([0]);
const showPicker = ref(false);
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  editUser.value.currentValue = selectedOptions[0].text;
  genderTemp.value = selectedOptions[0].value;

};
const onSubmit = async(values) => {
  const currentUser =await getCurrentUserService();
  if(!currentUser){
    showFailToast("用户未登录");
    return;
  }
  const res = await request.post("/user/update",{
    id:currentUser.id,
    [editUser.value.editKey] : genderTemp.value,
  })
  if(res.code === 0 && res.data > 0){
    showSuccessToast("修改成功")
    router.back();
  }else {
    showFailToast("修改失败")
  }
};

</script>

<template>


  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        is-link
        readonly
        label="性别"
        placeholder="选择性别"
        @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
<!--  <van-cell-group inset>-->
<!--    <van-field-->
<!--        v-model="editUser.currentValue"-->
<!--        :name="editUser.editKey"-->
<!--        :label="editUser.editName"-->
<!--        :placeholder='`请输入${editUser.editName}`'-->
<!--    />-->
<!--  </van-cell-group>-->
</template>

<style scoped>

</style>