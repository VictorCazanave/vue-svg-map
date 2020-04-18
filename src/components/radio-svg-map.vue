<template>
  <svg-map
    ref="svg"
    v-bind="$attrs"
    role="radiogroup"
    location-role="radio"
    :location-tabindex="getLocationTabindex"
    :is-location-selected="isLocationSelected"
    v-on="$listeners"
    @click="selectLocation($event.target)"
    @keydown.space.prevent="toggleLocation"
    @keydown.down.prevent="selectNextLocation"
    @keydown.right.prevent="selectNextLocation"
    @keydown.up.prevent="selectPreviousLocation"
    @keydown.left.prevent="selectPreviousLocation"
  >
    <!-- Pass down slots to SvgMap: https://stackoverflow.com/a/50892881/9826498 -->
    <template
      v-for="(_, slotName) of $scopedSlots"
      v-slot:[slotName]="scope"
    >
      <slot
        v-bind="scope"
        :name="slotName"
      />
    </template>
  </svg-map>
</template>

<script>
import SvgMap from './svg-map.vue'

export default {
	name: 'RadioSvgMap',
	components: {
		SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Id of selected location (used for v-model)
		value: {
			type: String,
			default: null,
		},
	},
	mounted() {
		this.locations = this.$refs.svg.$el.querySelectorAll('path')
	},
	methods: {
		/**
		 * Get tabindex value of a location
	   *
	   * @param {Object} location - Location object
	   * @param {number} index - Index of location
	   * @returns {string} Value of tabindex HTML attribute
	 	 */
		getLocationTabindex(location, index) {
			let tabindex = null

			if (this.value) {
				// Only selected location is focusable
				tabindex = this.isLocationSelected(location) ? '0' : '-1'
			} else {
				// Only first location is focusable
				tabindex = index === 0 ? '0' : '-1'
			}

			return tabindex
		},

		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location object
	 	 * @returns {boolean} True if the location is selected
	 	 */
		isLocationSelected(location) {
			return this.value === location.id
		},

		/**
	 	 * Select a location
	 	 *
	 	 * @param {Node} location - DOM node of location to select
	 	 */
		selectLocation(location) {
			// Select only if new location
			if (location.id !== this.value) {
				// Focus new selected location
				location.focus()

				// Emit id of selected location
				this.$emit('change', location.id)
			}
		},

		/**
	 	 * Select focused location if not already selected
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation(event) {
			const focusedLocation = event.target

			if (this.value !== focusedLocation.id) {
				this.selectLocation(focusedLocation)
			}
		},

		/**
	 	 * Select next or first location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectNextLocation(event) {
			// Next sibling can be anything in `after` slot
			const nextSibling = event.target.nextSibling
			const nextLocation = nextSibling && nextSibling.nodeName === 'path'
				? nextSibling
				: this.locations[0]

			this.selectLocation(nextLocation)
		},

		/**
	 	 * Select previous or last location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectPreviousLocation(event) {
			// Previous sibling can be anything in `before` slot
			const previousSibling = event.target.previousSibling
			const previousLocation = previousSibling && previousSibling.nodeName === 'path'
				? previousSibling
				: this.locations[this.locations.length - 1]

			this.selectLocation(previousLocation)
		},
	},
}
</script>
