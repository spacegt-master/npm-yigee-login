import axios from '../axios/index.js'

export function getUserinfo(USER_CERTIFICATE) {
  return axios({
    url: import.meta.env.VITE_APP_ACCOUNT_SERVER + '/getUserinfo',
    method: 'get',
    params: {
      USER_CERTIFICATE,
    },
  })
}
