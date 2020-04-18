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
	name: 'CheckboxSvgMap',
	components: {
		SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Ids of selected locations (used for v-model)
		value: {
			type: Array,
			default: () => [],
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
			return this.value.some(selectedLocation => selectedLocation === location.id)
		},

		/**
		 * Select/deselect a location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation(event) {
			const locationElt = event.target
			let selectedLocations

			if (locationElt.attributes['aria-checked'] && locationElt.attributes['aria-checked'].value === 'true') {
				// Delete location
				selectedLocations = this.value.filter(location => location !== locationElt.id)
			} else {
				// Add location
				selectedLocations = [...this.value, locationElt.id]
			}

			this.$emit('change', selectedLocations)
		},
	},
}
</script>
