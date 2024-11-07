# yigee-login

Yigee 登录通用组件，由 Vue3 + Vite 开发.

## 安装依赖

[Pinia](https://www.npmjs.com/package/pinia)

```
npm i pinia
```

[axios](https://www.npmjs.com/package/axios)

```
npm i axios
```

[crypto-js](https://www.npmjs.com/package/crypto-js)

```
npm i crypto-js
```

[universal-cookie](https://www.npmjs.com/package/universal-cookie)

```
npm i universal-cookie
```

## 安装插件

[yigee-login](https://www.npmjs.com/package/yigee-login)

```
npm i yigee-login
```

## 使用插件

#### main.js

```
import { createApp } from 'vue'
// 引入插件
import npmYigeeLogin from "yigee-login";
import "yigee-login/dist/style.css";

const app = createApp({
  /* ... */
})

// 使用插件
app.use(npmYigeeLogin);

app.mount("#app");
```

#### Template.vue

```
<template>
  <yigee-login :account-info="info">
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
  </yigee-login>
</template>
```

## API

### Attributes

| 属性名       | 说明         | 类型   | 默认值 |
| ------------ | ------------ | ------ | ------ |
| account-info | 绑定账号信息 | Object | ——     |

### Events

| 事件名  | 说明       |
| ------- | ---------- |
| success | 登录成功。 |
| failure | 登录失败。 |

### Slots

| 插槽名 | 说明                              |
| ------ | --------------------------------- |
| login  | 包含登录事件，调用后弹出登录框。  |
| info   | 包含登出事件，调用后清除Cookies。 |

## Query

| 参数       | 说明                   |
| ---------- | ---------------------- |
| aimoso-org | 墨子账号默认选择组织id |
