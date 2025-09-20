<script setup lang="ts">
import type { SVGAttributes } from 'vue'
import type { Map, Location } from '../types'

const { locationAttributes = () => ({}) }  = defineProps<{
  map: Map
  locationAttributes?: SVGAttributes | ((location: Location, index: number) => SVGAttributes)
}>()
</script>

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
			:key="location.id"
			:id="location.id"
			:d="location.path"
			:aria-label="location.name"
			class="svg-map__location"
			v-bind="{
        ...$attrs,
        ...(typeof locationAttributes === 'function' ? locationAttributes(location, index) : locationAttributes)
      }"
		/>
		<slot name="after" />
	</svg>
</template>
