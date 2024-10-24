<script setup>
import NpmYigeeLogin from './components/login.vue';
import { ref } from 'vue'

const info = ref({
  id: null,
  name: null,
  account: null,
  phone: null,
  email: null,
  authorities: null,
  avatar: null,
  org: null,
})
</script>

<template>
  <NpmYigeeLogin :account-info="info">
    <template #login="{ login }">
      <el-avatar class="notlogin" :size="34" @click="login()">
        <img src="../../assets/avatar-login.png" />
      </el-avatar>
    </template>
    <template #info="{ logout }">
      <el-popover placement="bottom" :width="80">
        <template #reference>
          <el-avatar class="notlogin" :size="34" :src="info.avatar">
            {{ info.name?.substring(0, 2) }}
          </el-avatar>
        </template>
        <div style="text-align: center;">
          <div style="padding: 10px;">
            60 墨豆 <el-button link icon="Refresh"></el-button>
          </div>
          <el-button text icon="SwitchButton" @click="logout()">退出登录</el-button>
        </div>
      </el-popover>
    </template>
  </NpmYigeeLogin>
</template>

<style scoped></style>
