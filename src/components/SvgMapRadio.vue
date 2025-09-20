<script setup lang="ts">
import type { SVGAttributes } from 'vue'
import type { Map, Location } from '../types'
import { onMounted, useTemplateRef } from 'vue'
import SvgMap from './SvgMap.vue'

defineProps<{map: Map}>()

// Id of selected location
const model = defineModel<string>({ default: () => null })

const svgComponent = useTemplateRef('svg')
let locationElts: SVGPathElement[]

onMounted(() => {
  if(svgComponent.value) {
    // Store all location elements to handle focus
    locationElts = svgComponent.value.$el.querySelectorAll('path')
  }
})

/**
 * Indicate whether location is selected
 *
 * @param location - Location to check
 * @returns True if location is selected
 */
function isLocationSelected(location: Location): boolean {
  return model.value === location.id
}

/**
 * Get tabindex value of location
 *
 * @param location - Location of which to get tabindex
 * @param index - Index of location
 * @returns Value of tabindex HTML attribute
 */
function getLocationTabindex(location: Location, index: number): string {
  if (model.value) {
    // Only selected location is focusable
    return isLocationSelected(location) ? '0' : '-1'
  }

  // Only first location is focusable by default
  return index === 0 ? '0' : '-1'
}

/**
 * Select a location
 *
 * @param location - DOM node of location to select
 */
function selectLocation(locationElt: SVGPathElement): void {
  // Select only if location is not already selected
  if (locationElt.id !== model.value) {
    model.value = locationElt.id
    locationElt.focus()
  }
}

/**
 * Select next or first location
 *
 * @param event - Triggered event
 */
function selectNextLocation(event: KeyboardEvent): void {
  const target = event.target as SVGElement

  if(target) {
    // Next sibling can be anything in `after` slot
    const nextElementSibling = target.nextElementSibling
    const nextLocationElt = nextElementSibling?.nodeName === 'path'
      ? nextElementSibling as SVGPathElement
      : locationElts[0]

    selectLocation(nextLocationElt)
  }
}

/**
 * Select previous or last location
 *
 * @param event - Triggered event
 */
function selectPreviousLocation(event: KeyboardEvent): void {
  const target= event.target as SVGElement

  if(target) {
    // Previous sibling can be anything in `before` slot
    const previousElementSibling = target.previousElementSibling
    const previousLocation = previousElementSibling?.nodeName === 'path'
      ? previousElementSibling as SVGPathElement :
      locationElts[locationElts.length - 1]

      selectLocation(previousLocation)
  }
}

/**
 * Get HTML attributes of location depending on its state
 *
 * @return HTML attributes of location
 */
function getLocationAttributes(location: Location, index: number): SVGAttributes {
  return {
    role: 'radio',
    tabindex: getLocationTabindex(location, index),
    'aria-checked': isLocationSelected(location),
  }
}
</script>

<template>
  <!-- NOTE: Use .stop modifier to prevent event bubbling and calling function twice -->
	<SvgMap
    ref="svg"
		v-bind="$attrs"
    :map="map"
		role="radiogroup"
    :locationAttributes="getLocationAttributes"
		@click.stop="selectLocation($event.target)"
		@keydown.space.prevent.stop="selectLocation($event.target)"
		@keydown.down.prevent.stop="selectNextLocation"
		@keydown.right.prevent.stop="selectNextLocation"
		@keydown.up.prevent.stop="selectPreviousLocation"
		@keydown.left.prevent.stop="selectPreviousLocation"
	>
		<!-- Pass down slots to SvgMap: https://stackoverflow.com/a/50892881/9826498 -->
		<template
			v-for="(_, slotName) of $slots"
			v-slot:[slotName]="scope"
		>
			<slot
				v-bind="scope"
				:name="slotName"
			/>
		</template>
	</SvgMap>
</template>
