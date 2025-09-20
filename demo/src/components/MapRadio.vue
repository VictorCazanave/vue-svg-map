<script setup lang="ts">
import { ref } from 'vue'
import Australia from '@svg-maps/australia'
import { SvgMapRadio } from 'vue-svg-map/src/index.ts'
import { getLocationName, getSelectedLocationName } from '../utilities.ts'

const pointedLocation = ref<string>('')
const focusedLocation = ref<string>('')
const selectedLocation = ref<string>('')

function pointLocation(event: MouseEvent) {
  pointedLocation.value = getLocationName((event.target as SVGElement))
}

function unpointLocation() {
  pointedLocation.value = ''
}

function focusLocation(event: FocusEvent) {
  focusedLocation.value = getLocationName((event.target as SVGElement))
}

function blurLocation() {
  focusedLocation.value = ''
}
</script>

<template>
	<article class="example">
		<h2 class="example__title">
			Australia SVG map as radio buttons
		</h2>

		<p class="example__info">
			<span>
				Pointed location: {{ pointedLocation }}
			</span>
			<span>
				Focused location: {{ focusedLocation }}
			</span>
			<span>
				Selected location: {{ getSelectedLocationName(Australia, selectedLocation) }}
			</span>
		</p>

    <SvgMapRadio
      v-model="selectedLocation"
      :map="Australia"
      class="example__map example__map--australia"
      @mouseover="pointLocation"
      @mouseout="unpointLocation"
      @focus="focusLocation"
      @blur="blurLocation"
    />
	</article>
</template>
