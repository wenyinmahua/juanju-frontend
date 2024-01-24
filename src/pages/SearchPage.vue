<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";
const router = useRouter()
const searchText = ref('');
const onSearch = (val) =>{
  tagList.value = originList.map(parentTag => {
    const tempChildren = [...parentTag.children]
    const tempParentTag = {...parentTag}
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originList;
};
const tag = ref();
const show = ref(true);
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
};

const activeIds = ref([]);
const activeIndex = ref(0);
//标签列表
const originList = [
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
    ],
  },
]
const tagList = ref(originList)

</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">暂无选择</div>
  <van-space  style="padding: 0 16px" >
  <van-tag v-for=" tag in activeIds"  closeable size="medium" type="primary" @close="doClose(tag)">
    {{ tag }}
  </van-tag>
  </van-space>
  <van-divider content-position="left">请选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
</template>

<style scoped>

</style>