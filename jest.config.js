module.exports = {
	moduleFileExtensions: [
		'js',
		'vue',
	],
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
		'.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/components/$1',
	},
}
