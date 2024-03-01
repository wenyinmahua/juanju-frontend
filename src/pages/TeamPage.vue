<script setup>
import {ref} from "vue";

const TeamRequest = ref({
  name:'',
  description:'',
  avatarUrl:'',
  maxNum:'',
  status:'',
  teamPassword:'',
  expireTime:'',
  userId:'',
  category:''
});

import {useRouter} from "vue-router";

const router = useRouter();

const offset = ref({ x: 298, y: 560 });
const addTeam =  () => {
  router.push('/team/add');
}



</script>

<template>
  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" icon="add" @click="addTeam()" />
</template>

<style scoped>

</style>