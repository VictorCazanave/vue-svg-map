import Vue from 'vue'
import { mount } from '@vue/test-utils'
import map from '../mocks/fake-map'
import SvgMap from '../../src/components/svg-map'
import RadioSvgMap from '../../src/components/radio-svg-map'

describe('RadioSvgMap component', () => {
	const value = 'id1'
	let wrapper
	let svgMap
	let locations

	beforeEach(() => {
		wrapper = mount(RadioSvgMap, {
			propsData: { map, value },
		})
		svgMap = wrapper.find(SvgMap)
		locations = svgMap.findAll('path')
	})

	it('selects location of inital value property', () => {
		expect(locations.at(0).attributes('aria-checked')).toBeFalsy()
		expect(locations.at(1).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(2).attributes('aria-checked')).toBeFalsy()
	})

	it('selects location of new value property', async () => {
		wrapper.setProps({ value: 'id0' })
		await Vue.nextTick()

		expect(locations.at(0).attributes('aria-checked')).toBeTruthy()
		expect(locations.at(1).attributes('aria-checked')).toBeFalsy()
		expect(locations.at(2).attributes('aria-checked')).toBeFalsy()
	})

	it('sets only selected location as focusable', () => {
		expect(locations.at(0).attributes('tabindex')).toBe('-1')
		expect(locations.at(1).attributes('tabindex')).toBe('0')
		expect(locations.at(2).attributes('tabindex')).toBe('-1')
	})

	it('sets only first location as focusable when no selected location', async () => {
		wrapper.setProps({ value: null })
		await Vue.nextTick()

		expect(locations.at(0).attributes('tabindex')).toBe('0')
		expect(locations.at(1).attributes('tabindex')).toBe('-1')
		expect(locations.at(2).attributes('tabindex')).toBe('-1')
	})

	it('emits new selected location when clicking on unselected location', () => {
		locations.at(2).trigger('click')

		expect(wrapper.emitted().change[0][0]).toEqual('id2')
	})

	it('emits nothing when clicking on selected location', () => {
		locations.at(1).trigger('click')

		expect(wrapper.emitted().change).toBeUndefined()
	})

	it('emits new selected location when pressing spacebar on unselected location', () => {
		locations.at(2).trigger('keydown.space')

		expect(wrapper.emitted().change[0][0]).toEqual('id2')
	})

	it('emits nothing when pressing spacebar on selected location', () => {
		locations.at(1).trigger('keydown.space')

		expect(wrapper.emitted().change).toBeUndefined()
	})

	it('emits next location when pressing down or right arrow', () => {
		locations.at(1).trigger('keydown.down')

		expect(wrapper.emitted().change[0][0]).toEqual('id2')
	})

	it('emits first location when pressing down or right arrow on last location', async () => {
		wrapper.setProps({ value: 'id2' })
		await Vue.nextTick()
		locations.at(2).trigger('keydown.right')

		expect(wrapper.emitted().change[0][0]).toEqual('id0')
	})

	it('emits previous location when pressing up or left arrow', () => {
		locations.at(1).trigger('keydown.up')

		expect(wrapper.emitted().change[0][0]).toEqual('id0')
	})

	it('emits last location when pressing up or left arrow on first location', async () => {
		wrapper.setProps({ value: 'id0' })
		await Vue.nextTick()
		locations.at(0).trigger('keydown.left')

		expect(wrapper.emitted().change[0][0]).toEqual('id2')
	})

	it('renders map with radio button attributes', () => {
		expect(wrapper.element).toMatchSnapshot()
	})
})
