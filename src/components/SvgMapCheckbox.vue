<script setup lang="ts">
import type { SVGAttributes } from 'vue'
import type { Map, Location } from '../types'
import SvgMap from './SvgMap.vue'

defineProps<{map: Map}>()

// Ids of selected locations
const model = defineModel<string[]>({ default: () => [] })

/**
 * Indicate whether a location is selected
 *
 * @param location - Location DOM object
 * @returns True if the location is selected
 */
function isLocationSelected(location: Location): boolean {
  return model.value.some(locationId => locationId === location.id)
}

function getLocationAttributes(location: Location): SVGAttributes {
  return {
    role: 'checkbox',
    tabindex: '0',
    'aria-checked': isLocationSelected(location),
  }
}

/**
 * Select/deselect a location
 *
 * @param event - Triggered event
 */
function toggleLocation(event: MouseEvent | KeyboardEvent): void {
  const target = event.target as SVGElement

  if(target) {
    const locationId = target.id;
    const selectedLocationIndex = model.value.indexOf(locationId)

    // NOTE: Mutating model with splice or push does not emit event (https://github.com/vuejs/core/issues/11143#issuecomment-2173390531)
    if (selectedLocationIndex > -1) {
      // Remove location
      model.value = [...model.value.slice(0, selectedLocationIndex), ...model.value.slice(selectedLocationIndex + 1)];
    } else {
      // Add location
      model.value = [...model.value, locationId];
    }
  }
}
</script>

<template>
  <!-- NOTE: Use .stop modifier to prevent event bubbling and calling function twice -->
	<SvgMap
		v-bind="$attrs"
    :map="map"
		role="group"
    :locationAttributes="getLocationAttributes"
		@click.stop="toggleLocation"
		@keydown.prevent.stop.space="toggleLocation"
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
