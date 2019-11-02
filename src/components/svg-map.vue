<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="map.viewBox"
    :aria-label="map.label"
    class="svg-map"
  >
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
      v-on="$listeners"
    />
  </svg>
</template>

<script>
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
}
</script>
