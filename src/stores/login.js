import { defineStore } from 'pinia'
import user_certificate from '../utils/user_certificate.js'
import Cookies from 'universal-cookie'
import { getUserinfo as getUserinfoApi } from '../api/index.js'
import { profile } from '../api/aimoso.js'

const cookies = new Cookies()

export const useLoginStore = defineStore('login', () => {
  const getUserinfo = async info => {
    if (user_certificate.verify(cookies.get('USER_CERTIFICATE'))) {
      if (cookies.get('LOGIN_MODE') == 'yigee') {
        const res = await getUserinfoApi(cookies.get('USER_CERTIFICATE'))
        Object.keys(info).forEach(key => (info[key] = res[key]))
      }
      if (cookies.get('LOGIN_MODE') == 'aimoso') {
        try {
          const aimosoVisa = JSON.parse(
            user_certificate.value(cookies.get('USER_CERTIFICATE')),
          )
          const aimosoInfo = await profile({
            org: aimosoVisa.org,
            token: aimosoVisa.token,
          })
          info.id = aimosoInfo.data.oid
          info.name = aimosoInfo.data.name
          info.account = aimosoInfo.data.phoneNumber
          info.phone = aimosoInfo.data.phoneNumber
          info.org = aimosoInfo.data.org.name
          info.orgId = aimosoInfo.data.org.oid
        } catch (e) {
          console.error('aimoso 签证交换用户信息失败:', e)
        }
      }
    }
  }
  const logout = info => {
    const iframe = document.createElement('iframe')
    iframe.src = `${import.meta.env.VITE_APP_LOGIN_PATH}/logout?origin=${window.location.origin}&domain=.yigee.cn`
    iframe.width = '0px' // 宽度
    iframe.height = '0px' // 高度
    iframe.style.display = 'none'

    const receiveMessage = event => {
      const origin = event.origin
      if (origin == import.meta.env.VITE_APP_LOGIN_PATH) {
        if (event.data == 'logout-success') {
          iframe.remove()
          Object.keys(info).forEach(key => (info[key] = null))
          window.removeEventListener('message', receiveMessage, false)
        }
      }
    }

    window.addEventListener('message', receiveMessage, false)
    document.body.appendChild(iframe)
  }

  return { getUserinfo, logout }
})
