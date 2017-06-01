import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import Controls from './components/Controls.vue'
import View from './components/View.vue'


Vue.use(Buefy)

Vue.config.productionTip = false

Vue.component('app-controls', Controls)
Vue.component('app-view', View)


new Vue({
  el: '#app',
  render: h => h(App)
})










