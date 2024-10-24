import { defineStore } from 'pinia'
import user_certificate from '../utils/user_certificate.js'
import Cookies from 'universal-cookie'
import { getUserinfo as getUserinfoApi } from '../api/index.js'

const cookies = new Cookies()

export const useLoginStore = defineStore('login', () => {
  const getUserinfo = async info => {
    if (user_certificate.verify(cookies.get('USER_CERTIFICATE'))) {
      const res = await getUserinfoApi(cookies.get('USER_CERTIFICATE'))
      Object.keys(info).forEach(key => (info[key] = res[key]))
    }
    console.log(info)
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
