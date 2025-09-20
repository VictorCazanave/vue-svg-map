
<script setup lang="ts">
import type { SVGAttributes } from 'vue'
import type { Location } from 'vue-svg-map/src/types'
import { ref } from 'vue'
import USA from '@svg-maps/usa'
import { SvgMap } from 'vue-svg-map/src/index';
import { getLocationName } from '../utilities.ts'

const pointedLocation = ref<string>('')
const tooltipStyle = ref<{ display: string, top?: string, left?: string }>({ display: 'none' })

function pointLocation(event: MouseEvent) {
  pointedLocation.value = getLocationName((event.target as SVGElement))
}

function unpointLocation() {
  pointedLocation.value = ''
  tooltipStyle.value.display = 'none';
}

function moveOnLocation(event: MouseEvent) {
  tooltipStyle.value = {
    display: 'block',
    top: `${event.clientY + 10}px`,
    left: `${event.clientX - 100}px`,
  }
}

function  getLocationAttributes(location: Location, index: number): SVGAttributes {
  // Generate heat map
  return { class: `svg-map__location svg-map__location--heat${index % 4}` }
}
</script>


<template>
	<article class="example">
		<h2 class="example__title">
			USA SVG heat map with tooltips
		</h2>

    <SvgMap
      :map="USA"
      :location-attributes="getLocationAttributes"
      class="example__map example__map--usa"
      @mouseover="pointLocation"
      @mouseout="unpointLocation"
      @mousemove="moveOnLocation"
    />

    <div
      class="example__tooltip"
      :style="tooltipStyle"
    >
      {{ pointedLocation }}
    </div>
	</article>
</template>
