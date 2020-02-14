import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import ToggleButton from 'vue-js-toggle-button'
 



Vue.config.productionTip = false

Vue.use(ToggleButton)
Vue.use(vueResource)
new Vue({
  render: h => h(App),
}).$mount('#app')
