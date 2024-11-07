import axios from '../axios/index.js'

export function profile({ org, token }) {
  return axios({
    url: import.meta.env.VITE_APP_AIMOSO_PORTAL_API + '/profile',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'x-org': org,
      'x-token': token,
    },
  })
}
