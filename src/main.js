import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chat from 'vue-beautiful-chat'
Vue.use(Chat)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
