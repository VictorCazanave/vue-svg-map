import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import map from './mocks/map'
import SvgMapCheckbox from '../../src/components/SvgMapCheckbox.vue'

describe('SvgMapCheckbox component', () => {
	const modelValue = ['id0']
	let wrapper: VueWrapper
	let locationElt0: DOMWrapper<SVGPathElement>
	let locationElt1: DOMWrapper<SVGPathElement>
	let locationElt2: DOMWrapper<SVGPathElement>

	beforeEach(() => {
		wrapper = mount(SvgMapCheckbox, { props: { map, modelValue } })

		const locationElts: DOMWrapper<SVGPathElement>[] = wrapper.findAll('path')
    locationElt0 = locationElts.at(0)!
    locationElt1 = locationElts.at(1)!
    locationElt2 = locationElts.at(2)!
	})

  it('renders svg map as a group of checkboxes', () => {
		expect(wrapper.element).toMatchSnapshot()
	})

	it('selects locations of inital model value', () => {
		expect(locationElt0.attributes('aria-checked')).toBe('true')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('selects locations of new model value', async () => {
		await wrapper.setProps({ modelValue: ['id0', 'id1'] })

		expect(locationElt0.attributes('aria-checked')).toBe('true')
		expect(locationElt1.attributes('aria-checked')).toBe('true')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('selects new location when clicking on an unselected location', async () => {
		await locationElt2.trigger('click')

    expect(locationElt0.attributes('aria-checked')).toBe('true')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('true')
	})

	it('selects new location when pressing spacebar on an unselected location', async () => {
		await locationElt2.trigger('keydown.space')

    expect(locationElt0.attributes('aria-checked')).toBe('true')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('true')
	})

	it('unselects location when clicking on a selected location', async () => {
		await locationElt0.trigger('click')

    expect(locationElt0.attributes('aria-checked')).toBe('false')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('unselects location when pressing spacebar on a selected location', async () => {
		await locationElt0.trigger('keydown.space')

    expect(locationElt0.attributes('aria-checked')).toBe('false')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('emits update:modelValue event with new selected locations when clicking on an unselected location', async () => {
		await locationElt2.trigger('click')

		expect(wrapper.emitted('update:modelValue')).toEqual([[['id0', 'id2']]])
	})

	it('emits update:modelValue event with new selected locations when pressing spacebar on an unselected location', async () => {
		await locationElt2.trigger('keydown.space')

		expect(wrapper.emitted('update:modelValue')).toEqual([[['id0', 'id2']]])
	})

	it('emits update:modelValue event with new selected locations when clicking on a selected location', async () => {
		await wrapper.setProps({ modelValue: ['id0', 'id1'] })
		await locationElt0.trigger('click')

		expect(wrapper.emitted('update:modelValue')).toEqual([[['id1']]])
	})

	it('emits update:modelValue event with new selected locations when pressing spacebar on a selected location', async () => {
		await wrapper.setProps({ modelValue: ['id0', 'id1'] })
		await locationElt0.trigger('keydown.space')

		expect(wrapper.emitted('update:modelValue')).toEqual([[['id1']]])
	})

	it('emits update:modelValue event with empty array when unselecting all locations', async () => {
		await locationElt0.trigger('click')

		expect(wrapper.emitted('update:modelValue')).toEqual([[[]]])
	})
})
