<template>
  <article class="examples__block">
    <h2 class="examples__block__title">
      Australia SVG map as radio buttons
    </h2>
    <div class="examples__block__info">
      <div class="examples__block__info__item">
        Pointed location: {{ pointedLocation }}
      </div>
      <div class="examples__block__info__item">
        Focused location: {{ focusedLocation }}
      </div>
      <div class="examples__block__info__item">
        Selected location: {{ getSelectedLocationName(Australia, selectedLocation) }}
      </div>
    </div>
    <div class="examples__block__map examples__block__map--australia">
      <radio-svg-map
        v-model="selectedLocation"
        :map="Australia"
        @mouseover="pointLocation"
        @mouseout="unpointLocation"
        @focus="focusLocation"
        @blur="blurLocation"
      />
    </div>
  </article>
</template>

<script>
import Australia from '@svg-maps/australia'
import { getLocationName, getSelectedLocationName } from '../utilities'
import RadioSvgMap from '../../../src/components/radio-svg-map'

export default {
	name: 'RadioMap',
	components: {
		RadioSvgMap,
	},
	data() {
		return {
			Australia,
			pointedLocation: null,
			focusedLocation: null,
			selectedLocation: null,
		}
	},
	methods: {
		pointLocation(event) {
			this.pointedLocation = getLocationName(event.target)
		},
		unpointLocation(event) {
			this.pointedLocation = null
		},
		focusLocation(event) {
			this.focusedLocation = getLocationName(event.target)
		},
		blurLocation(event) {
			this.focusedLocation = null
		},
		getSelectedLocationName,
	},
}
</script>
