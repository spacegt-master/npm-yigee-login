import LoginVue from '@/components/login.vue'

const install = (app, options) => {
  app.component('npm-yigee-login', LoginVue)
}

export default {
  install,
}
