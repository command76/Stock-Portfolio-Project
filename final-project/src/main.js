import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'


Vue.use(VueResource)


Vue.config.productionTip = false

export const eventBus = new Vue({})

new Vue({
  http: {
    root: '/localhost:8081',
    headers: {
      Authorization: 'Basic ' + btoa("root:mysql")
    }
  },
  render: h => h(App),
}).$mount('#app')
