// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#How-do-I-configure-the-Rollup-build

import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import scss from 'rollup-plugin-scss'

export default {
	input: 'src/wrapper.js',
	output: {
		// wrapper.js exports 3 components
		name: 'VueSvgMap',
		exports: 'named',
	},
	plugins: [
		scss({
			output: 'dist/index.css',
		}),
		commonjs(),
		vue({
			compileTemplate: true,
		}),
		buble(),
	],
}
