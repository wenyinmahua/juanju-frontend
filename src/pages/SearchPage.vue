<script setup>
import { ref } from 'vue';
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
 * 执行搜索
 */
const toSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
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
  <van-tag color="#7232dd" v-for=" tag in activeIds"  closeable size="medium" type="primary" @close="doClose(tag)">
    {{ tag }}
  </van-tag>
  </van-space>
  <van-divider content-position="left">请选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="toSearchResult()" >搜索</van-button>
  </div>
</template>

<style scoped>

</style>