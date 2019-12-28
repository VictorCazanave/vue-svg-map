import Vue from 'vue'
import { mount } from '@vue/test-utils'
import map from '../mocks/fake-map'
import SvgMap from '../../src/components/svg-map'
import CheckboxSvgMap from '../../src/components/checkbox-svg-map'

describe('CheckboxSvgMap component', () => {
	const value = ['id0']
	let wrapper
	let svgMap
	let locations

	beforeEach(() => {
		wrapper = mount(CheckboxSvgMap, {
			propsData: { map, value },
		})
		svgMap = wrapper.find(SvgMap)
		locations = svgMap.findAll('path')
	})

	it('selects locations of inital value property', () => {
		expect(locations.at(0).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(1).attributes('aria-checked')).toBeFalsy()
		expect(locations.at(2).attributes('aria-checked')).toBeFalsy()
	})

	it('selects locations of new value property', async () => {
		wrapper.setProps({ value: ['id0', 'id1'] })
		await Vue.nextTick()

		expect(locations.at(0).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(1).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(2).attributes('aria-checked')).toBeFalsy()
	})

	it('emits new selected locations when clicking on location', () => {
		locations.at(2).trigger('click')

		expect(wrapper.emitted().change[0][0]).toEqual(['id0', 'id2'])
	})

	it('emits new selected locations when pressing spacebar on location', () => {
		locations.at(2).trigger('keydown.space')

		expect(wrapper.emitted().change[0][0]).toEqual(['id0', 'id2'])
	})

	it('emits empty array when unselecting all locations', () => {
		locations.at(0).trigger('click')

		expect(wrapper.emitted().change[0][0]).toEqual([])
	})

	it('renders map with checkbox attributes', () => {
		expect(wrapper.element).toMatchSnapshot()
	})
})
