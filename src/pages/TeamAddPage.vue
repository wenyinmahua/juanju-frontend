<script setup>
import {ref} from "vue";

const addTeamData = ref({
  'name':'',
  'description':'',
  'avatarUrl':'',
  'maxNum': 1,
  'status': 1,
  'teamPassword':'',
  'expireTime':'',
  'userId':'',
  'category':''
});
const showPicker = ref(false);
const minDate= new Date();
const maxDate = new Date(2028, 5, 30);
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('/');
  showPicker.value = false;
};
const currentDate = ref(['2024', '01', '01']);
const showCategory = ref(false);
const onCategoryConfirm = ( category,categoryId ) => {
  addTeamData.value.category = category;
  addTeamData.value.categoryId = categoryId;
  showCategory.value = false;
};
const categoryId = ref(1);
const category = ref(0);
const originList = [
  {
    text: '竞赛',
    children: [
      { text: '互联网+', id: '互联网+' },
      { text: '蓝桥杯', id: '蓝桥杯' },
    ],
  },
  {
    text: '放假拼车',
    children: [
      { text: '明向->太原南站', id: '明向->太原南站' },
      { text: '明向->武宿机场', id: '明向->武宿机场' },
      { text: '迎西->太原南站', id: '迎西->太原南站' },
      { text: '迎西->武宿机场', id: '迎西->武宿机场' },
      { text: '迎西->太原站', id: '迎西->太原站' },
      { text: '虎峪->太原南站', id: '虎峪->太原南站' },
      { text: '虎峪->武宿机场', id: '虎峪->武宿机场' },
      { text: '虎峪->太原站', id: '虎峪->太原站' },
      { text: '其他', id: '放假拼车其他'}
    ],
  },
  {
    text: '返校拼车',
    children: [
      { text: '太原南站->明向', id: '太原南站->明向' },
      { text: '武宿机场->明向', id: '武宿机场->明向' },
      { text: '太原南站->迎西', id: '太原南站->迎西' },
      { text: '武宿机场->迎西', id: '武宿机场->迎西' },
      { text: '太原站->迎西', id: '太原站->迎西' },
      { text: '太原南站->虎峪', id: '太原南站->虎峪' },
      { text: '武宿机场->虎峪', id: '武宿机场->虎峪' },
      { text: '太原站->虎峪', id: '太原站->虎峪' },
      { text: '其他', id: '返校拼车其他'}
    ],
  },
]
const categoryList = ref(originList)
const value = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);
</script>

<template>
  <div class="container">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field name="uploader" label="上传头像" :border= false>
        <template #input>
          <van-uploader v-model="value" multiple :max-count="1" />
        </template>
      </van-field>
      <hr/>
      <van-field
          v-model="addTeamData.name"
          :border= false
          name="队伍名"
          label="队伍名"
          placeholder="请填写队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <hr/>
      <van-field
          v-model="addTeamData.description"
          :border= false
          rows="3"
          autosize
          label="队伍描述"
          type="textarea"
          maxlength="512"
          placeholder="请填写队伍描述"
          show-word-limit
      />
      <hr/>
      <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            v-model="currentDate"
            title="请选择过期时间"
            :min-date ="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>
      <hr/>
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" />
        </template>
      </van-field>

      <hr/>
      <van-field
          v-model="addTeamData.category"
          is-link
          readonly
          name="categoryPicker"
          label="队伍分类"
          placeholder="请选择队伍分类"
          @click="showCategory = true"
      />
      <van-popup v-model:show="showCategory" position="bottom" >
        <van-tree-select
            v-model:active-id="categoryId"
            v-model:main-active-index="category"
            :items="categoryList"
        />
        <van-button type="primary" block @click="onCategoryConfirm(categoryId,category)">确定</van-button>
      </van-popup>
      <hr/>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio :name="0">公开</van-radio>
            <van-radio :name="2">加密</van-radio>
            <van-radio :name="1">私有</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <hr/>
      <van-field
          v-model="addTeamData.teamPassword"
          v-show ="addTeamData.status === 2"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  </div>
</template>

<style scoped>
.container{
  height: 110vh;
  background-image: linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1,
  #8aa7ec, #79b3f4, #69bff8, #52cffe,
  #41dfff, #46eefa, #5ffbf1);
  padding-top: 10%;
}
hr{
  width: 90%;
}
</style>