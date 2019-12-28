module.exports = {
	verbose: true,
	moduleFileExtensions: [
		'js',
		'vue',
	],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.vue$': 'vue-jest',
	},
	collectCoverage: true,
	coverageDirectory: 'tests/coverage',
	collectCoverageFrom: [
		'src/components/*.vue',
	],
}
