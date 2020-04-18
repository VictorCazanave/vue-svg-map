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

	it('renders custom map', () => {
		const customMap = {
			...map,
			locations: map.locations.map(location => ({
				...location,
				id: `custom-${location.id}`,
				customAttribute: 'true',
			})),
		}
		const wrapper = shallowMount(SvgMap, {
			propsData: { map: customMap },
		})

		expect(wrapper.element).toMatchSnapshot()
	})
})
