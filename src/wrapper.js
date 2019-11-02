// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like

// Import vue components
import SvgMap from './components/svg-map.vue'
import CheckboxSvgMap from './components/checkbox-svg-map.vue'
import RadioSvgMap from './components/radio-svg-map.vue'
import './scss/svg-map.scss'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return
	install.installed = true
	Vue.component('SvgMap', SvgMap)
	Vue.component('CheckboxSvgMap', CheckboxSvgMap)
	Vue.component('RadioSvgMap', RadioSvgMap)
}

// Create module definition for Vue.use()
const plugin = {
	install,
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export components
export default {
	SvgMap,
	CheckboxSvgMap,
	RadioSvgMap,
}
