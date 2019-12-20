import { shallowMount } from '@vue/test-utils'
import map from '../mocks/fake-map'
import SvgMap from '@/svg-map'

describe('SvgMap component', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallowMount(SvgMap, { map })
	})

	it('renders map with default props', () => {
		expect(wrapper.element).toMatchSnapshot()
	})

	it.skip('renders map with custom props', () => {
		wrapper.setProps({
			map,
			locationClass: 'locationClass',
			locationTabindex: 'locationTabindex',
			locationRole: 'locationRole',
		})

		expect(wrapper.element).toMatchSnapshot()
	})
})
