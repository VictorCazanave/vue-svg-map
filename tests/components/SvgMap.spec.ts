import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import type { Map, Location } from '../../src/types'
import map from './mocks/map'
import SvgMap from '../../src/components/SvgMap.vue'

describe('SvgMap component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
		wrapper = mount(SvgMap, { props: { map } })
  })

	it('renders svg map with default attributes of locations', () => {
		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders svg map with static custom attributes of locations', async () => {
    const locationAttributes = { tabindex: 'tabindex', role: 'role' }
		await wrapper.setProps({ locationAttributes })

		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders svg map with dynamic custom attributes of locations', async () => {
    const getLocationAttributes = (location: Location, index: number) => ({ 'name': location.name, 'index': index })
		await wrapper.setProps({ locationAttributes: getLocationAttributes })

		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders custom svg map', async () => {
		const customMap: Map = {
			...map,
			locations: map.locations.map(location => ({
				...location,
				id: `custom-${location.id}`,
				path: `custom path of ${location.name}`,
			})),
		}
		await wrapper.setProps({ map: customMap })

		expect(wrapper.element).toMatchSnapshot()
	})
})
