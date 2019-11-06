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
  />
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
		value: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			selectedLocation: this.value,
		}
	},
	watch: {
		value() {
			this.selectedLocation = this.value
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

			if (this.selectedLocation) {
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
			return this.selectedLocation && this.selectedLocation.id === location.id
		},

		/**
	 	 * Select a location
	 	 *
	 	 * @param {Node} location - Location DOM node
	 	 */
		selectLocation(location) {
			// Focus new selected location
			location.focus()

			// Change selected location
			this.selectedLocation = location

			// Emit selected location
			this.$emit('change', this.selectedLocation)
		},

		/**
	 	 * Select focused location if not already selected
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation(event) {
			const focusedLocation = event.target

			if (this.selectedLocation !== focusedLocation) {
				this.selectLocation(focusedLocation)
			}
		},

		/**
	 	 * Select next or first location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectNextLocation(event) {
			const focusedLocation = event.target

			this.selectLocation(focusedLocation.nextSibling || this.locations[0])
		},

		/**
	 	 * Select previous or last location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectPreviousLocation(event) {
			const focusedLocation = event.target

			this.selectLocation(focusedLocation.previousSibling || this.locations[this.locations.length - 1])
		},
	},
}
</script>
