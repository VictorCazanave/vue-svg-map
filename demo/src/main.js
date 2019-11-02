import Vue from 'vue'
import App from './app'
import './scss/main.scss'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
