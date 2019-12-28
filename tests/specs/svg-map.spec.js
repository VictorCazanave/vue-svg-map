import { shallowMount } from '@vue/test-utils'
import map from '../mocks/fake-map'
import SvgMap from '../../src/components/svg-map'

describe('SvgMap component', () => {
	it('renders map with default props', () => {
		const wrapper = shallowMount(SvgMap, {
			propsData: { map },
		})

		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders map with custom props', () => {
		const wrapper = shallowMount(SvgMap, {
			propsData: {
				map,
				locationClass: 'locationClass',
				locationTabindex: 'locationTabindex',
				locationRole: 'locationRole',
				isLocationSelected: () => 'isLocationSelected()',
			},
		})

		expect(wrapper.element).toMatchSnapshot()
	})
})
