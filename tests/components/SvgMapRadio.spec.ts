import { mount,  VueWrapper, DOMWrapper } from '@vue/test-utils'
import map from './mocks/map'
import SvgMapRadio from '../../src/components/SvgMapRadio.vue'

describe('SvgMapRadio component', () => {
	const modelValue = 'id1'
  let wrapper: VueWrapper
  let locationElt0: DOMWrapper<SVGPathElement>
	let locationElt1: DOMWrapper<SVGPathElement>
	let locationElt2: DOMWrapper<SVGPathElement>

	beforeEach(() => {
		wrapper = mount(SvgMapRadio, { props: { map, modelValue } })

    const locationElts: DOMWrapper<SVGPathElement>[] = wrapper.findAll('path')
    locationElt0 = locationElts.at(0)!
    locationElt1 = locationElts.at(1)!
    locationElt2 = locationElts.at(2)!
	})

	it('renders svg map as a group of radio buttons', () => {
		expect(wrapper.element).toMatchSnapshot()
	})

	it('selects location of inital model value', () => {
		expect(locationElt0.attributes('aria-checked')).toBe('false')
		expect(locationElt1.attributes('aria-checked')).toBe('true')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('selects location of new model value', async () => {
		await wrapper.setProps({ modelValue: 'id0' })

		expect(locationElt0.attributes('aria-checked')).toBe('true')
		expect(locationElt1.attributes('aria-checked')).toBe('false')
		expect(locationElt2.attributes('aria-checked')).toBe('false')
	})

	it('sets only selected location as focusable', () => {
		expect(locationElt0.attributes('tabindex')).toBe('-1')
		expect(locationElt1.attributes('tabindex')).toBe('0')
		expect(locationElt2.attributes('tabindex')).toBe('-1')
	})

	it('sets only first location as focusable when no selected location', async () => {
		await wrapper.setProps({ modelValue: null })

		expect(locationElt0.attributes('tabindex')).toBe('0')
		expect(locationElt1.attributes('tabindex')).toBe('-1')
		expect(locationElt2.attributes('tabindex')).toBe('-1')
	})

	it('emits update:modelValue event with new selected location when clicking on an unselected location', async () => {
		await locationElt2.trigger('click')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})

	it('does not emit update:modelValue event when clicking on selected location', async () => {
		await locationElt1.trigger('click')

		expect(wrapper.emitted('update:modelValue')).toBeUndefined()
	})

	it('emits update:modelValue event with new selected location when pressing spacebar on an unselected location', async () => {
		await locationElt2.trigger('keydown.space')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})

	it('does not emit update:modelValue event when pressing spacebar on selected location', async () => {
		await locationElt1.trigger('keydown.space')

		expect(wrapper.emitted('update:modelValue')).toBeUndefined()
	})

	it('emits update:modelValue event with next location when pressing down arrow on selected location', async () => {
		await locationElt1.trigger('keydown.down')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})

	it('emits update:modelValue event with first location when pressing down arrow on selected last location', async () => {
		await wrapper.setProps({ value: 'id2' })
		await locationElt2.trigger('keydown.down')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id0']])
	})

	it('emits update:modelValue event with next location when pressing right arrow on selected location', async () => {
		await locationElt1.trigger('keydown.right')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})

	it('emits update:modelValue event with first location when pressing right arrow on selected last location', async () => {
		await wrapper.setProps({ value: 'id2' })
		locationElt2.trigger('keydown.right')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id0']])
	})

	it('emits update:modelValue event with previous location when pressing up arrow on selected location', () => {
		locationElt1.trigger('keydown.up')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id0']])
	})

	it('emits update:modelValue event with last location when pressing up arrow on selected first location', async () => {
		await wrapper.setProps({ value: 'id0' })
		locationElt0.trigger('keydown.up')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})

	it('emits update:modelValue event with previous location when pressing left arrow on selected location', () => {
		locationElt1.trigger('keydown.left')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id0']])
	})

	it('emits update:modelValue event with last location when pressing left arrow on selected first location', async () => {
		await wrapper.setProps({ value: 'id0' })
		locationElt0.trigger('keydown.left')

		expect(wrapper.emitted('update:modelValue')).toEqual([['id2']])
	})
})
