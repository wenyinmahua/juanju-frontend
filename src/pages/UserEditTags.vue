<script setup>
import { ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
import request from "../plugins/myAxios.js";
import {showFailToast} from "vant";
import {getCurrentUserService} from "../api/user.js";
const router = useRouter()
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const tag = ref();
const show = ref(true);
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
};

const activeIds = ref([]);
if (editUser.value.currentValue !== null){
  activeIds.value = editUser.value.currentValue;
}
const activeIndex = ref(0);
//标签列表
const originList = [
  {
    text: '技术',
    children: [
      { text: 'java', id: 'java' },
      { text: 'SSM', id: 'SSM' },
      { text: 'SpringBoot', id: 'SpringBoot' },
      { text: 'VUE', id: 'VUE' },
      { text: 'python', id: 'python' },
      { text: 'C++', id: 'C++' },
    ],
  },
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
]
const tagList = ref(originList)
/**
 * 修改标签
 */
const loading = ref(false);
const onSubmit = async(values) => {
  const currentUser =await getCurrentUserService();
  if(!currentUser){
    showFailToast("用户未登录");
    return;
  }
  const res = await request.post("/user/update",{
    id:currentUser.id,
    tags : JSON.stringify(values)
  })
  if(res.code === 0 && res.data > 0){
    // showSuccessToast("查询成功")
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
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds=== null">暂无选择</div>

  <div class="container">
    <van-space
        style="padding: 0 16px; max-width: 100%; overflow: auto; display: inline-block;"
        v-for="tag in activeIds"
        :key="tag"
        :style="{ display: 'inline-block' }"

    >
      <van-tag
          color="#7232dd"
          closeable
          size="medium"
          type="primary"
          @close="doClose(tag)"
      >
        {{ tag }}
      </van-tag>
    </van-space>
  </div>
  <van-divider content-position="left">请选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button block type="primary" @click="onSubmit(activeIds)" >提交</van-button>
  </div>

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
.container {
  width: 100%;
  box-sizing: border-box;
}
</style>