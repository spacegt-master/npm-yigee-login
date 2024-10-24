<script setup>
import { ref, onMounted } from 'vue'
import { useLoginStore } from '../stores/login.js'
import Cookies from 'universal-cookie'
import user_certificate from '@/utils/user_certificate.js';

const props = defineProps({
    accountInfo: Object,
})
const cookies = new Cookies()
const loginPath = import.meta.env.VITE_APP_LOGIN_PATH
const loginStore = useLoginStore()
const emit = defineEmits(['success', 'failure'])
const iframeRef = ref()
const dialogVisible = ref(false)
const loading = ref(true)
const origin = ref(window.location.origin)
const invisible = ref(false)

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    const origin = event.origin;
    if (origin == loginPath) {
        if (event.data == 'login-success') {
            loginStore.getUserinfo(props.accountInfo).then(() => {
                emit('success');
                dialogVisible.value = false
            }).catch(() => {
                emit('failure')
            })
        } else if (event.data == 'login-loaded') {
            loading.value = false
        }
    }
}

onMounted(() => {
    const cert = cookies.get("USER_CERTIFICATE")
    if (user_certificate.verify(cert)) {
        invisible.value = true
        dialogVisible.value = true
    }
})
</script>
<template>
    <div>
        <slot v-if="accountInfo.id" name="info" :logout="() => loginStore.logout(accountInfo)">
            <el-button @click="loginStore.logout(accountInfo)">Logout</el-button>
        </slot>
        <slot v-else name="login" :login="() => dialogVisible = true">
            <el-avatar class="notlogin" :size="34" @click="dialogVisible = true;">
                <img src="../assets/avatar-login.png" />
            </el-avatar>
        </slot>
        <!-- <slot v-else name="login" :login="() => dialogVisible = true"></slot> -->
        <el-dialog v-model="dialogVisible" width="auto" class="login-dialog" append-to-body align-center
            :class="{ 'invisible': invisible }" :modal="!invisible" @closed="invisible = false">
            <div class="loading" v-show="loading" v-loading="loading"> </div>
            <iframe v-show="!loading" ref="iframeRef" :src="`${loginPath}?origin=${origin}&domain=.yigee.cn`"></iframe>
        </el-dialog>
    </div>
</template>
<style scoped>
.loading {
    width: 600px;
    height: 500px;
    border: 0;
    border-radius: 16px;
    overflow: hidden;
}

iframe {
    width: 600px;
    height: 500px;
    border: 0;
    border-radius: 16px;
    overflow: hidden;
}

.notlogin {
    cursor: pointer;
}
</style>
<style>
.login-dialog.invisible {
    display: none;
}

.login-dialog.el-dialog {
    background: #ffffff;
    box-shadow: none;
    padding: 0;
    border-radius: 16px;
    width: 600px;
    height: 500px;
}

.login-dialog .el-dialog__body {
    display: flex;
}

.login-dialog .el-dialog__header {
    padding-bottom: 0;
}

.login-dialog .el-dialog__close {
    background-color: #333;
    border-radius: 50%;
    padding: 6px;
    color: #eeeeee;
    height: 1.25em;
    width: 1.25em;
    right: -60px;
    top: 10px;
}
</style>