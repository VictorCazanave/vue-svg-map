<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="map.viewBox"
    :aria-label="map.label"
    class="svg-map"
  >
    <slot name="before" />
    <path
      v-for="(location, index) in map.locations"
      :id="location.id"
      :key="location.id"
      :name="location.name"
      :d="location.path"
      class="svg-map__location"
      :class="isLocationClassFunction ? locationClass(location, index) : locationClass"
      :tabindex="isLocationTabindexFunction ? locationTabindex(location, index) : locationTabindex"
      :role="locationRole"
      :aria-label="location.name"
      :aria-checked="isLocationSelected && isLocationSelected(location, index)"
      v-bind="getLocationCustomProperties(location)"
      v-on="$listeners"
    />
    <slot name="after" />
  </svg>
</template>

<script>
const LOCATION_DEFAULT_PROPERTIES = ['id', 'name', 'path']

export default {
	name: 'SvgMap',
	props: {
		map: {
			type: Object,
			required: true,
			validator(map) {
				return typeof map.viewBox === 'string' &&
          Array.isArray(map.locations) &&
          map.locations.every(location => typeof location.path === 'string' && typeof location.id === 'string')
			},
		},
		locationClass: {
			type: [String, Function],
			default: null,
		},
		locationTabindex: {
			type: [String, Function],
			default: null,
		},
		locationRole: {
			type: String,
			default: null,
		},
		isLocationSelected: {
			type: Function,
			default: null,
		},
	},
	computed: {
		isLocationClassFunction() {
			return typeof this.locationClass === 'function'
		},
		isLocationTabindexFunction() {
			return typeof this.locationTabindex === 'function'
		},
	},
	methods: {
		/**
		 * Get custom properties of a location to add custom attributes to <path>
		 *
		 * @param {Object} location - Location to parse
		 * @returns {Object} Custom properties
		 */
		getLocationCustomProperties(location) {
			// Filter default properties to avoid invalid/duplicated attributes
			return Object.fromEntries(
				Object.entries(location).filter(([key]) => !LOCATION_DEFAULT_PROPERTIES.includes(key))
			)
		},
	},
}
</script>
