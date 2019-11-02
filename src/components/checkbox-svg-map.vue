<template>
  <svg-map
    v-bind="$attrs"
    role="group"
    location-role="checkbox"
    location-tabindex="0"
    :is-location-selected="isLocationSelected"
    v-on="$listeners"
    @click="toggleLocation"
    @keydown.prevent.space="toggleLocation"
  />
</template>

<script>
import SvgMap from './svg-map.vue'

export default {
	name: 'CheckboxSvgMap',
	components: {
		SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Used for v-model
		value: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			selectedLocations: this.value,
		}
	},
	watch: {
		value() {
			this.selectedLocations = this.value
		},
	},
	methods: {
		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location DOM object
	 	 * @returns {boolean} True if the location is selected
		 */
		isLocationSelected(location) {
			return this.selectedLocations.findIndex(selectedLocation => selectedLocation.id === location.id) > -1
		},

		/**
		 * Select/deselect a location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation(event) {
			const location = event.target

			if (location.attributes['aria-checked'] && location.attributes['aria-checked'].value === 'true') {
				// Delete location
				this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1)
			} else {
				// Add location
				// FIXME: Push only value/label/id?
				this.selectedLocations.push(location)
			}

			this.$emit('change', this.selectedLocations)
		},
	},
}
</script>
