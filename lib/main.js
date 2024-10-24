import LoginVue from '@/components/YigeeLogin.vue'

const install = app => {
  app.component('yigee-login', LoginVue)
}

export default {
  install,
}
